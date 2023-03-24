// const BASE_URL = "https://api.remran.nomoredomains.work";
const BASE_URL = 'http://localhost:3000';

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
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(getResponseData)
    .then((data) => data);
};
