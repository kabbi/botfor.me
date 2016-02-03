import { combineReducers } from 'redux';
import { routeReducer as router } from 'redux-simple-router';
import counter from './modules/counter';
import remote from './modules/remote';
import auth from './modules/auth';

export default combineReducers({
  remote,
  counter,
  auth,
  router
});
