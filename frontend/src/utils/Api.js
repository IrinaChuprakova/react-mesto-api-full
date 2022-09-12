export class Api {
    constructor({baseUrl,headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _checkStatus(res){
      if (res.ok){
        return res.json();
      }
      else{
       return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
      }
    }
  
    getInitialCards() {
      const cardsUrl = `${this._baseUrl}/cards`;
      return fetch(cardsUrl,{
        headers: getHeaders()
      })
      .then(this._checkStatus);
    }

    getUserInfo() {
      const cardsUrl = `${this._baseUrl}/users/me`;
      return fetch(cardsUrl,{
        headers: getHeaders()
      })
      .then(this._checkStatus);
    }
    

    sendUserInfo(name, about){
      const cardsUrl = `${this._baseUrl}/users/me`;
      return fetch(cardsUrl,{
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then(this._checkStatus);
    }

    sendCard(name,link){
      const cardsUrl = `${this._baseUrl}/cards`;
      return fetch(cardsUrl,{
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(this._checkStatus);
    }

    removeCard(cardId){
      const cardsUrl = `${this._baseUrl}/cards/${cardId}`;
      return fetch(cardsUrl,{
        method: 'DELETE',
        headers: getHeaders()
      })
      .then(this._checkStatus);
    }
    
    changeLikeCardStatus(cardId, isLiked) {
      if (isLiked) {
        return this.removeLike(cardId);
      } else {
        return this.addLike(cardId);
      }
    }

    addLike(cardId){
      const cardsUrl = `${this._baseUrl}/cards/${cardId}/likes`;
      return fetch(cardsUrl,{
        method: 'PUT',
        headers: getHeaders()
      })
      .then(this._checkStatus);
    }

    removeLike(cardId){
      const cardsUrl = `${this._baseUrl}/cards/${cardId}/likes`;
      return fetch(cardsUrl,{
        method: 'DELETE',
        headers: getHeaders()
      })
      .then(this._checkStatus);
    }

    updateAvatar(link){
      const cardsUrl = `${this._baseUrl}/users/me/avatar `;
      return fetch(cardsUrl,{
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({avatar:link})
      })
      .then(this._checkStatus);
    }


  }

  function getHeaders(){
    return {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    }
   }
  const api = new Api({baseUrl:'http://MestoIrina.nomoredomains.sbs', 
  // headers: {
  //   'Authorization': `Bearer ${localStorage.getItem("token")}`,
  //   'Content-Type': 'application/json'
  // }
});
  
  export default api;