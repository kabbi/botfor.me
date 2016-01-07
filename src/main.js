import { createHistory, useBasename } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';
import routes from './routes';
import Root from './containers/Root';
import configureStore from './redux/configureStore';

import MaintainingView from 'views/MaintainingView';
console.log('__MAINTAINING_MODE__', __MAINTAINING_MODE__);
if (__MAINTAINING_MODE__) {
  ReactDOM.render(
    <MaintainingView />,
    document.getElementById('root')
  );
} else {
  const history = useBasename(createHistory)({
    basename: __BASENAME__
  });
  const store = configureStore(window.__INITIAL_STATE__);

  syncReduxAndRouter(history, store, (state) => state.router);

  // Render the React application to the DOM
  ReactDOM.render(
    <Root history={history} routes={routes} store={store} />,
    document.getElementById('root')
  );
}

