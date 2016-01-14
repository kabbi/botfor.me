import { NavItem } from 'react-bootstrap';

const handleNavItemClick = (href, e) => {
  e.preventDefault();
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
