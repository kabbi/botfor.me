import { fork, put, select, take } from 'redux-saga/effects';
import { handleActions } from 'redux-actions';
import { push } from 'react-router-redux';
import { fromJS } from 'immutable';

import { loadAuth, saveAuth, removeAuth } from 'utils/AuthStorage';
import { constants as apiConstants, actions as apiActions } from 'common/modules/auth';
import {
  actions as remoteActions,
  constants as remoteConstants,
  handleRemoteActions
} from 'redux/modules/remote';

export const path = 'auth';

export const selectors = {
  isAuthorized: state => !!state.getIn([path, 'token']),
  getState: state => state.get(path),
  getToken: state => state.getIn([path, 'token']),
  getUser: state => state.getIn([path, 'user'])
};

export const actions = {
  signIn: formData => remoteActions.sendRemoteAction(
    apiActions.signIn(formData)
  ),
  signUp: formData => remoteActions.sendRemoteAction(
    apiActions.signUp(formData)
  ),
  signOut: () => remoteActions.sendRemoteAction(
    apiActions.signOut()
  ),
};

export const initialState = fromJS({
  token: null,
  user: null,
  // TODO: Possibly move initial auth loading somewhere else
  ...loadAuth()
});

export const reducer = handleActions({
  [remoteConstants.REMOTE_RECEIVE_ACTION]: handleRemoteActions({
    [apiConstants.API_AUTH_AUTHORIZE]: (state, { payload }) => state
      .set('token', payload.token).set('user', fromJS(payload.user)),
    [apiConstants.API_AUTH_DEAUTHORIZE]: state => state
      .set('token', null).set('user', null)
  })
}, initialState);

function *persister() {
  while (true) {
    const action = yield take([
      apiConstants.API_AUTH_AUTHORIZE,
      apiConstants.API_AUTH_DEAUTHORIZE
    ]);
    if (action.type === apiConstants.API_AUTH_AUTHORIZE) {
      const auth = yield select(selectors.getState);
      saveAuth(auth.toJS());
    }
    if (action.type === apiConstants.API_AUTH_DEAUTHORIZE) {
      removeAuth();
    }
  }
}

function *redirecter() {
  const redirectMap = {
    [apiConstants.API_AUTH_AUTHORIZE]: '/dashboard',
    [apiConstants.API_AUTH_DEAUTHORIZE]: '/signin'
  };
  while (true) {
    const intent = yield take(remoteConstants.REMOTE_RECEIVE_ACTION);
    const { type } = intent.payload.action;
    if (!redirectMap[type]) {
      continue;
    }
    yield put(push(redirectMap[type]));
  }
}

export const saga = function *authSaga() {
  yield fork(redirecter);
  yield fork(persister);
};

export default {
  constants: null,
  actions,
  initialState,
  reducer,
  saga
};
