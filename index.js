import { quotes } from "./src/data/quotes.js";
import { QuotesApp } from "./src/app/QuotesApp.js";
import { QuoteService } from "./src/services/QuoteService.js";
import { StorageService } from "./src/services/StorageService.js";
import { FavouritesView } from "./src/views/FavouritesView.js";
import { QuoteView } from "./src/views/QuoteView.js";

const storageService = new StorageService();
const quoteService = new QuoteService(quotes);
const quoteView = new QuoteView();
const favouritesView = new FavouritesView();

const app = new QuotesApp({
  quoteService,
  storageService,
  quoteView,
  favouritesView,
});

app.init();
