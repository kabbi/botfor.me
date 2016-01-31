import { Navbar, Nav } from 'react-bootstrap';

import { Link } from 'react-router';
import NavItemLink from 'components/redux/NavItemLink';

export class HeaderView extends React.Component {
  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">xxxxxxxxx</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItemLink to="signin">Sign In</NavItemLink>
          <NavItemLink to="signup">Sign Up</NavItemLink>
        </Nav>
      </Navbar>
    );
  }
}

export default HeaderView;
