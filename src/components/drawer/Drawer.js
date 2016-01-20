import { ButtonGroup, Button, Panel, Glyphicon } from 'react-bootstrap';

const Drawer = () => (
  <Panel>
    <p className="lead drawer-title">Nodes</p>
    <ButtonGroup>
      <Button bsSize="small" bsStyle="info" title="List">
        <Glyphicon glyph="list"/>
      </Button>
      <Button bsSize="small" bsStyle="info" title="Favorites">
        <Glyphicon glyph="star"/>
      </Button>
      <Button bsSize="small" bsStyle="info" title="History">
        <Glyphicon glyph="folder-open"/>
      </Button>
    </ButtonGroup>
  </Panel>
);

export default Drawer;
