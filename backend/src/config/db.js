const mysql = require('mysql2/promise');

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

console.log('Database configuration:', dbConfig);

const pool = mysql.createPool(dbConfig);

pool.on('connection', () => console.log('New database connection established'));
pool.on('error', err => console.error('Database pool error:', err));

const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection successful!');
        const [result] = await connection.execute('SELECT 1 AS test');
        console.log('Query test result:', result);
        connection.release();
    } catch (error) {
        console.error('Database connection error:', error.code, error.message);
    }
};

testConnection();

module.exports = pool;