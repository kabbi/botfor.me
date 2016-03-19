/* eslint-disable react/no-multi-comp */

import { Well } from 'react-bootstrap';
import { connect } from 'react-redux';
import d3 from 'd3';

const DraggableRect = (props) => {
  const { children, ...rest } = props;
  return <rect {...rest}>{children}</rect>;
};
DraggableRect.propTypes = {
  children: React.PropTypes.node
};
DraggableRect.draggable = true;

const Connection = ({ data }) => (
  <path d={data} stroke="black" fill="none"/>
);
Connection.propTypes = {
  data: React.PropTypes.string
};
Connection.connection = true;

class SvgCanvas extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  };

  state = {
    status: {},
    children: this.getInitialChildrenState()
  };

  componentWillMount() {
    this.lineGenerator = d3.svg.line().interpolate('basis');
  }

  componentWillReceiveProps(nextProps) {
    const { children } = this.state;
    React.Children.forEach(nextProps.children, ({ props: { id, x, y } }) => {
      children[id] = children[id] || {
        x: x || 0,
        y: y || 0
      };
    });
    this.setState({
      children
    });
  }

  getInitialChildrenState() {
    const state = {};
    React.Children.forEach(this.props.children, child => {
      state[child.props.id] = {
        x: child.props.x || 0,
        y: child.props.y || 0
      };
    });
    return state;
  }

  getRelativeCoords(event) {
    const { left, top } = this.refs.canvas.getBoundingClientRect();
    return {
      x: event.pageX - left,
      y: event.pageY - top
    };
  }

  handleDragStart(child, event) {
    if (!child.type.draggable) {
      return;
    }

    const childState = this.state.children[child.props.id];
    const { x, y } = this.getRelativeCoords(event);

    event.preventDefault();
    this.setState({
      status: {
        child,
        dragging: true,
        relativeX: x - childState.x,
        relativeY: y - childState.y
      }
    });
  }

  handleDragMove(event) {
    const { dragging, child, relativeX, relativeY } = this.state.status;
    if (!dragging) {
      return;
    }

    const { x, y } = this.getRelativeCoords(event);

    event.preventDefault();
    this.setState({
      children: {
        ...this.state.children,
        [child.props.id]: {
          x: x - relativeX,
          y: y - relativeY
        }
      }
    });
  }

  handleDragFinish() {
    this.setState({
      status: {}
    });
  }

  render() {
    const { children, ...rest } = this.props;
    return (
      <svg {...rest}
        ref="canvas"
        onMouseMove={::this.handleDragMove}
        onMouseUp={::this.handleDragFinish}
      >
        {React.Children.map(children, child => {
          if (child.type.connection) {
            const { from, to } = child.props;
            const fromChild = this.state.children[from];
            const toChild = this.state.children[to];

            const x1 = fromChild.x + 100;
            const y1 = fromChild.y + 10;
            const x2 = toChild.x;
            const y2 = toChild.y + 10;

            return React.cloneElement(child, {
              data: this.lineGenerator([
                [x1, y1],
                [(x1 + x2) / 2, y1],
                [(x1 + x2) / 2, y2],
                [x2, y2]
              ])
            });
          }
          if (child.type.draggable) {
            return React.cloneElement(child, {
              ...child.props,
              onMouseDown: this.handleDragStart.bind(this, child),
              x: this.state.children[child.props.id].x,
              y: this.state.children[child.props.id].y
            });
          }
          return child;
        })}
      </svg>
    );
  }
}

const mapStateToProps = () => ({});
export default class SvgDevcard extends React.Component {
  static dcHeader = 'Svg Experiments';

  static dcDescription = 'Collective demo of svg drawing';

  state = {
    nodes: [{
      id: '1'
    }, {
      id: '2'
    }, {
      id: '3'
    }],
    connections: [{
      id: 'x1',
      from: '1',
      to: '2'
    }],
    connectFrom: null
  };

  handleAdd() {
    this.setState({
      nodes: [...this.state.nodes, {
        id: Math.random().toString()
      }]
    });
  }

  handleRemove(index) {
    const nodes = this.state.nodes.slice();
    nodes.splice(index, 1);
    this.setState({
      nodes
    });
  }

  handleConnect(index, event) {
    if (event.button !== 2) {
      return;
    }

    event.preventDefault();
    const { nodes, connections, connectFrom } = this.state;
    if (!connectFrom) {
      this.setState({
        connectFrom: index
      });
      return;
    }
    this.setState({
      connections: [...connections, {
        id: Math.random().toString(),
        from: nodes[connectFrom].id,
        to: nodes[index].id
      }],
      connectFrom: null
    });
  }

  render() {
    const { nodes, connections } = this.state;
    return (
      <div>
        <h1>Svg Experiments</h1>
        <p>
          You can place any svg drawing logic or experiments here.
        </p>
        <Well>
          <SvgCanvas width="100%" height={300} onDoubleClick={::this.handleAdd}>
            {nodes.map((node, index) => (
              <DraggableRect key={node.id}
                onMouseUp={this.handleConnect.bind(this, index)}
                onContextMenu={e => e.preventDefault()}
                onDoubleClick={this.handleRemove.bind(this, index)}
                id={node.id}
                width={100}
                height={20}
                rx={5}
              />
            ))}
            {connections.map(conn => (
              <Connection key={conn.id} from={conn.from} to={conn.to}/>
            ))}
          </SvgCanvas>
        </Well>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(SvgDevcard);
