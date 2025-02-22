const express = require('express');
const path = require('path');
const mariadb = require('mariadb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Konfiguracja połączenia z bazą danych
const pool = mariadb.createPool({
    host: 'localhost',  
    user: 'root', 
    password: '',  // Jeśli masz hasło, wpisz je tutaj
    database: 'neuro_assistant',
    connectionLimit: 5
});

// Obsługa routingu - strona główna
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint do pobierania widżetów
app.get('/widgets', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM widgets");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) conn.release();
    }
});

// Endpoint do dodawania widżetów
app.post('/widgets', async (req, res) => {
    const { title, content, type } = req.body;
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            "INSERT INTO widgets (title, content, type) VALUES (?, ?, ?)",
            [title, content, type]
        );
        res.json({ id: result.insertId, title, content, type });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) conn.release();
    }
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});
