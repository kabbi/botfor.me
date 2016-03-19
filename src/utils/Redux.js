export const action = (type, payload) => ({
  type, payload
});

export const constants = list => (
  Object.keys(list).reduce((obj, key) => {
    obj[key] = key;
    return obj;
  }, {})
);
