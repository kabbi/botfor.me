const { Component, PropTypes, Children } = React;

export const FORM_CONTROL_TOKEN = Symbol('FORM_CONTROL_TOKEN');

export const FormControl = (clazz) => {
  clazz[FORM_CONTROL_TOKEN] = true;
  return clazz;
};

export default class Form extends Component {
  static propTypes = {
    children: PropTypes.node,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    initialState: PropTypes.object,
    className: PropTypes.string,
    controlProps: PropTypes.object
  };

  static defaultProps = {
    initialState: {}
  };

  state = this.calculateInitialState();

  hasErrors() {
    return Object.keys(this.state).reduce((error, key) => (
      this.state[key].error || error
    ), false);
  }

  extractValuesAndSubmit() {
    const form = Object.keys(this.state).reduce((values, key) => {
      values[key] = this.state[key].value;
      return values;
    }, {});
    this.props.onSubmit(form);
  }

  calculateInitialState(children = this.props.children, state = {}) {
    const { initialState } = this.props;
    Children.forEach(children, child => {
      if (child.type && child.type[FORM_CONTROL_TOKEN]) {
        const { model } = child.props;
        state[model] = initialState[model] || { dirty: false };
      }
      if (child.props && child.props.children) {
        this.calculateInitialState(child.props.children, state);
      }
    });
    return state;
  }

  extendAllSupportedChildren(children = this.props.children) {
    return Children.map(children, (child, index) => {
      if (child.type && child.type[FORM_CONTROL_TOKEN]) {
        const { model } = child.props;
        return React.cloneElement(child, {
          ...this.props.controlProps,
          onChange: this.handleChildChange.bind(this, model),
          state: this.state[model],
          formState: this.state,
          key: index
        });
      }
      if (child.props && child.props.children) {
        return React.cloneElement(child, child.props,
          this.extendAllSupportedChildren(child.props.children));
      }
      return child;
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.hasErrors()) {
      return;
    }
    this.extractValuesAndSubmit();
  }

  handleChildChange(model, childState) {
    this.setState({
      [model]: childState
    });
    if (this.props.onChange) {
      this.props.onChange(model, childState);
    }
  }

  render() {
    return (
      <form action="#" onSubmit={::this.handleSubmit} className={this.props.className} noValidate>
        {this.extendAllSupportedChildren()}
      </form>
    );
  }
}
