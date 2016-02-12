import { Button } from 'react-bootstrap';
import Immutable from 'immutable';

import AsyncComponent from 'components/utils/AsyncComponent';
import BotStatus from 'components/editor/BotStatus';
import Drawer from 'components/editor/Drawer';
import BotCanvas from 'components/svg/BotCanvas';
import Dump from 'components/Dump';

import { delay } from 'utils/Promise';
import api from 'utils/Api';

export class EditorView extends AsyncComponent {
  static propTypes = {
    params: React.PropTypes.object
  };

  state = {
    bot: {},
    deploy: {},
    data: null
  };

  handleDeployBot() {
    const { botId } = this.props.params;
    const data = this.state.data.toJS();

    this.handlePromise('deploy', api.bot.deploy(data, { botId })).then(() => (
      delay(1000)
    )).then(() => {
      if (this.unmounted) {
        return;
      }
      this.resetStatus('deploy');
    });
  }

  handleNewNode(type) {
    this.setState({
      nodes: [...this.state.node, {
        id: Math.floor(Math.random() * 1000).toString(16),
        type
      }]
    });
  }

  handleDataUpdate(data) {
    if (typeof data === 'function') {
      this.setState(state => ({
        ...state,
        data: data(state.data)
      }));
    } else {
      this.setState({ data });
    }
  }

  componentWillMount() {
    const { botId } = this.props.params;
    this.handlePromise('bot', api.bot.fetch({ botId })).then(result => {
      const data = Immutable.fromJS(JSON.parse(result.data.code));
      this.setState({ data });
    });
  }

  render() {
    const botStatus = this.getStatus('bot');
    const { data } = this.state;

    if (!data || !botStatus.result) {
      return <div className="text-center">Loading...</div>;
    }

    const bot = botStatus.result.data;

    return (
      <Grid fluid>
        <Row>
          <Col xs={3}>
            <BotStatus botId={bot._id}/>
            <Drawer onAddNode={::this.handleNewNode}/>
          </Col>
          <Col xs={9}>
            <BotCanvas width="100%" height="400"
              className="bfm-canvas-border"
              onUpdate={::this.handleDataUpdate}
              data={data}
            />
            <Button onClick={::this.handleDeployBot} bsStyle="success" block>
              Deploy
            </Button>
            <Dump data={data.toJS()}/>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default EditorView;
