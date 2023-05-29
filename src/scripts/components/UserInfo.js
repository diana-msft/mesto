class UserInfo {
  constructor(infoConfig) {
    this._profileTitle = document.querySelector(infoConfig.profileTitleSelector);
    this._profileSubtitle = document.querySelector(infoConfig.profileSubtitleSelector);
  }

  getUserInfo() {
    return {name: this._profileTitle.textContent, job: this._profileSubtitle.textContent};
  }

  setUserInfo(info) {
    this._profileTitle.textContent = info.username;
    this._profileSubtitle.textContent = info.job;
  }
}

export default UserInfo;