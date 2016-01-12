export class MaterialLiteUpgrade extends React.Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired
  };

  componentDidMount() {
    this.handleDomUpdate();
  }

  componentDidUpdate(prevProps, prevState) {
    this.handleDomUpdate();
  }

  handleDomUpdate() {
    if (window.componentHandler) {
      window.componentHandler.upgradeDom();
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default MaterialLiteUpgrade;
