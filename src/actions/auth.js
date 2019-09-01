import api from '../api';
import history from '../history';
import * as analytics from '../analytics';
import { ERROR_AUTH_INV_DISPLAY_NAME } from '../constants';

// ---

export const AUTH_RESET_FORMS = 'AUTH_RESET_FORMS';

/**
 * Clear authorisation forms status
 *
 * @returns {{type: string}}
 */
export const resetAuthForms = () => ({
  type: AUTH_RESET_FORMS,
});

// ---

export const AUTH_REGISTER_REQUEST = 'AUTH_REGISTER_REQUEST';
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_ERROR = 'AUTH_REGISTER_ERROR';

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
  if (!name) {
    dispatch({ type: AUTH_REGISTER_ERROR, payload: ERROR_AUTH_INV_DISPLAY_NAME });
    return;
  }

  dispatch({ type: AUTH_REGISTER_REQUEST });
  try {
    const user = await api.auth.signUpViaEmail(email, password, name);

    analytics.register(user.uid, email, name);
    dispatch({ type: AUTH_REGISTER_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: AUTH_REGISTER_ERROR, payload: error });
  }
};

// ---

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';

/**
 * Sign In request
 *
 * @param email {string}
 * @param password {string}
 * @returns {Function}
 */
export const signIn = (email, password) => async dispatch => {
  dispatch({ type: AUTH_LOGIN_REQUEST });
  try {
    const user = await api.auth.signInViaEmail(email, password);

    analytics.signIn(user.uid, user.email, user.displayName, 'email');
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

    if (user.isNewUser) {
      // track registration event
      analytics.register(user.uid, user.email, user.displayName);
    } else {
      // track sign in
      analytics.signIn(user.uid, user.email, user.displayName, 'email');
    }

    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: AUTH_LOGIN_ERROR, payload: error });
  }
};

// ---

export const AUTH_SIGN_OUT_REQUEST = 'AUTH_SIGN_OUT_REQUEST';
export const AUTH_SIGN_OUT_SUCCESS = 'AUTH_SIGN_OUT_SUCCESS';
export const AUTH_SIGN_OUT_ERROR = 'AUTH_SIGN_OUT_ERROR';

/**
 * Sign Out
 *
 * @returns {Function}
 */
export const signOut = () => async dispatch => {
  dispatch({ type: AUTH_SIGN_OUT_REQUEST });
  try {
    await api.auth.signOut();

    analytics.signOut();
    dispatch({ type: AUTH_SIGN_OUT_SUCCESS });
    history.push('/');
  } catch (error) {
    dispatch({ type: AUTH_SIGN_OUT_ERROR });
  }
};

// ---

export const AUTH_SET_USER = 'AUTH_SET_USER';
export const AUTH_UNSET_USER = 'AUTH_UNSET_USER';
export const AUTH_SUBSCRIBE_STATE_CHANGE = 'AUTH_SUBSCRIBE_STATE_CHANGE';

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

// ---

export const AUTH_PASSWORD_RESET_EMAIL_REQUEST = 'AUTH_PASSWORD_RESET_EMAIL_REQUEST';
export const AUTH_PASSWORD_RESET_EMAIL_SUCCESS = 'AUTH_PASSWORD_RESET_EMAIL_SUCCESS';
export const AUTH_PASSWORD_RESET_EMAIL_ERROR = 'AUTH_PASSWORD_RESET_EMAIL_ERROR';

/**
 * Will send email with password reset instructions to given email.
 *
 * @param email {string}
 * @returns {Function}
 */
export const sendPasswordResetEmail = email => async dispatch => {
  dispatch({ type: AUTH_PASSWORD_RESET_EMAIL_REQUEST });
  try {
    await api.auth.sendPasswordResetEmail(email);
    dispatch({ type: AUTH_PASSWORD_RESET_EMAIL_SUCCESS });
  } catch (error) {
    dispatch({ type: AUTH_PASSWORD_RESET_EMAIL_ERROR, payload: error });
  }
};

// ---

export const AUTH_ACTION_CODE_VALIDATION_REQUEST = 'AUTH_ACTION_CODE_VALIDATION_REQUEST';
export const AUTH_ACTION_CODE_VALIDATION_SUCCESS = 'AUTH_ACTION_CODE_VALIDATION_SUCCESS';
export const AUTH_ACTION_CODE_VALIDATION_ERROR = 'AUTH_ACTION_CODE_VALIDATION_ERROR';

/**
 * Check if given code is valid action code for password reset.
 *
 * @param code {string}
 * @returns {Function}
 */
export const verifyPasswordResetCode = code => async dispatch => {
  dispatch({ type: AUTH_ACTION_CODE_VALIDATION_REQUEST });
  try {
    const email = await api.auth.verifyPasswordResetCode(code);
    dispatch({ type: AUTH_ACTION_CODE_VALIDATION_SUCCESS, payload: email });
  } catch (error) {
    dispatch({ type: AUTH_ACTION_CODE_VALIDATION_ERROR, payload: error });
  }
};

export const verifyActionCode = code => async dispatch => {
  dispatch({ type: AUTH_ACTION_CODE_VALIDATION_REQUEST });
  try {
    const info = await api.auth.checkActionCode(code);
    const { email } = info.data || {};
    // Apply the code straight away
    await api.auth.applyActionCode(code);
    dispatch({ type: AUTH_ACTION_CODE_VALIDATION_SUCCESS, payload: email });
  } catch (error) {
    dispatch({ type: AUTH_ACTION_CODE_VALIDATION_ERROR, payload: error });
  }
};

// ---

export const AUTH_PASSWORD_CONFIRM_REQUEST = 'AUTH_PASSWORD_CONFIRM_REQUEST';
export const AUTH_PASSWORD_CONFIRM_SUCCESS = 'AUTH_PASSWORD_CONFIRM_SUCCESS';
export const AUTH_PASSWORD_CONFIRM_ERROR = 'AUTH_PASSWORD_CONFIRM_ERROR';

/**
 * Submit new password to set in reset password process.
 *
 * @param code {string}
 * @param password {string}
 * @returns {Function}
 */
export const confirmPasswordReset = (code, password) => async dispatch => {
  dispatch({ type: AUTH_PASSWORD_CONFIRM_REQUEST });
  try {
    await api.auth.confirmPasswordReset(code, password);
    dispatch({ type: AUTH_PASSWORD_CONFIRM_SUCCESS });
  } catch (error) {
    dispatch({ type: AUTH_PASSWORD_CONFIRM_ERROR, payload: error });
  }
};

// ---

export const AUTH_RESET_PASSWORD_ERROR = 'AUTH_RESET_PASSWORD_ERROR';

/**
 * Submits error to Reset Password form.
 *
 * @param error {string}
 * @returns {Function}
 */
export const resetPasswordError = error => dispatch => {
  dispatch({ type: AUTH_RESET_PASSWORD_ERROR, payload: error });
};

// ---

export const AUTH_VERIFY_EMAIL_REQUEST = 'AUTH_VERIFY_EMAIL_REQUEST';
export const AUTH_VERIFY_EMAIL_SUCCESS = 'AUTH_VERIFY_EMAIL_SUCCESS';
export const AUTH_VERIFY_EMAIL_ERROR = 'AUTH_VERIFY_EMAIL_ERROR';

export const verifyEmail = code => async dispatch => {
  dispatch({ type: AUTH_VERIFY_EMAIL_REQUEST });
  try {

    dispatch({ type: AUTH_VERIFY_EMAIL_SUCCESS });
  } catch (error) {
    dispatch({ type: AUTH_VERIFY_EMAIL_ERROR, payload: error });
  }
};
