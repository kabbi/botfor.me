import { NavItem, Nav, Panel } from 'react-bootstrap';

const handleSelect = () => {
  alert('Not implemented yet');
};

const LeftNav = () => (
  <Panel>
    <p className="lead drawer-title">Dashboard</p>
    <Nav bsStyle="pills" stacked activeKey={1} onSelect={handleSelect}>
      <NavItem eventKey={1}>All my bots</NavItem>
      <NavItem eventKey={2}>Favorites</NavItem>
      <NavItem eventKey={3}>Running</NavItem>
    </Nav>
    <p className="lead drawer-title">Community</p>
    <Nav bsStyle="pills" stacked onSelect={handleSelect}>
      <NavItem eventKey={1}>Most popular</NavItem>
      <NavItem eventKey={2}>Shared with me</NavItem>
      <NavItem eventKey={3}>New bots</NavItem>
    </Nav>
  </Panel>
);

export default LeftNav;
