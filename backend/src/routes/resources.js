const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authenticateToken = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/', authenticateToken, upload.single('file'), async (req, res) => {
    const { title, description } = req.body;
    const file_path = req.file ? `/uploads/${req.file.filename}` : null;
    const user_id = req.user.user_id;
    if (!title || !file_path) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const [result] = await pool.execute(
            'INSERT INTO Resources (title, description, file_path, user_id) VALUES (?, ?, ?, ?)',
            [title, description || null, file_path, user_id]
        );
        res.status(201).json({ resource_id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

router.get('/search', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter required' });
    }
    try {
        const [results] = await pool.execute(
            'SELECT r.resource_id, r.title, r.description, u.username ' +
            'FROM Resources r JOIN Users u ON r.user_id = u.user_id ' +
            'WHERE r.title LIKE ? OR r.description LIKE ?',
            [`%${query}%`, `%${query}%`]
        );
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

router.get('/my-resources', authenticateToken, async (req, res) => {
    const user_id = req.user.user_id;
    try {
        const [results] = await pool.execute(
            'SELECT resource_id, title, description, file_path ' +
            'FROM Resources WHERE user_id = ?',
            [user_id]
        );
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;