import amplitude from 'amplitude-js';

const instance = amplitude.getInstance();

instance.init(process.env.REACT_APP_AMPLITUDE_API_KEY);
instance.logEvent('Init');

export default instance;
