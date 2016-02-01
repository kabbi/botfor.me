import { Input } from 'react-bootstrap';

import ValidatedControl from './ValidatedControl';
import { FormControl as formControl } from './Form';

export let ValidatedInput = (props) => {
  const { validators, state, onChange, ...inputProps } = props;
  return (
    <ValidatedControl validators={validators} state={state} onChange={onChange}>
      <Input {...inputProps} bsStyle={state.error ? 'danger' : undefined} hasFeedback/>
    </ValidatedControl>
  );
};

ValidatedInput.propTypes = {
  state: React.PropTypes.object,
  onChange: React.PropTypes.func,
  validators: React.PropTypes.object
};

ValidatedInput = formControl(ValidatedInput);

export default ValidatedInput;
