export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._items = items;
    this.renderer = renderer;
  }

  addCardFromArray() {
    this._initialCards.array.forEach(element => {
      this.addItem(this.renderer(element));
    });
  }

  addItem(domElement) {
    this._container.prepend(domElement);
  }
}
