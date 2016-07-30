import { Component } from 'react';

/* eslint-disable react/sort-comp */

export default class AsyncComponent extends Component {
  componentWillMount() {
    const immutableData = this.state;
    // Replace the initial state for react
    super.setState({ immutableData });
  }

  getState() {
    return this.state.immutableData;
  }

  setState(updater, callback) {
    super.setState(({ immutableData }) => ({
      immutableData: updater(immutableData)
    }), callback);
  }
}
