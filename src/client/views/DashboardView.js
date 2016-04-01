import ImmutablePropTypes from 'react-immutable-proptypes';
import LeftNav from 'components/dashboard/LeftNav';
import { connect } from 'react-redux';

import BotCard from 'components/dashboard/BotCard';
import NewBotModal from 'components/dashboard/NewBotModal';
import AsyncComponent from 'components/utils/AsyncComponent';

import { actions, selectors } from 'redux/modules/bots';
import { redirectEditBot } from 'utils/Redirects';

const mapStateToProps = state => ({
  loading: selectors.isLoading(state),
  bots: selectors.getBots(state)
});
const mapActionsToProps = actions;

/* eslint-disable react/jsx-no-bind */
export class DashboardView extends AsyncComponent {
  static propTypes = {
    bots: ImmutablePropTypes.list,
    listBots: React.PropTypes.func.isRequired
  };

  state = {
    showBotModal: false
  };

  handleShowModal(state) {
    this.setState({
      showBotModal: state
    });
  }

  componentDidMount() {
    this.props.listBots();
  }

  render() {
    const { loading, bots } = this.props;

    if (loading || !bots) {
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
                {bots.map(bot => (
                  <BotCard key={bot.get('_id')} name={bot.get('name')}
                    onEdit={redirectEditBot.bind(null, bot.get('_id'))}
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

export default connect(mapStateToProps, mapActionsToProps)(DashboardView);
