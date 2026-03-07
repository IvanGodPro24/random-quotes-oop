export class QuoteService {
  constructor(quotes = []) {
    this.quotes = quotes;
    this.currentQuote = null;
  }

  setCurrentQuote(quote) {
    this.currentQuote = quote;
  }

  getCurrentQuote() {
    return this.currentQuote;
  }

  getQuoteById(id) {
    return this.quotes.find((quote) => quote.id === Number(id)) || null;
  }

  getRandomQuote() {
    let randomQuote;

    do {
      const randomIndex = Math.floor(Math.random() * this.quotes.length);
      randomQuote = this.quotes[randomIndex];
    } while (randomQuote?.id === this.currentQuote?.id);

    return randomQuote;
  }

  getFavouriteQuotes(favouriteIds = []) {
    return favouriteIds
      .map((id) => this.getQuoteById(id))
      .filter(Boolean);
  }
}
