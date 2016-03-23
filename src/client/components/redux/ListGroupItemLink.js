import { ListGroupItem } from 'react-bootstrap';
import { autobind } from 'core-decorators';

export default class ListGroupItemLink extends React.Component {
  static contextTypes = {
    history: React.PropTypes.object
  };

  static propTypes = {
    to: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired
  };

  @autobind
  handleListGroupItemClick(event) {
    const { to } = this.props;
    event.preventDefault();
    this.context.history.pushState(null, to);
  }

  render() {
    const { children, to, ...props } = this.props;
    return (
      <ListGroupItem
        active={this.context.history.isActive(to)}
        onClick={this.handleListGroupItemClick}
        {...props}
      >
        {children}
      </ListGroupItem>
    );
  }
}
