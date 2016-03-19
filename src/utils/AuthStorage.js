import { setItem, getItem, removeItem } from './LocalStorage';
import { AUTH_STORAGE_PATH } from 'constants/Auth';

export const validateAuthObject = (auth) => {
  if (!auth) {
    return auth;
  }
  /* eslint-disable no-console */
  if (!auth.token || !auth.user) {
    console.warn('Rejecting to load malformed auth state, forcing sign out');
    return null;
  }
  /* eslint-enable no-console */
  return auth;
};

export const saveAuth = (auth) => {
  setItem(AUTH_STORAGE_PATH, auth);
};

export const loadAuth = () => (
  validateAuthObject(getItem(AUTH_STORAGE_PATH))
);

export const removeAuth = () => {
  removeItem(AUTH_STORAGE_PATH);
};

export const getAuthToken = () => {
  const auth = loadAuth();
  if (!auth) {
    return null;
  }
  return auth.token;
};

export const getAuthorizedUser = () => {
  const auth = loadAuth();
  if (!auth) {
    return null;
  }
  return auth.user;
};
