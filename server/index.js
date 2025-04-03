const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const app = express();
const SECRET_KEY = 'your-secret-key';
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'student_platform',
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const [result] = await db.query('INSERT INTO users (username, password, isAdmin) VALUES (?, ?, 0)', [username, hashedPassword]);
    res.status(201).json({ id: result.insertId, username });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password))) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: rows[0].id, username, isAdmin: rows[0].isAdmin }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log('Auth attempt - Token:', token);
  if (!token) return res.status(401).send('No token');
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err.message);
      return res.status(403).send('Invalid token');
    }
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).send('Admin access required');
  next();
};

app.get('/resources', async (req, res) => {
  const { category } = req.query;
  try {
    const query = category 
      ? 'SELECT r.*, u.username FROM resources r LEFT JOIN users u ON r.user_id = u.id WHERE r.category = ?' 
      : 'SELECT r.*, u.username FROM resources r LEFT JOIN users u ON r.user_id = u.id';
    const [rows] = await db.query(query, category ? [category] : []);
    console.log('Resources sent:', rows); // Added for debugging
    res.json(rows);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).send('Server error');
  }
});

app.get('/resources/search', async (req, res) => {
  const { q } = req.query;
  try {
    const [rows] = await db.query(
      'SELECT r.*, u.username FROM resources r LEFT JOIN users u ON r.user_id = u.id WHERE r.title LIKE ? OR r.description LIKE ?', 
      [`%${q}%`, `%${q}%`]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error searching resources:', error);
    res.status(500).send('Server error');
  }
});

app.get('/resources/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT r.*, u.username FROM resources r LEFT JOIN users u ON r.user_id = u.id WHERE r.id = ?', [req.params.id]);
    if (rows.length > 0) res.json(rows[0]);
    else res.status(404).send('Resource not found');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.post('/resources', authenticate, upload.single('file'), async (req, res) => {
  console.log('Upload request - Body:', req.body, 'File:', req.file);
  const { title, description, category } = req.body;
  const filePath = req.file ? req.file.path : null;
  const fileName = req.file ? req.file.originalname : null;
  try {
    const [result] = await db.query(
      'INSERT INTO resources (title, description, category, user_id, file_path, file_name) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, category, req.user.id, filePath, fileName]
    );
    res.status(201).json({ id: result.insertId, title, description, category, user_id: req.user.id, username: req.user.username, fileName });
  } catch (error) {
    console.error('Error uploading resource:', error);
    res.status(500).send('Server error');
  }
});

app.get('/resources/:id/file', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT file_path, file_name FROM resources WHERE id = ?', [req.params.id]);
    if (rows.length === 0 || !rows[0].file_path) return res.status(404).send('Resource not found');
    res.download(rows[0].file_path, rows[0].file_name);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.delete('/resources/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM resources WHERE id = ?', [req.params.id]);
    if (result.affectedRows > 0) res.send('Resource deleted');
    else res.status(404).send('Resource not found');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.get('/resources/:id/comments', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT c.id, c.content, c.user_id, u.username FROM comments c JOIN users u ON c.user_id = u.id WHERE c.resource_id = ?',
      [req.params.id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.post('/resources/:id/comments', authenticate, async (req, res) => {
  const { content } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO comments (resource_id, user_id, content) VALUES (?, ?, ?)',
      [req.params.id, req.user.id, content]
    );
    res.status(201).json({ id: result.insertId, content, user_id: req.user.id, username: req.user.username });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.get('/users/:id/resources', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT r.* FROM resources r WHERE r.user_id = ?', [req.params.id]);
    res.json(rows);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.get('/test', (req, res) => res.send('Test works'));

app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});