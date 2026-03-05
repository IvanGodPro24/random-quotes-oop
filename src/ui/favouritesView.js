const favouritesContainer = document.getElementById("favourites-container");
const favouritesCount = document.querySelector(".favourites-count");

export const renderFavourites = (favourites, onDelete) => {
  favouritesContainer.innerHTML = "";

  if (!favourites.length) {
    favouritesContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📚</div>
        <p class="empty-state-text">No favourite quotes yet</p>
        <p class="empty-state-hint">Click the star button to add quotes here</p>
      </div>`;

    favouritesCount.textContent = "(0)";
    return;
  }

  favourites.forEach(({ id, text, author }) => {
    const item = document.createElement("div");
    item.classList.add("favourite-item");
    item.dataset.id = id;

    const quoteElement = document.createElement("p");
    quoteElement.classList.add("favourite-quote-text");
    quoteElement.textContent = `"${text}"`;

    const authorElement = document.createElement("p");
    authorElement.classList.add("favourite-author-text");
    authorElement.textContent = `— ${author}`;

    const delBtn = document.createElement("button");
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", () => onDelete(id));

    item.append(quoteElement, authorElement, delBtn);
    favouritesContainer.appendChild(item);
  });

  favouritesCount.textContent = `(${favourites.length})`;
};
