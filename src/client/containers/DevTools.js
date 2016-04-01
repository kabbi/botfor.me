import { createDevTools } from 'redux-devtools';
import Dispatcher from 'redux-devtools-dispatch';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import FilterMonitor from 'redux-devtools-filter-actions';
import MultipleMonitors from 'redux-devtools-multiple-monitors';

import { allActions } from 'redux/modules';

export default createDevTools(
  <DockMonitor
    defaultIsVisible={false}
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
  >
    <FilterMonitor
      blacklist={[
        'EFFECT_TRIGGERED',
        'EFFECT_RESOLVED',
        'EFFECT_REJECTED'
      ]}
    >
      <MultipleMonitors>
        <LogMonitor/>
        <Dispatcher actionCreators={allActions}/>
      </MultipleMonitors>
    </FilterMonitor>
  </DockMonitor>
);
