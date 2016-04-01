import { Button, Panel } from 'react-bootstrap';

export const BotStatusPanel = ({ status, started, onToggleStarted }) => (
  <Panel>
    <p className="lead drawer-title">Bot Status</p>
    <code>{status || 'loading'}</code>
    <Button bsStyle="link" onClick={onToggleStarted}>
      {started ? 'Stop' : 'Start'}
    </Button>
  </Panel>
);

BotStatusPanel.propTypes = {
  started: React.PropTypes.bool,
  status: React.PropTypes.string,
  onToggleStarted: React.PropTypes.func
};

export default BotStatusPanel;
