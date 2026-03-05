import { generateRandomNumber } from "../utils/math.js";
import { getCurrentQuote, setCurrentQuote } from "../state.js";
import { isFavouriteId, saveCurrentQuoteId } from "../utils/storage.js";
import { renderFavouriteButton, renderQuote } from "../ui/quoteView.js";

export const applyQuote = (quote) => {
  if (!quote) return;

  setCurrentQuote(quote);

  saveCurrentQuoteId(quote.id);

  renderQuote(quote);
  renderFavouriteButton({ isFavourite: isFavouriteId(quote.id) });
};

export const generateRandomQuote = (quotes) => {
  const currentQuote = getCurrentQuote();
  let randomQuote;

  do {
    const randomIndex = generateRandomNumber(quotes.length);
    randomQuote = quotes[randomIndex];
  } while (randomQuote === currentQuote);

  return randomQuote;
};

export const handleQuote = (quotes) => {
  const randomQuote = generateRandomQuote(quotes);

  applyQuote(randomQuote);
};
