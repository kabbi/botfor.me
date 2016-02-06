import { Input, Button } from 'react-bootstrap';

const NodesList = () => (
  <div>
    <br/>
    <Input type="text" placeholder="Search node"/>
    <Button bsStyle="primary" bsSize="small" block>Http</Button>
    <Button bsSize="small" block>Socket.io</Button>
  </div>
);

export default NodesList;
