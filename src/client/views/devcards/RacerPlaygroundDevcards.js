import Horizon from '@horizon/client';
import React from 'react';

import Devcard from 'components/devcards/Devcard';

export const RacerPlaygroundDevcard = () => (
  <Devcard id="racer">
    <p>
      Whee
    </p>
  </Devcard>
);

RacerPlaygroundDevcard.dcGroup = {
  title: 'Racer'
};

export default RacerPlaygroundDevcard;

const horizon = new Horizon({
  // TODO: Make API_HOST more accessible
  host: (__API_HOST__).slice(7),
  authType: 'token',
});

horizon.status(status => {
  console.log('hr', status);
});
horizon.connect();

horizon('items').fetch().subscribe(item => {
  console.log('new item', item);
});
