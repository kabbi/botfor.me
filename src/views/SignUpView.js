import { Link } from 'react-router';

export class SignUpView extends React.Component {
  render() {
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--3-col"></div>
        <div className="mdl-cell mdl-cell--6-col">
          <div className="mdl-card mdl-shadow--2dp" style={{width: '100%'}}>
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">Hello there!</h2>
            </div>
            <div className="mdl-card__actions mdl-card--border">
              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--1-col"></div>
                <div className="mdl-cell mdl-cell--10-col">
                  <form action="#">
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style={{width: '100%'}}>
                      <input className="mdl-textfield__input" type="text" id="sample3"/>
                      <label className="mdl-textfield__label">Email</label>
                    </div>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style={{width: '100%'}}>
                      <input className="mdl-textfield__input" type="password" id="sample4"/>
                      <label className="mdl-textfield__label">Password</label>
                    </div>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style={{width: '100%'}}>
                      <input className="mdl-textfield__input" type="password"/>
                      <label className="mdl-textfield__label">Repeat Password</label>
                    </div>
                    <label>
                      Already have account?
                      &nbsp;
                      <Link to="signin">
                        Sign In
                      </Link>
                    </label>
                    <button type="submit"
                      className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                      style={{float: 'right'}}>
                      Sign Up
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--3-col"></div>
      </div>
    );
  }
}

export default SignUpView;
