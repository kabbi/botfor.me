export const EXPANDED_HEIGHT = 60;
export const MINIMAL_HEIGHT = 20;
export const DEFAULT_WIDTH = 100;

export const FIRST_CONNECTOR_OFFSET = 10;
export const CONNECTOR_SPACING = 20;

export const CONNECTOR_LABEL_OFFSET = 3;

export const NODE_TYPES = {
  'timer@1.0.0': {
    label: 'Timer',
    inputs: [],
    outputs: ['data'],
    inputOffsets: {},
    outputOffsets: {
      data: FIRST_CONNECTOR_OFFSET
    }
  },
  'json-stringify@1.0.0': {
    label: 'JSON stringify',
    inputs: ['objects'],
    outputs: ['data'],
    inputOffsets: {
      objects: FIRST_CONNECTOR_OFFSET
    },
    outputOffsets: {
      data: FIRST_CONNECTOR_OFFSET
    }
  },
  'stdio@1.0.0': {
    label: 'Std I/O',
    inputs: ['stdout', 'stderr'],
    outputs: [],
    inputOffsets: {
      stdout: FIRST_CONNECTOR_OFFSET,
      stderr: FIRST_CONNECTOR_OFFSET + CONNECTOR_SPACING
    },
    outputOffsets: {}
  },
  'https-request@1.0.0': {
    label: 'Https Request',
    inputs: ['request'],
    outputs: ['response'],
    inputOffsets: {
      request: FIRST_CONNECTOR_OFFSET
    },
    outputOffsets: {
      response: FIRST_CONNECTOR_OFFSET
    }
  },
  'http-server@1.0.0': {
    label: 'Http Server',
    inputs: [],
    outputs: ['request'],
    inputOffsets: {},
    outputOffsets: {
      request: FIRST_CONNECTOR_OFFSET
    }
  },
  'javascript@1.0.0': {
    label: 'Custom JS Node',
    inputs: ['data'],
    outputs: ['data'],
    inputOffsets: {
      data: FIRST_CONNECTOR_OFFSET
    },
    outputOffsets: {
      data: FIRST_CONNECTOR_OFFSET
    }
  },
  'simple-storage@1.0.0': {
    label: 'Simple Storage',
    inputs: ['control'],
    outputs: ['value'],
    inputOffsets: {
      control: FIRST_CONNECTOR_OFFSET
    },
    outputOffsets: {
      value: FIRST_CONNECTOR_OFFSET
    }
  }
};
