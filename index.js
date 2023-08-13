const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000; // You can choose any available port number

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
  origin: 'chrome-extension://kaghomlkbggljdhciafbcnbckedldhpc'
}));
app.use(express.json()); // Parse JSON request bodies

// Define the path to the quotes.json file
const quotesFilePath = './data/quotes.json';

// Read the BTS comforting quotes from the quotes.json file
const getQuotes = () => {
  try {
    const quotesData = fs.readFileSync(quotesFilePath, 'utf-8');
    return JSON.parse(quotesData);
  } catch (error) {
    console.error('Error reading quotes:', error);
    return [];
  }
};

// Write BTS comforting quotes to the quotes.json file
const writeQuotes = (quotes) => {
  try {
    fs.writeFileSync(quotesFilePath, JSON.stringify(quotes, null, 2));
  } catch (error) {
    console.error('Error writing quotes:', error);
  }
};

// Define an endpoint to get all quotes
app.get('/quotes', (req, res) => {
  const quotes = getQuotes();
  res.json(quotes);
});

// Define an endpoint to add a new quote
app.post('/quotes', (req, res) => {
  const newQuote = req.body;
  if (!newQuote || !newQuote.quote || !newQuote.member) {
    return res.status(400).json({ error: 'Invalid quote data' });
  }

  const quotes = getQuotes();
  quotes.push(newQuote);
  writeQuotes(quotes);

  res.json(newQuote);
});

// Define an endpoint to get a random quote
app.get('/random-quote', (req, res) => {
  const quotes = getQuotes();
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  res.json(randomQuote);
});

// Define a default route to handle the root URL
app.get('/', (req, res) => {
  res.send('Welcome to BTS Comforting Quote API. Use /random-quote to get a random BTS comforting quote.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
