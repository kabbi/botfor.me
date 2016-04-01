import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { selectors as authSelectors } from 'redux/modules/auth';
import NavItemLink from 'components/redux/NavItemLink';
import { actions } from 'redux/modules/auth';

const mapStateToProps = state => ({
  authorized: authSelectors.isAuthorized(state)
});

export class HeaderView extends React.Component {
  static propTypes = {
    authorized: React.PropTypes.bool.isRequired,
    signOut: React.PropTypes.func.isRequired
  };

  handleSignOut(event) {
    event.preventDefault();
    this.props.signOut();
  }

  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">botfor.me</Link>
          </Navbar.Brand>
        </Navbar.Header>
        {this.props.authorized ? (
          <Nav pullRight>
            <NavItem onClick={::this.handleSignOut}>Sign Out</NavItem>
          </Nav>
        ) : (
          <Nav pullRight>
            <NavItemLink to="signin">Sign In</NavItemLink>
            <NavItemLink to="signup">Sign Up</NavItemLink>
          </Nav>
        )}
      </Navbar>
    );
  }
}

export default connect(mapStateToProps, actions)(HeaderView);
