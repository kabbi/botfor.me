import { syncReduxAndRouter } from 'redux-simple-router';
import routes from './routes';
import history from './routes/history';
import Root from './containers/Root';
import configureStore from './redux/configureStore';

import MaintainingView from 'views/MaintainingView';

if (__MAINTAINING_MODE__) {
  ReactDOM.render(
    <MaintainingView/>,
    document.getElementById('root')
  );
} else {
  const store = configureStore(window.__INITIAL_STATE__);

  syncReduxAndRouter(history, store, (state) => state.router);

  // Render the React application to the DOM
  ReactDOM.render(
    <Root history={history} routes={routes} store={store}/>,
    document.getElementById('root')
  );
}
