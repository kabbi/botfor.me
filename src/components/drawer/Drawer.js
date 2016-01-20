import { ButtonGroup, Button, Panel, Glyphicon } from 'react-bootstrap';

import NodesList from './NodesList';

const Drawer = () => (
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
    <NodesList/>
  </Panel>
);

export default Drawer;
