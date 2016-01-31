import '../styles/core.scss';

import HeaderView from 'views/HeaderView';

function CoreLayout({ children }) {
  return (
    <div className="bfm">
      <HeaderView/>
      {children}
    </div>
  );
}

CoreLayout.propTypes = {
  children: React.PropTypes.element
};

export default CoreLayout;
