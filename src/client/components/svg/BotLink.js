import d3 from 'd3';

const lineGenerator = d3.svg.line().interpolate('basis');

export const BotLink = ({ from, to }) => {
  const path = lineGenerator([
    [from.x, from.y],
    [(from.x + to.x) / 2, from.y],
    [(from.x + to.x) / 2, to.y],
    [to.x, to.y]
  ]);

  return <path d={path} stroke="black" fill="none"/>;
};

BotLink.propTypes = {
  from: React.PropTypes.shape({
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
  }).isRequired,
  to: React.PropTypes.shape({
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
  }).isRequired
};

BotLink.link = true;

export default BotLink;
