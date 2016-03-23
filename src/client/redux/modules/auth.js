import { createAction, handleActions } from 'redux-actions';
import { fork, put } from 'redux-saga/effects';
import { pushPath } from 'redux-simple-router';
import { takeEvery } from 'redux-saga';

import { apiAuthActions } from 'common/constants/actions';
import { loadAuth } from 'utils/AuthStorage';

export const actions = {
  signIn: createAction(apiAuthActions.API_AUTH_SIGNIN),
  signUp: createAction(apiAuthActions.API_AUTH_SIGNUP),
  signOut: createAction(apiAuthActions.API_AUTH_SIGNOUT)
};

export const initialState = {
  token: null,
  user: null,
  ...loadAuth()
};

export const reducer = handleActions({
  [apiAuthActions.API_AUTH_AUTHORIZE]: (state, { payload }) => payload,
  [apiAuthActions.API_AUTH_DEAUTHORIZE]: () => ({
    token: null,
    user: null
  })
}, initialState);

function *redirect(redirectMap, action) {
  yield put(pushPath(redirectMap[action.type] || '/status/404'));
}

function *redirecter() {
  const redirectMap = {
    [apiAuthActions.API_AUTH_AUTHORIZE]: '/dashboard',
    [apiAuthActions.API_AUTH_DEAUTHORIZE]: '/signin'
  };
  yield* takeEvery(Object.keys(redirectMap), redirect, redirectMap);
}

export const saga = function *authSaga() {
  yield fork(redirecter);
};

export default {
  constants: null,
  actions,
  initialState,
  reducer,
  saga
};
