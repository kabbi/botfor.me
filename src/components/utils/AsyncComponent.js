export default class AsyncComponent extends React.Component {
  getStatus(path) {
    return this.state[path];
  }

  resetStatus(path) {
    this.setState({
      [path]: {}
    });
  }

  handlePromise(path, promise) {
    this.setState({
      [path]: {
        pending: true
      }
    });

    promise.then(result => {
      if (this.unmounted) {
        return result;
      }
      this.setState({
        [path]: {
          result
        }
      });
    }, error => {
      if (this.unmounted) {
        return error;
      }
      this.setState({
        [path]: {
          error
        }
      });
    });
  }

  componentWillUnmount() {
    this.unmounted = true;
  }
};
