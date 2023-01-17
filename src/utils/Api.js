class Api {
  constructor({ baseUrl, ...options }) {
    this._baseUrl = baseUrl;
    this._options = options;
  }

  async _fetch(path, method = 'GET', body) {
    const opt = { ...this._options, method };
    if (body)
      if (typeof body === 'string') opt.body = body;
      else opt.body = JSON.stringify(body);

    const response = await fetch(this._baseUrl + path, opt);
    const json = await response.json();

    if (response.ok) return json;

    throw new Error(json.message);
  }

  getInitialCards() {
    return this._fetch('cards');
  }

  getUserInfo() {
    return this._fetch('users/me');
  }

  setUserInfo(data) {
    return this._fetch('users/me', 'PATCH', data);
  }

  setUserAvatar(data) {
    return this._fetch('users/me/avatar', 'PATCH', data);
  }

  addCard(data) {
    return this._fetch('cards', 'POST', data);
  }

  removeCard(id) {
    return this._fetch('cards/' + id, 'DELETE');
  }

  addLike(id) {
    return this._fetch('cards/' + id + '/likes', 'PUT');
  }

  changeLikeCardStatus(id, isLiked) {
    return this._fetch('cards/' + id + '/likes', isLiked ? 'PUT' : 'DELETE');
  }

  removeLike(id) {
    return this._fetch('cards/' + id + '/likes', 'DELETE');
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52/',
  headers: {
    authorization: '47016496-8e67-44e3-804c-b828c4f61e69',
    'Content-Type': 'application/json',
  },
});
