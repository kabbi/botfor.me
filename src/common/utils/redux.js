'use strict';

exports.createConstants = (constants) => (
  constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {})
);

exports.createReducer = (initialState, reducerMap) => (state, action) => {
  const reducer = reducerMap[action.type];
  const currentState = state || initialState;
  return reducer ? reducer(currentState, action) : currentState;
};
