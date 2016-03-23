import { Input } from 'react-bootstrap';

import ValidatedControl from './ValidatedControl';
import { FormControl as formControl } from './Form';

export let ValidatedInput = (props) => {
  const { validators, state, onChange, errors, model, ...inputProps } = props;
  const error = state.error || errors[model];
  return (
    <ValidatedControl validators={validators} state={state} onChange={onChange}>
      <Input {...inputProps} bsStyle={error ? 'error' : undefined} hasFeedback/>
    </ValidatedControl>
  );
};

ValidatedInput.propTypes = {
  model: React.PropTypes.string,
  state: React.PropTypes.object,
  errors: React.PropTypes.any,
  validators: React.PropTypes.object,
  onChange: React.PropTypes.func
};

ValidatedInput.defaultProps = {
  errors: {}
};

ValidatedInput = formControl(ValidatedInput);

export default ValidatedInput;
