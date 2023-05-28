export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._initialCards = items;
    this._renderer = renderer;
  }

  addCards() {
    this._initialCards.forEach((element) => {
      this.addItem(this._renderer(element));
    })
  }

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }

  renderItems() {
    this._initialCards.forEach(this.renderer);
    }
}