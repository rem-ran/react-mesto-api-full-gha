// const BASE_URL = "https://auth.nomoreparties.co";
const BASE_URL = "http://localhost:3000";

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`${res.status} ${res.statusText}`);
  }
  return res.json();
}

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(getResponseData);
};

export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then(getResponseData)
    // .then((data) => {
    //   localStorage.setItem('jwt', data._id)
    //   return data;
    // })
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  })
    .then(getResponseData)
    .then((data) => data);
};
