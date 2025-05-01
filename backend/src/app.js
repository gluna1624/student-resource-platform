const express = require('express');
const cors = require('cors');
const path = require('path');
const resourceRoutes = require('./routes/resources');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/resources', resourceRoutes);
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
    });
}

app.get('/', (req, res) => res.send('Backend running'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));