const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const usersRouter = require('./routes/users');

const app = express();

// Debug middleware
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use('/api/users', usersRouter);

app.get('*', (req, res) => {
    console.log('Serving frontend for:', req.url);
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
});