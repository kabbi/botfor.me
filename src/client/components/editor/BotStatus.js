import { Button, Panel } from 'react-bootstrap';

import AsyncComponent from 'components/utils/AsyncComponent';
import api from 'utils/Api';

export default class BotStatus extends AsyncComponent {
  state = {
    status: {},
    update: {}
  };

  handleToggleStatus() {
    let update = null;
    const { botId } = this.props;
    if (this.state.status.result.data.started) {
      update = this.handlePromise('update', api.bot.stop(null, { botId }));
    } else {
      update = this.handlePromise('update', api.bot.start(null, { botId }));
    }
    update.then(() => {
      this.handlePromise('status', api.bot.status({ botId }));
    });
  }

  componentWillMount() {
    const { botId } = this.props;
    this.handlePromise('status', api.bot.status({ botId }));
  }

  render() {
    const { result } = this.getStatus('status');
    return (
      <Panel>
        <p className="lead drawer-title">Bot Status</p>
        <code>{result ? result.data.status : 'loading'}</code>
        {result && (
          <Button bsStyle="link" onClick={::this.handleToggleStatus}>
            {result.data.started ? 'Stop' : 'Start'}
          </Button>
        )}
      </Panel>
    );
  }
}
