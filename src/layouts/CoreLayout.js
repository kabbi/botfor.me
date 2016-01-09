import '../styles/core.scss';

import 'material-design-lite/material.min.css';
import 'material-design-lite/material.min.js';

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
