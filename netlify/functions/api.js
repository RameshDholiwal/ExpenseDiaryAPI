const express = require('express');
const serverless = require('serverless-http');
const fs = require('fs');
const cors = require('cors');

const app = express();
const router = express.Router();

const PORT = 5000;

app.use(cors({ origin: ['https://expensemydiary.netlify.app', 'http://localhost:5173'] })); // Allow CORS for the specified origin
app.use(express.json());

const DATA_PATH = './data.json';

// GET: Read from file
router.get('/expenses', (req, res) => {
  const data = fs.readFileSync(DATA_PATH, 'utf8');
  res.json(JSON.parse(data));
});

// POST: Add new entry
router.post('/expenses', (req, res) => {
  const newExpense = req.body;
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  data.push(newExpense);
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  res.json(newExpense);
}); 


// app.listen(5000, () => {
//     console.log(`App running on PORT: ${5000}`)
// })

app.use('/.netlify/functions/api', router); // path must route to lambda

//module.exports = app;
module.exports.handler = serverless(app); // wrapper for serverless deployment
