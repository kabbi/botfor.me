import { Link } from 'react-router';

export class HeaderView extends React.Component {
  render() {
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
            <Link to="/">
              <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                <i className="material-icons">send</i>
              </button>
            </Link>
          </span>
          <nav className="mdl-navigation">
            <Link to="signup" className="mdl-navigation__link">SIGN UP</Link>
            <Link to="signin" className="mdl-navigation__link">LOGIN</Link>
          </nav>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation">
            <Link to="signup" className="mdl-navigation__link">SIGN UP</Link>
            <Link to="signin" className="mdl-navigation__link">LOGIN</Link>
          </nav>
        </div>
      </header>
    );
  }
}

export default HeaderView;
