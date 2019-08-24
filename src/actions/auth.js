import api from '../api';
import history from '../history';

// Constants
// ============================================================================
export const AUTH_SET_USER = 'AUTH_SET_USER';
export const AUTH_UNSET_USER = 'AUTH_UNSET_USER';

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';
export const AUTH_REGISTER_REQUEST = 'AUTH_REGISTER_REQUEST';
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_ERROR = 'AUTH_REGISTER_ERROR';
export const AUTH_SIGN_OUT_REQUEST = 'AUTH_SIGN_OUT_REQUEST';
export const AUTH_SIGN_OUT_SUCCESS = 'AUTH_SIGN_OUT_SUCCESS';
export const AUTH_SIGN_OUT_ERROR = 'AUTH_SIGN_OUT_ERROR';
export const AUTH_SUBSCRIBE_STATE_CHANGE = 'AUTH_SUBSCRIBE_STATE_CHANGE';
export const AUTH_RESET_FORM = 'AUTH_RESET_FORM';

// Errors
export const AUTH_ERROR_MISSING_REQUIRED_FIELDS = 'AUTH_ERROR_MISSING_REQUIRED_FIELDS';

// Actions
// ============================================================================
/**
 * Clear authorisation forms status
 *
 * @returns {{type: string}}
 */
export const resetAuthForm = () => ({
  type: AUTH_RESET_FORM,
});

/**
 * Send a registration request.
 *
 * @param email {string}
 * @param password {string}
 * @param name {string}
 * @returns {Function}
 */
export const register = (email, password, name) => async dispatch => {
  // Check if all required fields is passed
  if (!email || !password || !name) {
    dispatch({ type: AUTH_ERROR_MISSING_REQUIRED_FIELDS });
    return;
  }

  dispatch({ type: AUTH_REGISTER_REQUEST });
  try {
    const user = await api.auth.signUpViaEmail(email, password, name);
    dispatch({ type: AUTH_REGISTER_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: AUTH_REGISTER_ERROR, payload: error });
  }
};

/**
 * Sign In request
 *
 * @param email {string}
 * @param password {string}
 * @returns {Function}
 */
export const login = (email, password) => async dispatch => {
  dispatch({ type: AUTH_LOGIN_REQUEST });
  try {
    const user = await api.auth.signInViaEmail(email, password);
    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: AUTH_LOGIN_ERROR, payload: error });
  }
};

/**
 * Sign In with Google account
 *
 * @returns {Function}
 */
export const signInGoogle = () => async dispatch => {
  dispatch({ type: AUTH_LOGIN_REQUEST });
  try {
    const user = await api.auth.signInWithGoogle();
    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: AUTH_LOGIN_ERROR, payload: error });
  }
};

/**
 * Sign Out
 *
 * @returns {Function}
 */
export const signOut = () => async dispatch => {
  dispatch({ type: AUTH_SIGN_OUT_REQUEST });
  try {
    await api.auth.signOut();
    dispatch({ type: AUTH_SIGN_OUT_SUCCESS });
    history.push('/');
  } catch (error) {
    dispatch({ type: AUTH_SIGN_OUT_ERROR });
  }
};

/**
 * Observe authorisation status changes
 *
 * @returns {function(*): (*|firebase.Unsubscribe)}
 */
export const subscribeOnAuthStateChanged = () => dispatch => {
  dispatch({ type: AUTH_SUBSCRIBE_STATE_CHANGE });
  return api.auth.onAuthStateChanged(user => {
    if (user) {
      dispatch({ type: AUTH_SET_USER, payload: user.toJSON() });
    } else {
      dispatch({ type: AUTH_UNSET_USER });
    }
  });
};
