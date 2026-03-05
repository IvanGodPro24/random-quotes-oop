import { CURRENT_QUOTE, FAVOURITES } from "./storageKeys.js";

export const loadFromLocalStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (error) {
    console.error("Failed to load:", error);
  }
};

export const saveInLocalStorage = (key, value) => {
  try {
    if (!key || value === undefined) {
      throw new Error("Key and value are required");
    }

    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to save:", error);
  }
};

export const getFavouriteIds = () =>
  loadFromLocalStorage(FAVOURITES).map(Number);

export const isFavouriteId = (id) => getFavouriteIds().includes(id);

export const addFavouriteId = (id) => {
  try {
    const ids = getFavouriteIds();
    const numId = Number(id);

    if (!ids.includes(numId)) ids.push(numId);

    saveInLocalStorage(FAVOURITES, ids);

    return ids;
  } catch (error) {
    console.error("Failed to add favourites:", error);
  }
};

export const removeFavouriteId = (id) => {
  try {
    const numId = Number(id);

    const ids = getFavouriteIds();

    const filteredIds = ids.filter((favId) => favId !== numId);

    saveInLocalStorage(FAVOURITES, filteredIds);

    return filteredIds;
  } catch (error) {
    console.error("Failed to remove favourites:", error);
  }
};

export const saveCurrentQuoteId = (id) =>
  saveInLocalStorage(CURRENT_QUOTE, Number(id));

export const loadCurrentQuoteId = () => {
  const id = loadFromLocalStorage(CURRENT_QUOTE);
  return id || null;
};
