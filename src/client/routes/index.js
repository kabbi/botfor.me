import { Route, IndexRoute } from 'react-router';

import CoreLayout from 'layouts/CoreLayout';
import DevcardsLayout from 'layouts/DevcardsLayout';

import HomeView from 'views/HomeView';
import AboutView from 'views/AboutView';
import SignInView from 'views/SignInView';
import SignUpView from 'views/SignUpView';
import DashboardView from 'views/DashboardView';

import EditorView from 'views/editor/EditorView';

import AuthView from 'views/auth/AuthView';

import WelcomeDevcards from 'views/devcards/WelcomeDevcards';
import AuthFormsDevcards from 'views/devcards/AuthFormsDevcards';
import FormsDevcards from 'views/devcards/FormsDevcards';
import PanZoomDevcards from 'views/devcards/PanZoomDevcards';
import SvgDevcard from 'views/devcards/SvgDevcard';
import RacerPlaygroundDevcards from 'views/devcards/RacerPlaygroundDevcards';

export default (
  <Route path="/" component={CoreLayout}>
    <IndexRoute component={HomeView}/>
    <Route path="signin" component={SignInView}/>
    <Route path="signup" component={SignUpView}/>

    <Route component={AuthView}>
      <Route path="about" component={AboutView}/>
      <Route path="dashboard" component={DashboardView}/>
      <Route path="editor/:botId" component={EditorView}/>

      <Route path="devcards" component={DevcardsLayout}>
        <IndexRoute component={WelcomeDevcards}/>
        <Route path="welcome" component={WelcomeDevcards}/>
        <Route path="pan-zoom" component={PanZoomDevcards}/>
        <Route path="auth-forms" component={AuthFormsDevcards}/>
        <Route path="form" component={FormsDevcards}/>
        <Route path="svg" component={SvgDevcard}/>
        <Route path="racer" component={RacerPlaygroundDevcards}/>
      </Route>
    </Route>
    <Route path="no-auth/devcards" component={DevcardsLayout}>
      <Route path="welcome" component={WelcomeDevcards}/>
      <Route path="racer" component={RacerPlaygroundDevcards}/>
    </Route>
  </Route>
);
