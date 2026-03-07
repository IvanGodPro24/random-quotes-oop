import { STORAGE_KEYS } from "../constants/storageKeys.js";

export class StorageService {
  load(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch (error) {
      console.error(`Failed to load data for key "${key}":`, error);
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

  getFavouriteIds() {
    return this.load(STORAGE_KEYS.FAVOURITES).map(Number);
  }

  isFavouriteId(id) {
    return this.getFavouriteIds().includes(id);
  }

  addFavourite(id) {
    try {
      const ids = this.getFavouriteIds();
      const numId = Number(id);

      if (!ids.includes(numId)) {
        ids.push(numId);
        this.save(STORAGE_KEYS.FAVOURITES, ids);
      }

      return ids;
    } catch (error) {
      console.error("Failed to add favourites:", error);
    }
  }

  removeFavourite(id) {
    try {
      const numId = Number(id);

      const ids = this.getFavouriteIds();

      const filteredIds = ids.filter((favId) => favId !== numId);

      this.save(STORAGE_KEYS.FAVOURITES, filteredIds);

      return filteredIds;
    } catch (error) {
      console.error("Failed to remove favourites:", error);
    }
  }

  saveCurrentQuoteId(id) {
    this.save(STORAGE_KEYS.CURRENT_QUOTE, Number(id));
  }

  loadCurrentQuoteId() {
    const id = this.load(STORAGE_KEYS.CURRENT_QUOTE);
    return id || null;
  }
}
