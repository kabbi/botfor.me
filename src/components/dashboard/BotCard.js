import { Button } from 'react-bootstrap';

const BotCard = ({ name, template, onCreate, onStart, onEdit }) => (
  <Col md={4}>
    <div className="thumbnail">
      <h4 className="text-center">
        {name}
      </h4>
      <img src="https://placehold.it/300x200" title="Bot preview here"/>
      <div className="caption">
        {template ? (
          <Button onClick={onCreate} bsStyle="primary" block>
            Create New
          </Button>
        ) : (
          <span>
            <Button bsStyle="info" className="bfm-half-width">Start</Button>
            <Button onClick={onEdit} bsStyle="primary" className="bfm-half-width">
              Edit
            </Button>
          </span>
        )}
      </div>
    </div>
  </Col>
);

BotCard.propTypes = {
  name: React.PropTypes.string,
  template: React.PropTypes.bool,
  onCreate: React.PropTypes.func
};

export default BotCard;
