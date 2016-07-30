import React, { Component } from 'react';

import Devcard from 'components/devcards/Devcard';
import FlowCanvas from 'components/svg/FlowCanvas';

import css from './PanZoomDevcard.scss';

export default class FormsDevcards extends Component {
  static dcGroup = {
    title: 'Pan & Zoom',
    category: 'demos'
  };

  render() {
    return (
      <div>
        <Devcard id="pz/test0">
          <FlowCanvas className={css.card}/>
        </Devcard>
      </div>
    );
  }
}
