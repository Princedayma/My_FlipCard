const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors(
  {
    origin: ["https://my-flip-card.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true 
  }
));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,  // Default MySQL port, adjust if necessary
  user: 'root',
  password: '0000',
  database: 'flipcards_db',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Create FlipCards table if it doesn't exist
db.query(
  `CREATE TABLE IF NOT EXISTS flipcards (
     id INT AUTO_INCREMENT PRIMARY KEY,
     question VARCHAR(255),
     answer VARCHAR(255)
   )`,
  (err, result) => {
    if (err) throw err;
    console.log('FlipCards table created or already exists.');
  }
);

// Routes
app.get('/flipcards', (req, res) => {
  db.query('SELECT * FROM flipcards', (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/flipcards', (req, res) => {
  const { question, answer } = req.body;
  db.query('INSERT INTO flipcards (question, answer) VALUES (?, ?)', [question, answer], (err, result) => {
    if (err) throw err;
    res.send({ id: result.insertId, question, answer });
  });
});

app.put('/flipcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  db.query('UPDATE flipcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete('/flipcards/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM flipcards WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
