//объект с нужными для работы с сервером данными
export const apiConfig = {
  // url: "https://mesto.nomoreparties.co/v1/cohort-54",
  url: 'http://localhost:3000',
  credentials: "include",
  headers: {
    // authorization: '858bd672-ba6d-4b55-94fb-42daf32afd54',
    'Content-Type': 'application/json',
  },
};
