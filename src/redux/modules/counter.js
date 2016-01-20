import { createAction, handleActions } from 'redux-actions';

export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';

export const constants = {
  COUNTER_INCREMENT
};

export const increment = createAction(COUNTER_INCREMENT, (value = 1) => value);

export const doubleAsync = () => {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(increment(getState().counter));
    }, 1000);
  };
};

export const actions = {
  increment,
  doubleAsync
};

export default handleActions({
  [COUNTER_INCREMENT]: (state, { payload }) => state + payload
}, 1);
