import { NavItem, Nav, Panel } from 'react-bootstrap';

const handleSelect = () => {};

const LeftNav = () => (
  <Panel>
    <p className="lead drawer-title">Dashboard</p>
    <Nav bsStyle="pills" stacked onSelect={handleSelect}>
      <NavItem eventKey={1}>All bots</NavItem>
    </Nav>
    <p className="lead drawer-title">Favorites</p>
    <Nav bsStyle="pills" stacked activeKey={1} onSelect={handleSelect}>
      <NavItem eventKey={1}>HelloWorld bot</NavItem>
      <NavItem eventKey={2}>Bot1</NavItem>
      <NavItem eventKey={3}>Bot2</NavItem>
    </Nav>
  </Panel>
);

export default LeftNav;
