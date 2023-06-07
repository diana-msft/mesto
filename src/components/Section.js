class Section {
  constructor({ items, renderer }, elementsSelector) {
    this._container = document.querySelector(elementsSelector);
    this._initialCards = items;
    this.renderer = renderer;
  }

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }

  renderItems() {
    this._initialCards.forEach(this.renderer);
  }
}

export default Section;
