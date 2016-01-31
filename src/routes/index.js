import { Route, IndexRoute } from 'react-router';

import CoreLayout from 'layouts/CoreLayout';
import DevcardsLayout from 'layouts/DevcardsLayout';

import HomeView from 'views/HomeView';
import AboutView from 'views/AboutView';
import SignInView from 'views/SignInView';
import SignUpView from 'views/SignUpView';
import DashboardView from 'views/DashboardView';
import DrawerView from 'views/DrawerView';

import WelcomeDevcard from 'views/devcards/WelcomeDevcard';
import OnlineStatusDevcard from 'views/devcards/OnlineStatusDevcard';
import SvgDevcard from 'views/devcards/SvgDevcard';

export default (
  <Route path="/" component={CoreLayout}>
    <IndexRoute component={HomeView}/>
    <Route path="about" component={AboutView}/>
    <Route path="signin" component={SignInView}/>
    <Route path="signup" component={SignUpView}/>
    <Route path="dashboard" component={DashboardView}/>
    <Route path="drawer" component={DrawerView}/>

    <Route path="devcards" component={DevcardsLayout}>
      <IndexRoute component={WelcomeDevcard}/>
      <Route path="welcome" component={WelcomeDevcard}/>
      <Route path="status" component={OnlineStatusDevcard}/>
      <Route path="svg" component={SvgDevcard}/>
    </Route>
  </Route>
);
