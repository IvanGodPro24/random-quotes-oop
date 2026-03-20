import { API_URL, PUBLIC_API_URL } from "../../config.js";

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
      const response = await fetch(`${PUBLIC_API_URL}/quotes/random`);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      const { _id, content, author } = data[0];

      return {
        id: _id,
        text: content,
        author,
      };
    } catch (error) {
      console.error("Failed to fetch quote from API:", error);
      return null;
    }
  }

  async getRandomQuoteViaOwnApi() {
    try {
      const response = await fetch(`${API_URL}/quotes/random`);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Failed to fetch quote from own API:", error);
      return null;
    }
  }
}
