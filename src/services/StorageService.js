import { STORAGE_KEYS } from "../constants/storageKeys.js";

export class StorageService {
  load(key, defaultValue = null) {
    try {
      const rawValue = localStorage.getItem(key);

      if (rawValue === null) {
        return defaultValue;
      }

      return JSON.parse(rawValue);
    } catch (error) {
      console.error(`Failed to load data for key "${key}":`, error);
      return defaultValue;
    }
  }

  save(key, value) {
    try {
      if (!key || value === undefined) {
        throw new Error("Key and value are required");
      }

      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to save data for key "${key}":`, error);
    }
  }

  getFavourites() {
    return this.load(STORAGE_KEYS.FAVOURITES, []);
  }

  isFavouriteId(id) {
    return this.getFavourites().some(
      (quote) => String(quote.id) === String(id),
    );
  }

  addFavourite(quote) {
    try {
      const quotes = this.getFavourites();

      const isExists = quotes.some(
        (favQuote) => String(favQuote.id) === String(quote.id),
      );

      if (!isExists) {
        quotes.push(quote);
        this.save(STORAGE_KEYS.FAVOURITES, quotes);
      }

      return quotes;
    } catch (error) {
      console.error("Failed to add favourites:", error);
    }
  }

  removeFavourite(id) {
    try {
      const quotes = this.getFavourites();

      const filteredQuotes = quotes.filter(
        (quote) => String(quote.id) !== String(id),
      );

      this.save(STORAGE_KEYS.FAVOURITES, filteredQuotes);

      return filteredQuotes;
    } catch (error) {
      console.error("Failed to remove favourites:", error);
    }
  }

  saveCurrentQuote(quote) {
    this.save(STORAGE_KEYS.CURRENT_QUOTE, quote);
  }

  loadCurrentQuote() {
    return this.load(STORAGE_KEYS.CURRENT_QUOTE, null);
  }
}
