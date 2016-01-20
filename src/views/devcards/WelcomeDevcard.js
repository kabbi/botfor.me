function WelcomeDevcard({ children, routes }) {
  return (
    <div className="jumbotron">
      <h1>Welcome</h1>
      <p>
        This is a welcome page for Devcards section, as well as a simple demo
        devcard itself. Feel free to clone and do anything with it!
      </p>
      <p>
        <a className="btn btn-primary btn-lg">Cool</a>
      </p>
    </div>
  );
}

WelcomeDevcard.dcHeader = 'Welcome';

WelcomeDevcard.dcDescription = 'Simple welcome devcard';

export default WelcomeDevcard;
