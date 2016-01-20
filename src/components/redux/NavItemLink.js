import { NavItem } from 'react-bootstrap';

export default class NavItemLink extends React.Component {
  static contextTypes = {
    history: React.PropTypes.object
  };

  static propTypes = {
    to: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired
  };

  handleNavItemClick(to, event) {
    event.preventDefault();
    this.context.history.pushState(null, to);
  }

  render() {
    return (
      <NavItem onClick={this.handleNavItemClick.bind(this, this.props.to)} {...this.props}>
        {this.props.children}
      </NavItem>
    );
  }
}
