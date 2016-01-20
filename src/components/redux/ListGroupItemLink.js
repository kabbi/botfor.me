import { ListGroupItem } from 'react-bootstrap';

export default class ListGroupItemLink extends React.Component {
  static contextTypes = {
    history: React.PropTypes.object
  };

  static propTypes = {
    to: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired
  };

  handleListGroupItemClick(to, event) {
    event.preventDefault();
    this.context.history.pushState(null, to);
  }

  render() {
    const { children, to, ...props } = this.props;
    return (
      <ListGroupItem
        active={this.context.history.isActive(to)}
        onClick={this.handleListGroupItemClick.bind(this, to)}
        {...props}
      >
        {children}
      </ListGroupItem>
    );
  }
}
