import d3 from 'd3';

import { nodes, DEFAULT_WIDTH, DEFAULT_HEIGHT, getLinkOffset } from 'utils/Nodes';

const lineGenerator = d3.svg.line().interpolate('basis');

export const BotLink = ({ fromNode, toNode, from, to }) => {
  const getYOffset = (node, link, type) => {
    if (!node.getIn(['disp', 'expanded'])) {
      return DEFAULT_HEIGHT / 2;
    }
    const links = nodes[node.get('type')][`${type}s`];
    return DEFAULT_HEIGHT + getLinkOffset(links.indexOf(link.get(1)), links.length);
  };

  const x1 = fromNode.getIn(['disp', 'x']) + fromNode.getIn(['disp', 'width'], DEFAULT_WIDTH);
  const y1 = fromNode.getIn(['disp', 'y']) + getYOffset(fromNode, from, 'output');
  const x2 = toNode.getIn(['disp', 'x']);
  const y2 = toNode.getIn(['disp', 'y']) + getYOffset(toNode, to, 'input');

  const path = lineGenerator([
    [x1, y1],
    [(x1 + x2) / 2, y1],
    [(x1 + x2) / 2, y2],
    [x2, y2]
  ]);

  return <path d={path} stroke="black" fill="none"/>;
};

BotLink.propTypes = {
  fromNode: React.PropTypes.object.isRequired,
  toNode: React.PropTypes.object.isRequired,
  from: React.PropTypes.object.isRequired,
  to: React.PropTypes.object.isRequired
};

BotLink.link = true;

export default BotLink;
