import '../styles/core.scss';

import HeaderView from 'views/HeaderView';

function CoreLayout({ children }) {
  return (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-drawer">
      <HeaderView/>
      {children}
    </div>
  );
}

CoreLayout.propTypes = {
  children: React.PropTypes.element
};

export default CoreLayout;
