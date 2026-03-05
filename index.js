import { quotes } from "./src/data/quotes.js";
import { initFavourites } from "./src/handlers/favouritesHandler.js";
import { applyQuote, handleQuote } from "./src/handlers/quotesHandler.js";
import { bindFavouriteClick } from "./src/ui/quoteView.js";
import { loadCurrentQuoteId } from "./src/utils/storage.js";

const generateBtn = document.getElementById("generate-btn");

initFavourites(quotes, bindFavouriteClick);

const storedId = loadCurrentQuoteId();

if (storedId) {
  const realQuote = quotes.find((q) => q.id === storedId);
  applyQuote(realQuote);
}

generateBtn.addEventListener("click", () => handleQuote(quotes));
