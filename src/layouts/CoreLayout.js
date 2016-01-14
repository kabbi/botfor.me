import '../styles/core.scss';

import { Button } from 'react-bootstrap';

import HeaderView from 'views/HeaderView';
import Drawer from 'components/dashboard/Drawer';

function CoreLayout({ children }) {
  return (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-drawer">
      <HeaderView/>
      <div>
        <Button bsStyle="primary">Default</Button>
      </div>
    </div>
  );
}

CoreLayout.propTypes = {
  children: React.PropTypes.element
};

export default CoreLayout;
