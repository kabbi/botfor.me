export const on = (emitter, event, handler) => {
  emitter.on(event, handler);
  return {
    destroy() {
      emitter.off(event, handler);
    }
  };
};
