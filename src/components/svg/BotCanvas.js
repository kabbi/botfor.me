import Immutable from 'immutable';

import BotLink from 'components/svg/BotLink';
import BotNode from 'components/svg/BotNode';

export default class BotCanvas extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  };

  state = {
    dragging: {}
  };

  getRelativeCoords(event) {
    const { left, top } = this.refs.canvas.getBoundingClientRect();
    return {
      x: event.pageX - left,
      y: event.pageY - top
    };
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

  handleDragMove(event) {
    const { dragging, index, relativeX, relativeY } = this.state.dragging;
    if (!dragging) {
      return;
    }

    const { x, y } = this.getRelativeCoords(event);
    const { data } = this.props;

    event.preventDefault();
    this.props.onUpdate(data.withMutations(data => {
      data.setIn(['nodes', index, 'disp', 'x'], x - relativeX);
      data.setIn(['nodes', index, 'disp', 'y'], y - relativeY);
    }));
  }

  handleDragFinish() {
    this.setState({
      dragging: {}
    });
  }

  handleToggleNodeExpanded(index) {
    this.props.onUpdate(this.props.data.updateIn(
      ['nodes', index, 'disp', 'expanded'],
      flag => !flag
    ));
  }

  handleUpdateNodeWidth(index, width) {
    this.props.onUpdate(data => (
      data.setIn(['nodes', index, 'disp', 'width'], width)
    ));
  }

  render() {
    const { data, ...rest } = this.props;
    const nodeMap = data.get('nodes').reduce((result, node) => (
      result.set(node.get('id'), node)
    ), Immutable.Map());
    return (
      <svg {...rest}
        ref="canvas"
        onMouseMove={::this.handleDragMove}
        onMouseUp={::this.handleDragFinish}
      >
        {data.get('links').map((link, index) => (
          <BotLink key={link.get('id')}
            fromNode={nodeMap.get(link.getIn(['from', 0]))}
            toNode={nodeMap.get(link.getIn(['to', 0]))}
            from={link.get('from')}
            to={link.get('to')}
          />
        ))}
        {data.get('nodes').map((node, index) => (
          <BotNode key={node.get('id')}
            transform={`translate(${node.getIn(['disp', 'x'])} ${node.getIn(['disp', 'y'])})`}
            onToggleExpand={this.handleToggleNodeExpanded.bind(this, index)}
            onUpdateWidth={this.handleUpdateNodeWidth.bind(this, index)}
            onMouseDown={this.handleDragStart.bind(this, node, index)}
            expanded={node.getIn(['disp', 'expanded'])}
            type={node.get('type')}
          />
        ))}
      </svg>
    );
  }
};
