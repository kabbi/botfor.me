import '../styles/core.scss';

import HeaderView from 'views/HeaderView';

function CoreLayout({ children }) {
  return (
    <div>
      <HeaderView />
      <div className='page-container'>
        <div className='view-container'>
          {children}
        </div>
      </div>
    </div>
  );
}

CoreLayout.propTypes = {
  children: React.PropTypes.element
};

export default CoreLayout;
