import Immutable from 'immutable';

import BotLink from 'components/svg/BotLink';
import BotNode from 'components/svg/BotNode';

import { MINIMAL_HEIGHT } from 'utils/Nodes';
import { randomConnectionId } from 'utils/Random';

export const MAX_SIZE = {
  width: 1000,
  height: 1000
};

export const GRID_STEP = 10;

/* eslint-disable react/jsx-no-bind */
export default class BotCanvas extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  };

  state = {
    dragging: {},
    connecting: {}
  };

  getRelativeCoords(event) {
    const { left, top } = this.refs.canvas.getBoundingClientRect();
    return {
      x: event.clientX - left,
      y: event.clientY - top
    };
  }

  getConnectorCoords(node, id, type) {
    const coords = {
      x: node.getIn(['disp', 'x']),
      y: node.getIn(['disp', 'y']) + MINIMAL_HEIGHT / 2
    };
    if (type === 'output') {
      coords.x += node.getIn(['disp', 'width']);
    }
    if (node.getIn(['disp', 'expanded'])) {
      coords.y += node.getIn(['disp', `${type}Offsets`, id], 0) + MINIMAL_HEIGHT / 2;
    }
    return coords;
  }

  handleDragStart(node, index, event) {
    const { x, y } = this.getRelativeCoords(event);

    event.preventDefault();
    this.setState({
      dragging: {
        index,
        dragging: true,
        relativeX: x - node.getIn(['disp', 'x']),
        relativeY: y - node.getIn(['disp', 'y'])
      }
    });
  }

  handleMouseMove(event) {
    const { connecting } = this.state.connecting;
    const { dragging, index, relativeX, relativeY } = this.state.dragging;

    const { x, y } = this.getRelativeCoords(event);
    const { data } = this.props;

    if (connecting) {
      event.preventDefault();
      this.setState({
        connecting: {
          ...this.state.connecting,
          toCoords: { x, y }
        }
      });
    }

    if (dragging) {
      event.preventDefault();
      this.props.onUpdate(data.withMutations(upd => {
        upd.setIn(['nodes', index, 'disp', 'x'], x - relativeX);
        upd.setIn(['nodes', index, 'disp', 'y'], y - relativeY);
      }));
    }
  }

  handleMouseUp() {
    this.setState({
      dragging: {},
      connecting: {}
    });
  }

  handleStartConnecting(fromNode, from) {
    const coords = this.getConnectorCoords(fromNode, from[1], 'output');
    this.setState({
      connecting: {
        fromNode, from,
        id: randomConnectionId(),
        connecting: true,
        fromCoords: coords,
        toCoords: coords
      }
    });
  }

  handleFinishConnecting(toNode, to) {
    const { connecting, id, from } = this.state.connecting;
    if (!connecting) {
      return;
    }

    this.props.onUpdate(this.props.data.update('links', links => (
      links.push(Immutable.fromJS({ id, from, to }))
    )));
    this.setState({
      connecting: {}
    });
  }

  handleToggleNodeExpanded(index) {
    this.props.onUpdate(this.props.data.updateIn(
      ['nodes', index, 'disp', 'expanded'],
      flag => !flag
    ));
  }

  handleUpdateNodeDimensions(index, dimensions) {
    this.props.onUpdate(data => (
      data.mergeIn(['nodes', index, 'disp'], dimensions)
    ));
  }

  render() {
    const { connecting } = this.state;
    const { data, ...rest } = this.props;
    const nodeMap = data.get('nodes').reduce((result, node) => (
      result.set(node.get('id'), node)
    ), new Immutable.Map());

    const canvasSize = this.refs.canvas ? this.refs.canvas.getBoundingClientRect() : MAX_SIZE;

    return (
      <svg {...rest}
        ref="canvas"
        onMouseMove={::this.handleMouseMove}
        onMouseUp={::this.handleMouseUp}
      >
        {new Immutable.Range(0, canvasSize.width, GRID_STEP).map(x => (
          <line key={x}
            x1={x} y1={0}
            x2={x} y2={canvasSize.height}
            className="bfm-canvas-gridline"
          />
        ))}
        {new Immutable.Range(0, canvasSize.height, GRID_STEP).map(y => (
          <line key={y}
            x1={0} y1={y}
            x2={canvasSize.width} y2={y}
            className="bfm-canvas-gridline"
          />
        ))}
        {data.get('links').map(link => {
          const fromNode = nodeMap.get(link.getIn(['from', 0]));
          const toNode = nodeMap.get(link.getIn(['to', 0]));
          const from = this.getConnectorCoords(fromNode, link.getIn(['from', 1]), 'output');
          const to = this.getConnectorCoords(toNode, link.getIn(['to', 1]), 'input');
          return <BotLink key={link.get('id')} from={from} to={to}/>;
        })}
        {connecting.fromNode && (
          <BotLink from={connecting.fromCoords} to={connecting.toCoords}/>
        )}
        {data.get('nodes').map((node, index) => (
          <BotNode key={node.get('id')} id={node.get('id')}
            type={node.get('type')}
            width={node.getIn(['disp', 'width'])}
            height={node.getIn(['disp', 'height'])}
            expanded={node.getIn(['disp', 'expanded'])}
            transform={`translate(${node.getIn(['disp', 'x'])} ${node.getIn(['disp', 'y'])})`}
            onStartConnecting={this.handleStartConnecting.bind(this, node)}
            onFinishConnecting={this.handleFinishConnecting.bind(this, node)}
            onToggleExpand={this.handleToggleNodeExpanded.bind(this, index)}
            onUpdateDimensions={this.handleUpdateNodeDimensions.bind(this, index)}
            onMouseDown={this.handleDragStart.bind(this, node, index)}
          />
        ))}
      </svg>
    );
  }
}
