import { connect } from 'react-redux';

import { redirectSignIn } from 'utils/Redirects';

const mapStateToProps = (state) => ({
  authorized: !!state.auth.token
});

export class AuthView extends React.Component {
  static propTypes = {
    authorized: React.PropTypes.bool,
    children: React.PropTypes.node
  };

  handleAuthChanges(authorized) {
    if (!this.props.authorized) {
      redirectSignIn();
    }
  }

  componentDidMount() {
    this.handleAuthChanges();
  }

  componentDidUpdate() {
    this.handleAuthChanges();
  }

  render() {
    return this.props.authorized && this.props.children;
  }
}

export default connect(mapStateToProps)(AuthView);
