import { handleActions } from 'redux-actions';
import { List, fromJS } from 'immutable';

import { actions as apiActions, constants as apiConstants } from 'common/modules/bots';
import {
  actions as remoteActions,
  constants as remoteConstants,
  handleRemoteActions
} from 'redux/modules/remote';

import keyBy from 'lodash/keyBy';
import map from 'lodash/map';

export const path = 'bots';

export const selectors = {
  isLoading: state => state.getIn([path, 'loading']),
  getEntities: state => state.getIn([path, 'entities']),
  getBots: state => {
    const entities = selectors.getEntities(state);
    const ids = state.getIn([path, 'list', 'ids'], new List());
    return ids.map(id => entities.get(id));
  },
  getCurrentBot: state => {
    const entities = selectors.getEntities(state);
    const id = state.getIn([path, 'current', 'id']);
    return id ? entities.get(id) : null;
  }
};

export const actions = {
  listBots: () => remoteActions.sendRemoteAction(
    apiActions.listBots()
  ),
  openBot: botId => remoteActions.sendRemoteAction(
    apiActions.fetchBot(botId)
  )
};

export const initialState = fromJS({
  loading: false,
  entities: {},
  list: null,
  current: null
});

export const reducer = handleActions({
  [remoteConstants.REMOTE_SEND_ACTION]: handleRemoteActions({
    [apiConstants.API_BOT_LIST]: state => state
      .set('list', fromJS({
        loading: true
      }))
      .set('loading', true),
    [apiConstants.API_BOT_FETCH]: state => state
      .set('current', fromJS({
        loading: true
      }))
      .set('loading', true)
  }),
  [remoteConstants.REMOTE_RECEIVE_ACTION]: handleRemoteActions({
    [apiConstants.API_BOT_LIST]: (state, { payload: { bots } }) => state
      .mergeIn(['entities'], keyBy(bots, '_id'))
      .set('list', fromJS({
        loading: false,
        ids: map(bots, '_id'),
        timeFetched: Date.now()
      }))
      .set('loading', false),
    [apiConstants.API_BOT_FETCH]: (state, { payload: { bot } }) => state
      .mergeIn(['entities'], keyBy([bot], '_id'))
      .set('current', fromJS({
        loading: false,
        id: bot._id,
        timeFetched: Date.now()
      }))
      .set('loading', false)
  })
}, initialState);


export const saga = function *authSaga() {
  // Do nothing
};

export default {
  constants: null,
  actions,
  selectors,
  initialState,
  reducer,
  saga
};
