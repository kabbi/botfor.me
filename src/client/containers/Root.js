import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

export default class Root extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired,
    store: PropTypes.object.isRequired,
  };

  renderContent() {
    return (
      <Router history={this.props.history}>
        {this.props.routes}
      </Router>
    );
  }

  renderDevTools() {
    if (__DEBUG__) {
      const DevTools = require('containers/DevTools').default;
      return <DevTools/>;
    }
    return null;
  }

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          {this.renderContent()}
          {this.renderDevTools()}
        </div>
      </Provider>
    );
  }
}
