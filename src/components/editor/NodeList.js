import { Input, Button } from 'react-bootstrap';

import { NODE_TYPES } from 'utils/Nodes';

const NodeList = ({ onAddNode }) => (
  <div>
    <br/>
    <Input type="text" placeholder="Search node"/>
    <div>
      {Object.keys(NODE_TYPES).sort().map(type => {
        const node = NODE_TYPES[type];
        return (
          <Button key={type} onClick={onAddNode.bind(null, type)} bsSize="small" block>
            {node.label}
          </Button>
        );
      })}
    </div>
  </div>
);

NodeList.propTypes = {
  onAddNode: React.PropTypes.func
};

export default NodeList;
