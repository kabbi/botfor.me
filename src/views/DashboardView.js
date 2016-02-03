import LeftNav from 'components/dashboard/LeftNav';

import BotCard from 'components/dashboard/BotCard';
import NewBotModal from 'components/dashboard/NewBotModal';

export class DashboardView extends React.Component {
  state = {
    showBotModal: false
  };

  handleShowModal(state) {
    this.setState({
      showBotModal: state
    });
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={2}>
            <LeftNav/>
          </Col>
          <Col xs={10}>
            <Row>
              <BotCard/>
              <BotCard template onCreate={this.handleShowModal.bind(this, true)}/>
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
