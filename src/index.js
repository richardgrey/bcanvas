import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import './styles/index.scss';
import './styles/print.scss';

import configureStore from './configureStore';
import * as serviceWorker from './serviceWorker';
import history from './history';
import App from './components/App/App';
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
import NoMatch from './routes/NoMatch';

const store = configureStore();

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
          <Route component={NoMatch} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
serviceWorker.unregister();
