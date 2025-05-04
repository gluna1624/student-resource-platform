const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const auth = require('../middleware/auth');

// POST /api/comments - Add a comment to a resource
router.post('/', auth, async (req, res) => {
  const { resource_id, comment_text } = req.body;
  const user_id = req.user.user_id;

  if (!resource_id || !comment_text) {
    return res.status(400).json({ error: 'Resource ID and comment text are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO Comments (resource_id, user_id, comment_text, created_at) VALUES (?, ?, ?, NOW())',
      [resource_id, user_id, comment_text]
    );
    res.status(201).json({ id: result.insertId, resource_id, user_id, comment_text, created_at: new Date() });
  } catch (error) {
    console.error('Comment creation error:', error.message, error.stack);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

// GET /api/comments/:resource_id - Get comments for a resource
router.get('/:resource_id', async (req, res) => {
  const { resource_id } = req.params;

  try {
    const [comments] = await pool.query(
      'SELECT c.id, c.comment_text, c.created_at, u.username FROM Comments c JOIN Users u ON c.user_id = u.user_id WHERE c.resource_id = ? ORDER BY c.created_at DESC',
      [resource_id]
    );
    res.json(comments);
  } catch (error) {
    console.error('Comment retrieval error:', error.message, error.stack);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

module.exports = router;