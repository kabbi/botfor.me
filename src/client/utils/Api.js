import { getAuthToken } from 'utils/AuthStorage';

export const API_HOST = `${__API_HOST__}/api`;

const fetch = (...args) => (
  window.fetch(...args).then(response => response.json())
);

const interpolate = (string = '', params = {}) => {
  const result = [];
  string.split(':').forEach((segment, idx) => {
    if (idx === 0) {
      result.push(segment);
    } else {
      const segmentMatch = segment.match(/(\w+)(.*)/);
      const key = segmentMatch[1];
      result.push(params[key]);
      result.push(segmentMatch[2] || '');
      delete params[key];
    }
  });
  return result.join('');
};

export const getJson = url => params => (
  fetch(`${API_HOST}${interpolate(url, params)}`, {
    type: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    }
  })
);

export const sendData = (url, method) => (data, params = {}) => (
  fetch(`${API_HOST}${interpolate(url, params)}`, {
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
    signin: sendData('/auth/signin', 'POST'),
    signup: sendData('/auth/signup', 'POST')
  },
  bot: {
    create: sendData('/bot', 'POST'),
    list: getJson('/bot'),
    fetch: getJson('/bot/:botId'),
    status: getJson('/bot/:botId/status'),
    deploy: sendData('/bot/:botId/deploy', 'POST'),
    start: sendData('/bot/:botId/start', 'POST'),
    stop: sendData('/bot/:botId/stop', 'POST')
  }
};
