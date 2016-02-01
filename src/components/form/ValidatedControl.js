import { FormControl } from './Form';

@FormControl
export default class ValidatedControl extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    validators: React.PropTypes.object,
    state: React.PropTypes.shape({
      touched: React.PropTypes.bool,
      value: React.PropTypes.any,
      validators: React.PropTypes.object,
      error: React.PropTypes.bool
    }).isRequired,
    onChange: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    validators: {}
  };

  runValidators(state = {...this.props.state}) {
    for (const key of Object.keys(this.props.validators)) {
      const validation = this.props.validators[key](state.value);
      state.error = state.error || validation.error;
      state.validators[key] = validation;
    }
    return state;
  }

  handleChange(event) {
    const newState = {
      ...this.props.state,
      value: event.target.value
    };
    this.runValidators(newState);
    this.props.onChange(newState);
  }

  componentDidMount() {
    this.props.onChange(this.runValidators());
  }

  render() {
    return React.cloneElement(this.props.children, {
      ...this.props.children.props,
      value: this.props.state.value,
      onChange: ::this.handleChange
    });
  }
}
