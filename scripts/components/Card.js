export default class Card {
  constructor(element, selectorTemplate, openImagePopup) {
    this._element = element;
    this._link = element.link;
    this._name = element.name;
    this._selectorTemplate = selectorTemplate;
    this._openImagePopup = openImagePopup;
    this._newElement = this._getTemplateCopy();
    this._elementTitle = this._newElement.querySelector(".element__title");
    this._elementImage = this._newElement.querySelector(".element__image");
    this._elementDeleteButton = this._newElement.querySelector(".element__delete-button");
    this._elementLikeButton = this._newElement.querySelector(".element__like-button");
    this._setEventListeners ();
  }

  //получение клонированного элемента из шаблона
  _getTemplateCopy() {
    return document.querySelector(this._selectorTemplate).content.querySelector(".element").cloneNode(true)
  }

  //добавляем слушатели на кнопки
  _handleLike = () => {
    this._elementLikeButton.classList.toggle("element__like-button_active");
  }

  _handleDelete = () => {
    this._newElement.remove();
    this._newElement = null;
  }

  _handleOpenPopupImage = () => {
    this._openImagePopup({ text: this._name, link: this._link });
    // popupImageZoom.open({ text: this._name, link: this._link });
  }

  _setEventListeners () {
    this._elementLikeButton.addEventListener('click', this._handleLike);
    this._elementDeleteButton.addEventListener('click', this._handleDelete);
    this._elementImage.addEventListener('click', this._handleOpenPopupImage);
  }
  

  //создание карточки элемента
  createCard() {
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    return this._newElement;
  }
}
