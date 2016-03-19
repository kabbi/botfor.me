import { Button, ButtonGroup, ButtonToolbar, Glyphicon } from 'react-bootstrap';
import classNames from 'classnames';
import AceEditor from 'react-ace';
import Immutable from 'immutable';

import 'brace/theme/github';
import 'brace/mode/json';

import AsyncComponent from 'components/utils/AsyncComponent';
import BotStatus from 'components/editor/BotStatus';
import Drawer from 'components/editor/Drawer';
import BotCanvas from 'components/svg/BotCanvas';

import { randomNodeId } from 'utils/Random';
import { delay } from 'utils/Promise';
import api from 'utils/Api';

export class EditorView extends AsyncComponent {
  static propTypes = {
    params: React.PropTypes.object
  };

  state = {
    bot: {},
    deploy: {},
    data: null,
    code: null,
    mode: 'visual',
    toolbarVisible: false
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
    this.handleDataUpdate(this.state.data.update('nodes', nodes => (
      nodes.push(Immutable.fromJS({
        type,
        id: randomNodeId(),
        props: {},
        disp: {
          x: 10,
          y: 10,
          width: 100,
          height: 60,
          expanded: false
        }
      }))
    )));
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

  handleUpdateBotCode(code) {
    this.setState({ code });
  }

  handleToggleMode(mode) {
    switch (mode) {
      case 'visual':
        this.setState({
          data: Immutable.fromJS(JSON.parse(this.state.code))
        });
        break;
      case 'source':
        this.setState({
          code: JSON.stringify(this.state.data.toJS(), null, 2)
        });
        break;
      default:
        throw new Error('Bad mode');
    }
    this.setState({ mode });
  }

  handleToggleToolbar(toolbarVisible) {
    this.setState({ toolbarVisible });
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
    const { mode, data, toolbarVisible } = this.state;

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
          <Col xs={9}
            className="bfm-toolbar-container"
            onMouseEnter={this.handleToggleToolbar.bind(this, true)}
            onMouseLeave={this.handleToggleToolbar.bind(this, false)}
          >
            {mode === 'visual' && <BotCanvas width="100%" height="400"
              className="bfm-canvas-border"
              onUpdate={::this.handleDataUpdate}
              data={data}
            />}

            {mode === 'source' && <AceEditor mode="json" theme="github"
              width="100%" height="100" tabSize={2}
              minLines={1} maxLines={Infinity}
              onChange={::this.handleUpdateBotCode}
              value={this.state.code}
              editorProps={{
                $blockScrolling: true
              }}
            />}

            <ButtonToolbar
              className={
                classNames('bfm-right-toolbar', toolbarVisible ? 'bfm-visible' : 'bfm-invisible')
              }
            >
              <ButtonGroup>
                <Button
                  onClick={this.handleToggleMode.bind(this, 'source')}
                  bsStyle={mode === 'source' ? 'primary' : 'default'}
                  bsSize="xs"
                >
                  <Glyphicon glyph="pencil"/>
                </Button>
                <Button
                  onClick={this.handleToggleMode.bind(this, 'visual')}
                  bsStyle={mode === 'visual' ? 'primary' : 'default'}
                  bsSize="xs"
                >
                  <Glyphicon glyph="picture"/>
                </Button>
              </ButtonGroup>
            </ButtonToolbar>

            <Button onClick={::this.handleDeployBot} bsStyle="success" block>
              Deploy
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default EditorView;
