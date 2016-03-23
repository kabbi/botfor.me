export class MaintainingView extends React.Component {

  get imitateWorkProgress() {
    return (
      <div>
        <h1>Work in progress!</h1>
        <h2>Work in progress!</h2>
        <h3>Work in progress!</h3>
        <h4>Work in progress!</h4>
        <h5>Work in progress!</h5>
        <h6>Work in progress!</h6>
      </div>
    );
  }

  render() {
    return (
      <div className="container text-center">
        {this.imitateWorkProgress}
      </div>
    );
  }
}

export default MaintainingView;
