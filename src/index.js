import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import configureStore from './configureStore';
import * as serviceWorker from './serviceWorker';
import history from './history';
import App from './components/App/App';
import * as analytics from './analytics';

import Home from './routes/Home';
import CanvasPage from './routes/CanvasPage';
import Register from './routes/Register';
import SignIn from './routes/SignIn';
import Dashboard from './routes/Dashboard';
import ChangePassword from './routes/ChangePassword';
import ChangeEmail from './routes/ChangeEmail';
import TermsPage from './routes/TermsPage';
import PrivacyPolicy from './routes/PrivacyPolicy';
import CookiePolicy from './routes/CookiePolicy';
import AuthHandler from './routes/AuthHandler';
import PasswordRecovery from './routes/PasswordRecovery';
import EmailRecovery from './routes/EmailRecovery';
import NoMatch from './routes/NoMatch';

import './styles/index.scss';
import './styles/print.scss';

const store = configureStore();

// Track page views
analytics.pageView(history.location.pathname + history.location.search);
history.listen(location => {
  analytics.pageView(location.pathname);
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/account/change-password" component={ChangePassword} />
          <Route path="/account/change-email" component={ChangeEmail} />
          <Route path="/canvas/:id" component={CanvasPage} />
          <Route path="/terms-of-services" component={TermsPage} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/cookie-policy" component={CookiePolicy} />
          <Route path="/auth/action" component={AuthHandler} />
          <Route path="/password-recovery/:verificationCode" component={PasswordRecovery} />
          <Route path="/password-recovery" component={PasswordRecovery} />
          <Route path="/email-recovery/:verificationCode" component={EmailRecovery} />

          <Route path="/email-verification/:verificationCode" component={PasswordRecovery} />
          <Route component={NoMatch} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
serviceWorker.unregister();
