import LeftNav from 'components/dashboard/LeftNav';

import BotCard from 'components/dashboard/BotCard';
import NewBotModal from 'components/dashboard/NewBotModal';
import AsyncComponent from 'components/utils/AsyncComponent';

import api from 'utils/Api';
import { redirectEditBot } from 'utils/Redirects';

/* eslint-disable react/jsx-no-bind */
export class DashboardView extends AsyncComponent {
  state = {
    showBotModal: false,
    bots: {}
  };

  handleShowModal(state) {
    this.setState({
      showBotModal: state
    });
  }

  componentDidMount() {
    this.handlePromise('bots', api.bot.list());
  }

  render() {
    const { result } = this.getStatus('bots');

    if (!result) {
      return <div className="text-center">Loading...</div>;
    }

    return (
      <Grid fluid>
        <Row>
          <Col xs={2}>
            <LeftNav/>
          </Col>
          <Col xs={10}>
            <Row>
              <span>
                {result.data.map(bot => (
                  <BotCard key={bot._id} name={bot.name}
                    onEdit={redirectEditBot.bind(null, bot._id)}
                  />
                ))}
              </span>
              <BotCard name="Empty Template" template
                onCreate={this.handleShowModal.bind(this, true)}
              />
            </Row>
          </Col>
        </Row>
        <NewBotModal
          show={this.state.showBotModal}
          onClose={this.handleShowModal.bind(this, false)}
        />
      </Grid>
    );
  }
}

export default DashboardView;
