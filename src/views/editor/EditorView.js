import { Button, ButtonToolbar, Panel } from 'react-bootstrap';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/github';

import AsyncComponent from 'components/utils/AsyncComponent';
import BotStatus from 'components/editor/BotStatus';
import Drawer from 'components/editor/Drawer';
import DemoBot from 'static/demo-bot.json';

import { delay } from 'utils/Promise';
import api from 'utils/Api';

export class EditorView extends AsyncComponent {
  static propTypes = {
    params: React.PropTypes.object
  };

  state = {
    bot: {},
    code: JSON.stringify(DemoBot, null, 2),
    deploy: {}
  };

  handleUpdateCode(code) {
    this.setState({ code });
  }

  handleDeployBot() {
    const { botId } = this.props.params;
    const data = JSON.parse(this.state.code);
    this.handlePromise('deploy', api.bot.deploy(data, { botId })).then(() => (
      delay(1000)
    )).then(() => {
      if (this.unmounted) {
        return;
      }
      this.resetStatus('deploy');
    });
  }

  componentWillMount() {
    const { botId } = this.props.params;
    this.handlePromise('bot', api.bot.fetch({ botId }));
  }

  render() {
    const botStatus = this.getStatus('bot');
    const deployStatus = this.getStatus('deploy');

    if (!botStatus.result) {
      return <div className="text-center">Loading...</div>;
    }

    const bot = botStatus.result.data;

    return (
      <Grid fluid>
        <Row>
          <Col xs={3}>
            <BotStatus botId={bot._id}/>
            <Drawer/>
          </Col>
          <Col xs={9}>
            <AceEditor mode="json" theme="github"
              width="100%" height="100" tabSize={2}
              minLines={1} maxLines={Infinity}
              value={this.state.code}
              onChange={::this.handleUpdateCode}
              editorProps={{
                $blockScrolling: true
              }}
            />
            <Button bsStyle="success" block
              onClick={::this.handleDeployBot}
              disabled={deployStatus.pending}
            >
              {deployStatus.result ? (
                deployStatus.result.error ? `Failed: ${deployStatus.result.message}` : `Success`
              ) : 'Deploy!'}
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default EditorView;
