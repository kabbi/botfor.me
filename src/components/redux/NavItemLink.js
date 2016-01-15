import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';

import { NavItem } from 'react-bootstrap';

const mapDispatchToProps = {
  pushPath: pushPath
};

class NavItemLink extends React.Component {

  static propTypes = {
    href: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
    pushPath: React.PropTypes.func.isRequired
  };

  handleNavItemClick(href, e) {
    e.preventDefault();
    this.props.pushPath(href);
  }

  render() {
    return (
      <NavItem onClick={this.handleNavItemClick.bind(this, this.props.href)} {...this.props}>
        {this.props.children}
      </NavItem>
    );
  }
}

export default connect(null, mapDispatchToProps)(NavItemLink);
