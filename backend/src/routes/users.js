const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');
require('dotenv').config();

// Debug middleware
router.use((req, res, next) => {
    console.log(`Users route: ${req.method} ${req.url}`);
    next();
});

async function testDBConnection() {
    try {
        await pool.execute('SELECT 1');
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        console.error('Error details:', error);
    }
}
testDBConnection();

router.post('/register', async (req, res) => {
    console.log('Register request body:', req.body);
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const [existing] = await pool.execute('SELECT * FROM Users WHERE email = ?', [email]);
        console.log('Existing user check:', existing.length);
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const password_hash = password;
        const [result] = await pool.execute(
            'INSERT INTO Users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
            [username, email, password_hash, role || 'student']
        );
        console.log('User registered:', result.insertId);
        res.status(201).json({ user_id: result.insertId });
    } catch (error) {
        console.error('Register error:', error.message, error.stack);
        res.status(500).json({ error: 'Database error: ' + error.message });
    }
});

router.post('/login', async (req, res) => {
    console.log('Login request body:', req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const [users] = await pool.execute('SELECT * FROM Users WHERE email = ?', [email]);
        console.log('Login query result:', users.length);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const user = users[0];
        if (password !== user.password_hash) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET missing');
            return res.status(500).json({ error: 'Server configuration error' });
        }
        const token = jwt.sign(
            { user_id: user.user_id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        console.log('Login successful for user:', email);
        res.json({ token, user_id: user.user_id });
    } catch (error) {
        console.error('Login error:', error.message, error.stack);
        res.status(500).json({ error: 'Database error: ' + error.message });
    }
});

router.get('/me', authenticateToken, async (req, res) => {
    console.log('Fetching user:', req.user.user_id);
    const user_id = req.user.user_id;
    try {
        const [users] = await pool.execute('SELECT username, email FROM Users WHERE user_id = ?', [user_id]);
        console.log('User fetch result:', users.length);
        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(users[0]);
    } catch (error) {
        console.error('User fetch error:', error.message, error.stack);
        res.status(500).json({ error: 'Database error: ' + error.message });
    }
});

module.exports = router;