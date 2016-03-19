import {
  NODE_TYPES,
  DEFAULT_WIDTH,
  MINIMAL_HEIGHT,
  CONNECTOR_LABEL_OFFSET
} from 'utils/Nodes';

export default class BotNode extends React.Component {
  static draggable = true;

  static propTypes = {
    id: React.PropTypes.string,
    type: React.PropTypes.string,
    expanded: React.PropTypes.bool,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    selected: React.PropTypes.bool,
    onToggleExpand: React.PropTypes.func,
    onUpdateDimensions: React.PropTypes.func,
    onStartConnecting: React.PropTypes.func,
    onFinishConnecting: React.PropTypes.func
  };

  componentDidMount() {
    const { inputOffsets, outputOffsets, expandedHeight: height } = NODE_TYPES[this.props.type];
    const width = Math.max(DEFAULT_WIDTH, this.refs.label.getBBox().width + 30);

    this.props.onUpdateDimensions({ width, height, inputOffsets, outputOffsets });
  }

  handleToggleExpand(event) {
    event.stopPropagation();
    this.props.onToggleExpand();
  }

  handleStartConnecting(id, event) {
    this.handleCancelEvent(event);
    this.props.onStartConnecting([
      this.props.id, id
    ]);
  }

  handleFinishConnecting(id) {
    // this.handleCancelEvent(event);
    this.props.onFinishConnecting([
      this.props.id, id
    ]);
  }

  handleCancelEvent(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  render() {
    const { type, expanded, width, height: expandedHeight } = this.props;
    const { inputs, outputs, inputOffsets, outputOffsets } = NODE_TYPES[type];
    const height = expanded ? expandedHeight : MINIMAL_HEIGHT;
    return (
      <g {...this.props} className="bfm-node-node">
        <rect width={width} height={height} rx={5} className="bfm-node-outline"/>
        <rect x={7} y={5} width={10} height={8} onClick={::this.handleToggleExpand} fill="white"/>

        <path className="bfm-node-arrow"
          onClick={::this.handleToggleExpand}
          d={expanded ? 'M7,5 L17,5 L12,13 Z' : 'M7,5 L15,10 L7,15 Z'}
        />

        <text x={20} y={15} fontSize={12} className="bfm-node-label" ref="label">
          {this.props.type}
        </text>

        {expanded && (
          <g transform="translate(0 20)">
            <line x1={0} y1={0} x2={width} y2={0} className="bfm-node-separator"/>
            {inputs.map(id => (
              <g key={id}>
                <circle
                  cx={0} r={4} className="bfm-node-connector"
                  cy={inputOffsets[id]}
                  onMouseUp={this.handleFinishConnecting.bind(this, id)}
                />
                <text x={5} y={inputOffsets[id] + CONNECTOR_LABEL_OFFSET}
                  textAnchor="start"
                  fontSize={10}
                >
                  {id}
                </text>
              </g>
            ))}
            {outputs.map(id => (
              <g key={id}>
                <circle
                  cx={width} cy={outputOffsets[id]} r={4} className="bfm-node-connector"
                  onMouseDown={this.handleStartConnecting.bind(this, id)}
                />
                <text x={width - 5} y={outputOffsets[id] + CONNECTOR_LABEL_OFFSET}
                  textAnchor="end"
                  fontSize={10}
                >
                  {id}
                </text>
              </g>
            ))}
          </g>
        )}
      </g>
    );
  }
}
