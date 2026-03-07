export class QuotesApp {
  constructor({ quoteService, storageService, quoteView, favouritesView }) {
    this.quoteService = quoteService;
    this.storageService = storageService;
    this.quoteView = quoteView;
    this.favouritesView = favouritesView;

    this.generateBtn = document.getElementById("generate-btn");
  }

  init() {
    this.restoreCurrentQuote();
    this.renderFavourites();

    this.generateBtn.addEventListener("click", () => this.showQuote());

    this.quoteView.bindFavouriteClick(() => this.toggleFavourite());
  }

  restoreCurrentQuote() {
    const storedId = this.storageService.loadCurrentQuoteId();

    if (storedId) {
      const realQuote = this.quoteService.getQuoteById(storedId);
      this.applyQuote(realQuote);
    }
  }

  applyQuote(quote) {
    if (!quote) return;

    this.quoteService.setCurrentQuote(quote);

    this.storageService.saveCurrentQuoteId(quote.id);

    this.quoteView.renderQuote(quote);
    this.quoteView.renderFavouriteButton(
      this.storageService.isFavouriteId(quote.id),
    );
  }

  showQuote() {
    const quote = this.quoteService.getRandomQuote();

    this.applyQuote(quote);
  }

  toggleFavourite() {
    const currentQuote = this.quoteService.getCurrentQuote();

    if (!currentQuote) return;

    const isFavourite = this.storageService.isFavouriteId(currentQuote.id);

    if (isFavourite) {
      this.storageService.removeFavourite(currentQuote.id);
    } else {
      this.storageService.addFavourite(currentQuote.id);
    }

    this.quoteView.renderFavouriteButton(!isFavourite);
    this.renderFavourites();
  }

  removeFromFavourites(id) {
    const currentQuote = this.quoteService.getCurrentQuote();

    if (currentQuote?.id === id) {
      this.quoteView.renderFavouriteButton(false);
    }

    this.storageService.removeFavourite(id);
    this.renderFavourites();
  }

  renderFavourites() {
    const favouriteIds = this.storageService.getFavouriteIds();

    const favourites = this.quoteService.getFavouriteQuotes(favouriteIds);

    this.favouritesView.render(favourites, (id) =>
      this.removeFromFavourites(id),
    );
  }
}
