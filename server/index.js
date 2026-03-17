import express from "express";
import { quotes } from "./data/quotes.js";

const app = express();

const PORT = 3000;

let previousQuoteId;

function getRandomQuote(quotes, previousId) {
  if (!quotes.length) return null;

  if (quotes.length === 1) {
    return quotes[0];
  }

  let randomQuote;

  do {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    randomQuote = quotes[randomIndex];
  } while (String(randomQuote?.id) === String(previousId));

  return randomQuote;
}

app.get("/quotes/random", (req, res) => {
    const quote = getRandomQuote(quotes, previousQuoteId);
    
  if (!quote) {
    return res.status(404).json({ message: "Quotes not found" });
  }

  previousQuoteId = quote.id;

  res.json(quote);
});

app.get("/quotes", (req, res) => {
  res.json(quotes);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
