const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DATA_PATH = './data.json';

// GET: Read from file
app.get('/api/expenses', (req, res) => {
  const data = fs.readFileSync(DATA_PATH, 'utf8');
  res.json(JSON.parse(data));
});

// POST: Add new entry
app.post('/api/expenses', (req, res) => {
  const newExpense = req.body;
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  data.push(newExpense);
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  res.json(newExpense);
}); 


app.listen(5000, () => {
    console.log(`App running on PORT: ${5000}`)
})
