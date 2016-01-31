import { combineReducers } from 'redux';
import { routeReducer as router } from 'redux-simple-router';
import counter from './modules/counter';
import remote from './modules/remote';

export default combineReducers({
  remote,
  counter,
  router
});
