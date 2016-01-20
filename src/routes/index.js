import { Route, IndexRoute } from 'react-router';

import CoreLayout from 'layouts/CoreLayout';

import HomeView from 'views/HomeView';
import AboutView from 'views/AboutView';
import SignInView from 'views/SignInView';
import SignUpView from 'views/SignUpView';
import DashboardView from 'views/DashboardView';

export default (
  <Route path="/" component={CoreLayout}>
    <IndexRoute component={HomeView}/>
    <Route path="about" component={AboutView}/>
    <Route path="signin" component={SignInView}/>
    <Route path="signup" component={SignUpView}/>
    <Route path="dashboard" component={DashboardView}/>
  </Route>
);
