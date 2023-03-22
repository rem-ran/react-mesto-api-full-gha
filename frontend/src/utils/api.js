import { apiConfig } from './constants.js';

class Api {
  constructor({ url, headers, credentials }) {
    this._url = url;
    this._credentials = credentials;
    this._headers = headers;
  }

  //метод проверки от сервера и преобразование из json
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText} `);
    }
    return res.json();
  }

  //получить список всех карточек в виде массива
  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      credentials: this._credentials,
      headers: this._headers,
    }).then(this._getResponseData);
  }

  //добавить карточку
  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this._getResponseData);
  }

  //поставить карточке свой лайк
  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: this._credentials,
      headers: this._headers,
    }).then(this._getResponseData);
  }

  //удалить с карточки свой лайк
  removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: this._credentials,
      headers: this._headers,
    }).then(this._getResponseData);
  }

  //удалить карточку
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: this._credentials,
      headers: this._headers,
    }).then(this._getResponseData);
  }

  //получить данные своего пользователя
  getServerUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: this._credentials,
      headers: this._headers,
    }).then(this._getResponseData);
  }

  //обновить данные своего пользователя
  updateServerUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._getResponseData);
  }

  //обновить свой аватар
  updateServerUserAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar `, {
      method: 'PATCH',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._getResponseData);
  }

  //общий метод получения данных, необходимых при начальной отрисовки сайта
  getDataForInitialLoading() {
    return Promise.all([this.getServerUserInfo(), this.getAllCards()]);
  }
}

//создаём экземпляр класса Api для работы с сервером
const api = new Api(apiConfig);

export default api;
