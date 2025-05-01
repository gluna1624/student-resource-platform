const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/', async (req, res) => {
    const { title, description, file_path, user_id } = req.body;
    if (!title || !file_path || !user_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const [result] = await pool.execute(
            'INSERT INTO Resources (title, description, file_path, user_id) VALUES (?, ?, ?, ?)',
            [title, description, file_path, user_id]
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

module.exports = router;