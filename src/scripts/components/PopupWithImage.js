import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupImageCaption = this._popup.querySelector(".popup__image-caption");
  }

  openImagePopup = (title, link) => {   
    this._popupImage.src = link;
    this._popupImage.alt = title;
    this._popupImageCaption.textContent = title;
    super.open();
  }
  
  open(link, title) {
    this._openImagePopup(link, title);
  }
}

export default PopupWithImage;