import React from 'react';

import Devcard from 'components/devcards/Devcard';

export const WelcomeDevcard = () => (
  <Devcard id="welcome">
    <p>
      This is a welcome page for Devcards section, as well as a simple demo
      devcard itself. Feel free to clone and do anything useful with it!
    </p>
  </Devcard>
);

WelcomeDevcard.dcGroup = {
  title: 'Welcome!'
};

export default WelcomeDevcard;
