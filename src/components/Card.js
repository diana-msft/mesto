class Card {
  constructor(card, selectorTemplate, openImagePopup) {
    this._card = card;
    this._link = card.link;
    this._title = card.title;
    this._selectorTemplate = selectorTemplate;
    this._openImagePopup = openImagePopup;
    this._newElement = this._getTemplateCopy();
    this._elementTitle = this._newElement.querySelector(".element__title");
    this._elementImage = this._newElement.querySelector(".element__image");
    this._elementDeleteButton = this._newElement.querySelector(
      ".element__delete-button"
    );
    this._elementLikeButton = this._newElement.querySelector(
      ".element__like-button"
    );

    this._handleLike = this._handleLike.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._handleCardClick = this._handleCardClick.bind(this);

    this._setEventListeners();
  }

  //получение клонированного элемента из шаблона
  _getTemplateCopy() {
    return document
      .querySelector(this._selectorTemplate)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  //добавляем слушатели на кнопки
  _handleLike = () => {
    this._elementLikeButton.classList.toggle("element__like-button_active");
  };

  _handleDelete = () => {
    this._newElement.remove();
    this._newElement = null;
  };

  _handleCardClick = () => {
    this._openImagePopup(this._link, this._title);
  };

  _setEventListeners() {
    this._elementLikeButton.addEventListener("click", this._handleLike);
    this._elementDeleteButton.addEventListener("click", this._handleDelete);
    this._elementImage.addEventListener("click", this._handleCardClick);
  }

  //создание карточки элемента
  createCard() {
    this._elementImage.src = this._link;
    this._elementImage.alt = this._title;
    this._elementTitle.textContent = this._title;
    return this._newElement;
  }
}

export default Card;
