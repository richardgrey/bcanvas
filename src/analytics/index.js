import ReactGA from './ga';
import Amplitude from './amplitude';

export const pageView = location => {
  ReactGA.pageview(location.pathname + location.search);
};

export const register = (uid, email, name) => {
  ReactGA.event({
    category: 'User',
    action: 'Registration',
  });

  Amplitude.setUserId(uid);
  Amplitude.logEvent('Register');
  Amplitude.setUserProperties({
    $email: email,
    $name: name,
    $created: new Date(),
  });
};

export const signIn = (uid, email, name, provider) => {
  ReactGA.event({
    category: 'User',
    action: 'Signed In',
    label: provider,
  });
  Amplitude.setUserId(uid);
  Amplitude.logEvent('Sign In', { provider });
  Amplitude.setUserProperties({
    $email: email,
    $name: name,
  });
};

export const signOut = () => {
  Amplitude.logEvent('Sign Out');
  ReactGA.event({
    category: 'User',
    action: 'Signed Out',
  });
};

export const canvasCreated = (id, type) => {
  Amplitude.logEvent('Canvas Create', {
    canvasId: id,
    type,
  });
  ReactGA.event({
    category: 'Canvas',
    action: 'Create',
    label: type,
  });
  // Amplitude.setUserProperties // How to increment canvas amount?
};

export const canvasDeleted = () => {
  Amplitude.logEvent('Canvas Deleted');
  ReactGA.event({
    category: 'Canvas',
    action: 'Deleted',
  });
  // Amplitude.setUserProperties // How to decrement canvas amount?
};

export const canvasShare = id => {
  Amplitude.logEvent('Canvas Shared', { id });
  ReactGA.event({
    category: 'Canvas',
    action: 'Shared',
  });
};

export const canvasPrint = () => {
  Amplitude.logEvent('Canvas Print');
  ReactGA.event({
    category: 'Canvas',
    action: 'Print',
  });
};
