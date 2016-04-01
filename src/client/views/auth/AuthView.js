import { connect } from 'react-redux';

import { redirectSignIn } from 'utils/Redirects';
import { selectors as authSelectors } from 'redux/modules/auth';

const mapStateToProps = state => ({
  authorized: authSelectors.isAuthorized(state)
});

export class AuthView extends React.Component {
  static propTypes = {
    authorized: React.PropTypes.bool,
    children: React.PropTypes.node
  };

  componentDidMount() {
    this.handleAuthChanges();
  }

  componentDidUpdate() {
    this.handleAuthChanges();
  }

  handleAuthChanges() {
    if (!this.props.authorized) {
      redirectSignIn();
    }
  }

  render() {
    return this.props.authorized && this.props.children;
  }
}

export default connect(mapStateToProps)(AuthView);
