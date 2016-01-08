export const index = function*(next) {
  this.status = 200;
  this.body = {
    text: 'Hello world!'
  };
};
