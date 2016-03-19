export default class AsyncComponent extends React.Component {
  componentWillUnmount() {
    this.unmounted = true;
  }

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

    return promise.then(result => {
      if (this.unmounted) {
        return result;
      }
      this.setState({
        [path]: {
          result
        }
      });
      return result;
    }, error => {
      if (this.unmounted) {
        return error;
      }
      this.setState({
        [path]: {
          error
        }
      });
      return error;
    });
  }
}
