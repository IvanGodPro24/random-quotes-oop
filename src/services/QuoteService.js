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
    return this.quotes.find((quote) => String(quote.id) === String(id)) || null;
  }

  getRandomQuote() {
    if (!this.quotes.length) return null;

    if (this.quotes.length === 1) {
      return this.quotes[0];
    }

    let randomQuote;

    do {
      const randomIndex = Math.floor(Math.random() * this.quotes.length);
      randomQuote = this.quotes[randomIndex];
    } while (String(randomQuote?.id) === String(this.currentQuote?.id));

    return randomQuote;
  }

  async getRandomQuoteViaApi() {
    try {
      const response = await fetch("https://api.quotable.io/random");

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      return {
        id: data._id,
        text: data.content,
        author: data.author,
      };
    } catch (error) {
      console.error("Failed to fetch quote from API:", error);
      return null;
    }
  }
}
