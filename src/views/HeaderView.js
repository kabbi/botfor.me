import { Navbar, Nav } from 'react-bootstrap';

import { Link } from 'react-router';
import NavItemLink from 'components/NavItemLink';

export class HeaderView extends React.Component {
  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">botfor.me</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItemLink href="signin">Sign In</NavItemLink>
          <NavItemLink href="signup">Sign Up</NavItemLink>
        </Nav>
      </Navbar>
    );
  }
}

export default HeaderView;
