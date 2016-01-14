import { NavItem } from 'react-bootstrap';

import { routeActions } from 'redux-simple-router';

const handleNavItemClick = (href, e) => {
  e.preventDefault();
  console.log('href', routeActions);
  // routeActions.push(href);
};

const NavItemLink = (props) => (
  <NavItem onClick={handleNavItemClick.bind(null, props.href)} {...props}>
    {props.children}
  </NavItem>
);

NavItemLink.propTypes = {
  href: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired
};

export default NavItemLink;
