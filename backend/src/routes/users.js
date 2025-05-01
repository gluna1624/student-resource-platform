const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const [existing] = await pool.execute('SELECT * FROM Users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const password_hash = password; // Placeholder
        const [result] = await pool.execute(
            'INSERT INTO Users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
            [username, email, password_hash, role || 'student']
        );
        res.status(201).json({ user_id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const [users] = await pool.execute('SELECT * FROM Users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const user = users[0];
        if (password !== user.password_hash) { // Placeholder comparison
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user_id: user.user_id });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;