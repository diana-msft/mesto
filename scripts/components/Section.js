export default class Section {
  constructor(selector, renderer) {
    this._section = document.querySelector(selector);
    this._renderer = renderer;

    console.log(this._section);
  }

    renderItems(items) {
      items.forEach((item) => {
        this._renderer(item);
   });
  }

  addItem(element) {
    this._section.prepend(element);
  }

  // constructor({ items, renderer }, containerSelector) {
  //   this._container = document.querySelector(containerSelector);
  //   this._items = items;
  //   this._renderer = renderer;
  // }

  // renderItems(items) {
  //   items.forEach(item => {
  //     this._renderer(item);
  //   });
  // }

  // addItem(element) {
  //   this._container.prepend(element);
  // }
}
