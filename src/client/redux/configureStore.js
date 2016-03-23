import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import { rootReducer, rootSaga } from './modules';

export default function configureStore(initialState) {
  let createStoreWithMiddleware;
  const middleware = applyMiddleware(
    createSagaMiddleware(rootSaga),
    thunk
  );

  if (__DEBUG__) {
    createStoreWithMiddleware = compose(
      middleware,
      window.devToolsExtension
        ? window.devToolsExtension({
          name: `bot for you (${process.env.NODE_ENV} env)`
        })
        : require('containers/DevTools').default.instrument()
    );
  } else {
    createStoreWithMiddleware = compose(middleware);
  }

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  );

  if (module.hot) {
    // TODO: Hot-reload sagas? Is it even possible?
    module.hot.accept('./modules', () => {
      const nextRootReducer = require('./modules').rootReducer;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
