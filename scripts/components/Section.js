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
}


  // renderItems() {
  //   this._initialCards.forEach(this.renderer);
  //   }



// constructor(selector, renderer) {
  //   this._section = document.querySelector(selector);
  //   this._renderer = renderer;

  //   // console.log(this._section);
  // }

  //   renderItems(items) {
  //     items.forEach((item) => {
  //       this._renderer(item);
  //  });
  // }

  // addItem(element) {
  //   this._section.prepend(element);
  // }