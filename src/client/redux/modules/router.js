import { LOCATION_CHANGE } from 'react-router-redux';
import { handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';

export const path = 'router';

export const selectors = {
  getState: state => state.get(path).toJS()
};

export const initialState = fromJS({
  locationBeforeTransitions: null
});

export const reducer = handleActions({
  [LOCATION_CHANGE]: (state, { payload }) => state
    .update('locationBeforeTransitions', d => (d || new Map()).merge(payload))
}, initialState);

export default {
  path,
  selectors,
  initialState,
  reducer
};
