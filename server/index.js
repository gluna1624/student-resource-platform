const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const SECRET_KEY = 'your-secret-key'; // Change this later!

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'student_platform',
});

// Register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const [result] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    res.status(201).json({ id: result.insertId, username });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password))) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: rows[0].id, username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Auth middleware
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).send('No token');
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
};

// Existing routes
app.get('/resources', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM resources');
    res.json(rows);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.get('/resources/search', async (req, res) => {
  const { q } = req.query;
  try {
    const [rows] = await db.query('SELECT * FROM resources WHERE title LIKE ? OR description LIKE ?', [`%${q}%`, `%${q}%`]);
    res.json(rows);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.get('/resources/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM resources WHERE id = ?', [req.params.id]);
    if (rows.length > 0) res.json(rows[0]);
    else res.status(404).send('Resource not found');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.post('/resources', authenticate, async (req, res) => {
  const { title, description } = req.body;
  try {
    const [result] = await db.query('INSERT INTO resources (title, description) VALUES (?, ?)', [title, description]);
    res.status(201).json({ id: result.insertId, title, description });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.get('/test', (req, res) => res.send('Test works'));

app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});