import { getAuthToken } from 'utils/AuthStorage';

export const API_HOST = `${__API_HOST__}/api`;

const fetch = (...args) => (
  window.fetch(...args).then(response => response.json())
);

export const getJson = (url) => () => (
  fetch(`${API_HOST}${url}`, {
    type: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    }
  })
);

export const sendData = (method, url) => (data) => (
  fetch(`${API_HOST}${url}`, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify(data),
    credentials: 'same-origin'
  })
);

export default {
  auth: {
    signin: sendData('POST', '/auth/signin'),
    signup: sendData('POST', '/auth/signup')
  },
  bot: {
    create: sendData('POST', '/bot')
  }
};
