export default class Api{
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

_getHeaders() {
  return {
    "Content-Type": "application/json",
    authorization: this._token,
  };
}
  
_getJson(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
getCard(){
  return fetch(`${this._baseUrl}${'cards'}`,{
  method: 'GET',
  headers: this._getHeaders(),
})
.then(this._getJson);
}
getCurrentUser(){
  return fetch(`${this._baseUrl}${'users/me'}`, {
  method: "GET",
  headers: this._getHeaders(),
  })
  .then(this._getJson);
}
postCardtoServer(data) {
  return fetch(`${this._baseUrl}/cards`, {
    method: "POST",
    headers: this._getHeaders(),
    body: JSON.stringify(data),
  }).then(this._getJson);

}

getUserData() {
  return fetch(`${this._baseUrl}/users/me`, {
    method: "GET",
    headers: this._getHeaders(),
  }).then(this._getJson);
}

patchUserData({name, about}) {
  return fetch(`${this._baseUrl}/users/me`, {
    method: "PATCH",
    headers: this._getHeaders(),
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }})
  .then(this._getJson);
}

putLikeToCard(cardId) {
  return fetch(`${this._baseUrl}${"cards/likes/"}${cardId}`, {
    method: "PUT",
    headers: this._getHeaders(),
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }})
  .then(this._getJson);
}

deleteLikeFromCard(cardId) {
  return fetch(`${this._baseUrl}${"cards/likes/"}${cardId}`, {
    method: "DELETE",
    headers: this._getHeaders(),
  })  .then(res => {
    if (res.ok) {
      return res.json();
    }})
  .then(this._getJson);
}

//метод обновления аватара пользователя
changeAvatar(src) {
  return fetch(`${this._baseUrl}${"users/me/avatar"}`, {
    method: 'PATCH',
    headers: this._getHeaders(),
        body: JSON.stringify({
          avatar: src.link
        })
      })
      .then(this._getJson);
}

//удалить карточку
deleteCard(cardId) {
  return fetch(`${this._baseUrl}${"cards/"}${cardId}`, {
    method: "DELETE",
    headers: this._getHeaders(),
  }).then(this._getJson);
}
}
