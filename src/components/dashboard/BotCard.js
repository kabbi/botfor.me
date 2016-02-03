import { Button } from 'react-bootstrap';

const BotCard = ({ template, onCreate }) => (
  <Col md={4}>
    <div className="thumbnail">
      <img src="https://placehold.it/300x200" title="Bot preview here"/>
      <div className="caption">
        {template ? (
          <Button onClick={onCreate} bsStyle="primary" block>
            Create New
          </Button>
        ) : (
          <span>
            <Button bsStyle="info" className="bfm-half-width">Start</Button>
            <Button bsStyle="primary" className="bfm-half-width">Edit</Button>
          </span>
        )}
      </div>
    </div>
  </Col>
);

BotCard.propTypes = {
  template: React.PropTypes.bool,
  onCreate: React.PropTypes.func
};

export default BotCard;
