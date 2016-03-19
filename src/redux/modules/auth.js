import { handleActions } from 'redux-actions';
import { pushPath } from 'redux-simple-router';

import { saveAuth, loadAuth, removeAuth } from 'utils/AuthStorage';

export const AUTH_SIGNIN = 'AUTH_SIGNIN';
export const AUTH_SIGNUP = 'AUTH_SIGNUP';
export const AUTH_SIGNOUT = 'AUTH_SIGNOUT';

export const constants = {
  AUTH_SIGNIN,
  AUTH_SIGNUP,
  AUTH_SIGNOUT
};

export const signIn = payload => dispatch => {
  saveAuth(payload);
  dispatch({
    type: AUTH_SIGNIN,
    payload
  });
  dispatch(pushPath('/dashboard'));
};

export const signUp = payload => dispatch => {
  saveAuth(payload);
  dispatch({
    type: AUTH_SIGNUP,
    payload
  });
  dispatch(pushPath('/dashboard'));
};

export const signOut = () => dispatch => {
  removeAuth();
  dispatch({
    type: AUTH_SIGNOUT
  });
  dispatch(pushPath('/signin'));
};

export const actions = {
  signIn,
  signUp,
  signOut
};

const initialState = {
  token: null,
  user: null,
  ...loadAuth()
};

export default handleActions({
  [AUTH_SIGNIN]: (state, { payload }) => payload,
  [AUTH_SIGNUP]: (state, { payload }) => payload,
  [AUTH_SIGNOUT]: () => ({
    token: null,
    user: null
  })
}, initialState);
