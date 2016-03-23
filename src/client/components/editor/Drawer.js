import { ButtonGroup, Button, Panel, Glyphicon } from 'react-bootstrap';

import NodeList from './NodeList';

const NodeDrawer = ({ onAddNode }) => (
  <Panel>
    <p className="lead drawer-title">Nodes</p>
    <ButtonGroup>
      <Button bsSize="small" bsStyle="info" title="List" active>
        <Glyphicon glyph="list"/>
      </Button>
      <Button bsSize="small" bsStyle="info" title="Favorites">
        <Glyphicon glyph="star"/>
      </Button>
      <Button bsSize="small" bsStyle="info" title="History">
        <Glyphicon glyph="folder-open"/>
      </Button>
    </ButtonGroup>
    <NodeList onAddNode={onAddNode}/>
  </Panel>
);

NodeDrawer.propTypes = {
  onAddNode: React.PropTypes.func
};

export default NodeDrawer;
