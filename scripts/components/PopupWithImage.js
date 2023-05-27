import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open ({name, link}) {
    console.log(element);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupCaption = this._popup.querySelector(".popup__image-caption");
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    super.open();
  }
}