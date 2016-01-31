import { Well, Label } from 'react-bootstrap';
import { connect } from 'react-redux';

import { actions as remoteActions } from 'redux/modules/remote';
import { on } from 'utils/Events';

const STATUS_STYLE_MAP = {
  offline: 'danger',
  reconnecting: 'warning',
  online: 'success'
};

const mapStateToProps = (state) => ({
  status: state.remote.status,
  socket: state.remote.socket
});
export default class OnlineStatusDevcard extends React.Component {
  static dcHeader = 'Online Status';

  static dcDescription = 'Just a test of sockets.io';

  static propTypes = {
    connect: React.PropTypes.func.isRequired,
    disconnect: React.PropTypes.func.isRequired,
    status: React.PropTypes.string.isRequired,
    socket: React.PropTypes.object
  };

  state = {
    message: null
  };

  componentDidMount() {
    this.props.connect();
    this.listenMessages(this.props.socket);
  }

  componentWillUnmount() {
    this.props.disconnect();
    this.subscr.destroy();
    this.subscr = null;
  }

  componentWillReceiveProps(nextProps) {
    this.listenMessages(nextProps.socket);
  }

  listenMessages(socket) {
    if (this.subscr) {
      this.subscr.destroy();
      this.subscr = null;
    }
    if (socket) {
      this.subscr = on(socket, 'message', message => {
        this.setState({ message });
      });
    }
  }

  render() {
    const { status } = this.props;
    const { message } = this.state;
    return (
      <div>
        <h1>Online status</h1>
        <p>
          This webpage automatically connects to socket.io server and shows the
          online status here.
        </p>
        <Well>
          <Label bsStyle={STATUS_STYLE_MAP[status]}>{status}</Label>{' '}
          Last received message: <code>{message || 'none'}</code>
        </Well>
      </div>
    );
  }
};

export default connect(mapStateToProps, remoteActions)(OnlineStatusDevcard);
