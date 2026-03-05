import { getCurrentQuote } from "../state.js";
import { renderFavourites } from "../ui/favouritesView.js";
import { renderFavouriteButton } from "../ui/quoteView.js";
import {
  addFavouriteId,
  removeFavouriteId,
  getFavouriteIds,
  isFavouriteId,
} from "../utils/storage.js";

const removeFromFavourites = (id, quotes) => {
  const currentQuote = getCurrentQuote();

  if (currentQuote?.id === id) {
    renderFavouriteButton({ isFavourite: false });
  }

  removeFavouriteId(id);

  updateFavouritesList(quotes);
};

const updateFavouritesList = (quotes) => {
  const favouriteIds = getFavouriteIds();

  const favourites = favouriteIds
    .map((id) => quotes.find((quote) => quote.id === id))
    .filter(Boolean);

  renderFavourites(favourites, (id) => removeFromFavourites(id, quotes));
};

export const toggleFavourite = (quotes) => {
  const currentQuote = getCurrentQuote();

  if (!currentQuote) return;

  const fav = isFavouriteId(currentQuote.id);

  if (fav) {
    removeFavouriteId(currentQuote.id);
  } else {
    addFavouriteId(currentQuote.id);
  }

  renderFavouriteButton({ isFavourite: !fav });
  updateFavouritesList(quotes);
};

export const initFavourites = (quotes, bindFavouriteClick) => {
  updateFavouritesList(quotes);
  bindFavouriteClick(() => toggleFavourite(quotes));
};
