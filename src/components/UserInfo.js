export default class UserInfo {
    constructor({profileNameSelector, profileDescriptionSelector, profileAvatarSelector}){
      this._profileName = document.querySelector(profileNameSelector);
      this._profileDescription = document.querySelector(profileDescriptionSelector);
      this._profileAvatar = document.querySelector(profileAvatarSelector);
    }
    
    getUserInfo() {
      return {
        name: this._profileName.textContent,
        about: this._profileDescription.textContent,
        avatar: this._profileAvatar.src,
      }
    }
  
    setUserInfo(data) {
      this._currentUserId = data._id;
      this._profileName.textContent = data.name;
      this._profileDescription.textContent = data.about;
      this._profileAvatar.src = data.avatar;
    }
    //получить свой id
    getMyId(){
      return this._currentUserId;
    }
  }