import { syncHistoryWithStore } from 'react-router-redux';

import routes from './routes';
import history from './routes/history';
import Root from './containers/Root';
import configureStore from './redux/configureStore';
import { selectors as routerSelectors } from 'redux/modules/router';

import MaintainingView from 'views/MaintainingView';

if (__DEV__) {
  const immutable = require('immutable');
  const installDevTools = require('immutable-devtools');
  installDevTools(immutable);
}

if (__MAINTAINING_MODE__) {
  ReactDOM.render(
    <MaintainingView/>,
    document.getElementById('root')
  );
} else {
  const store = configureStore(window.__INITIAL_STATE__);

  const syncedHistory = syncHistoryWithStore(history, store, {
    selectLocationState: routerSelectors.getState
  });

  // Render the React application to the DOM
  ReactDOM.render(
    <Root history={syncedHistory} routes={routes} store={store}/>,
    document.getElementById('root')
  );
}
