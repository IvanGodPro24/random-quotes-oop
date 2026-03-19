export class QuotesApp {
  constructor({ quoteService, storageService, quoteView, favouritesView }) {
    this.quoteService = quoteService;
    this.storageService = storageService;
    this.quoteView = quoteView;
    this.favouritesView = favouritesView;

    this.generateBtn = document.getElementById("generate-btn");
    this.generateBtnViaApi = document.getElementById("generate-btn-api");
    this.generateBtnViaOwnApi = document.getElementById("generate-btn-own");
  }

  init() {
    this.restoreCurrentQuote();
    this.renderFavourites();

    this.generateBtn.addEventListener("click", () => this.showQuote("local"));
    this.generateBtnViaApi.addEventListener("click", () =>
      this.showQuote("api"),
    );
    this.generateBtnViaOwnApi.addEventListener("click", () => {
      this.showQuote("own-api");
    });

    this.quoteView.bindFavouriteClick(() => this.toggleFavourite());
  }

  restoreCurrentQuote() {
    const storedQuote = this.storageService.loadCurrentQuote();

    if (!storedQuote) return;

    this.applyQuote(storedQuote);
  }

  applyQuote(quote) {
    if (!quote) return;

    this.quoteService.setCurrentQuote(quote);

    this.storageService.saveCurrentQuote(quote);

    this.quoteView.renderQuote(quote);
    this.quoteView.renderFavouriteButton(
      this.storageService.isFavouriteId(quote.id),
    );
  }

  async showQuote(source = "local") {
    let quote;

    if (source === "api") {
      quote = await this.quoteService.getRandomQuoteViaApi();
    } else if (source === "own-api") {
      quote = await this.quoteService.getRandomQuoteViaOwnApi();
    } else {
      quote = this.quoteService.getRandomQuote();
    }

    this.applyQuote(quote);
  }

  toggleFavourite() {
    const currentQuote = this.quoteService.getCurrentQuote();

    if (!currentQuote) return;

    const isFavourite = this.storageService.isFavouriteId(currentQuote.id);

    if (isFavourite) {
      this.storageService.removeFavourite(currentQuote.id);
    } else {
      this.storageService.addFavourite(currentQuote);
    }

    this.quoteView.renderFavouriteButton(!isFavourite);
    this.renderFavourites();
  }

  removeFromFavourites(id) {
    const currentQuote = this.quoteService.getCurrentQuote();

    if (String(currentQuote?.id) === String(id)) {
      this.quoteView.renderFavouriteButton(false);
    }

    this.storageService.removeFavourite(id);
    this.renderFavourites();
  }

  renderFavourites() {
    const favourites = this.storageService.getFavourites();

    this.favouritesView.render(favourites, (id) =>
      this.removeFromFavourites(id),
    );
  }
}
