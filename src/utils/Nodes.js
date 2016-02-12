export const EXPANDED_HEIGHT = 60;
export const DEFAULT_HEIGHT = 20;
export const DEFAULT_WIDTH = 100;

export const nodes = {
  'timer@1.0.0': {
    inputs: [],
    outputs: ['data']
  },
  'json-stringify@1.0.0': {
    inputs: ['objects'],
    outputs: ['data']
  },
  'stdio@1.0.0': {
    inputs: ['stdout', 'stderr'],
    outputs: []
  }
};

export const getLinkOffset = (index, count) => {
  const step = (EXPANDED_HEIGHT - DEFAULT_HEIGHT) / count;
  return index * step + step / 2;
};
