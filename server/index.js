const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'student_platform',
});

// Get all resources
app.get('/resources', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM resources');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Get a single resource by ID
app.get('/resources/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM resources WHERE id = ?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send('Resource not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Add a new resource
app.post('/resources', async (req, res) => {
  const { title, description } = req.body;
  try {
    const [result] = await db.query('INSERT INTO resources (title, description) VALUES (?, ?)', [title, description]);
    res.status(201).json({ id: result.insertId, title, description });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Search resources
app.get('/resources/search', async (req, res) => {
  const { q } = req.query;
  console.log('Search query:', q); // Log to see what’s coming in
  try {
    const [rows] = await db.query(
      'SELECT * FROM resources WHERE title LIKE ? OR description LIKE ?',
      [`%${q}%`, `%${q}%`]
    );
    console.log('Search results:', rows); // Log results
    res.json(rows);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).send('Server error');
  }
});

app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});