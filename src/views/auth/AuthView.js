import { connect } from 'react-redux';

import {
  redirectSignIn, redirectHome
} from 'utils/Redirects';

const mapStateToProps = (state) => ({
  authorized: !!state.auth.token,
  user: state.auth.user
});

export class AuthView extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    authorized: React.PropTypes.bool,
    children: React.PropTypes.node
  };

  handleAuthChanges(authorized) {
    // TODO: this gets called every time, so
    // we enter endless loop and ddos chrome
    // TODO: investigate!

    // if (!authorized) {
    //   redirectSignIn();
    // } else {
    //   redirectHome();
    // }
  }

  componentDidMount() {
    this.handleAuthChanges(this.props.authorized);
  }

  componentDidUpdate() {
    this.handleAuthChanges(this.props.authorized);
  }

  render() {
    return this.props.authorized && this.props.children;
  }
}

export default connect(mapStateToProps)(AuthView);
