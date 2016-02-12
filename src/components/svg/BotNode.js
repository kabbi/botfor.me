import {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  EXPANDED_HEIGHT,
  getLinkOffset,
  nodes
} from 'utils/Nodes';

export default class BotNode extends React.Component {
  static draggable = true;

  static propTypes = {
    type: React.PropTypes.string,
    expanded: React.PropTypes.bool,
    onUpdateWidth: React.PropTypes.func,
    onToggleExpand: React.PropTypes.func,
    onStartConnecting: React.PropTypes.func
  };

  state = {
    width: DEFAULT_WIDTH
  };

  handleToggleExpand(event) {
    event.stopPropagation();
    this.props.onToggleExpand();
  }

  handleStartConnecting(event) {
    this.handleCancelEvent();
    this.props.onStartConnecting();
  }

  handleCancelEvent(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  componentDidMount() {
    const width = Math.max(DEFAULT_WIDTH, this.refs.label.getBBox().width + 30);
    this.props.onUpdateWidth(width);
    this.setState({ width });
  }

  render() {
    const { type, expanded } = this.props;
    const { width } = this.state;
    const nodeInfo = nodes[type];
    const height = expanded ? EXPANDED_HEIGHT : DEFAULT_HEIGHT;
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
            {nodeInfo.inputs.map((key, index) => (
              <g>
                <circle key={key}
                  cx={0} r={4} className="bfm-node-connector"
                  cy={getLinkOffset(index, nodeInfo.inputs.length)}
                  onMouseDown={::this.handleCancelEvent}
                />
                <text x={5} y={getLinkOffset(index, nodeInfo.inputs.length) + 3}
                  textAnchor="start"
                  fontSize={10}
                >
                  {key}
                </text>
              </g>
            ))}
            {nodeInfo.outputs.map((key, index) => (
              <g>
                <circle key={key}
                  cx={width} r={4} className="bfm-node-connector"
                  cy={getLinkOffset(index, nodeInfo.outputs.length)}
                  onMouseDown={this.handleStartConnecting.bind(this, key, 'output')}
                />
                <text x={width - 5} y={getLinkOffset(index, nodeInfo.outputs.length) + 3}
                  textAnchor="end"
                  fontSize={10}
                >
                  {key}
                </text>
              </g>
            ))}
          </g>
        )}
      </g>
    );
  }
};
