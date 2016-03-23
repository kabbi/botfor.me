import { NavItem } from 'react-bootstrap';
import { autobind } from 'core-decorators';

export default class NavItemLink extends React.Component {
  static contextTypes = {
    history: React.PropTypes.object
  };

  static propTypes = {
    to: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired
  };

  @autobind
  handleNavItemClick(event) {
    const { to } = this.props;
    event.preventDefault();
    this.context.history.pushState(null, to);
  }

  render() {
    return (
      <NavItem onClick={this.handleNavItemClick} {...this.props}>
        {this.props.children}
      </NavItem>
    );
  }
}
