import '../styles/core.scss';

import 'material-design-lite/material.min.css';
import 'material-design-lite/material.min.js';

import HeaderView from 'views/HeaderView';
import MaterialLiteUpgrade from 'components/MaterialLiteUpgrade';

function CoreLayout({ children }) {
  return (
    <MaterialLiteUpgrade>
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <HeaderView/>
        <main className="mdl-layout__content">
          <div className="page-content">
            {children}
          </div>
        </main>
      </div>
    </MaterialLiteUpgrade>
  );
}

CoreLayout.propTypes = {
  children: React.PropTypes.element
};

export default CoreLayout;
