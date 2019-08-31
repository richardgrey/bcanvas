import api from '../api';

export const ACCOUNT_FORMS_RESET = 'ACCOUNT_FORMS_RESET';
export const ACCOUNT_UPDATE_NAME_REQUEST = 'ACCOUNT_UPDATE_NAME_REQUEST';
export const ACCOUNT_UPDATE_NAME_SUCCESS = 'ACCOUNT_UPDATE_NAME_SUCCESS';
export const ACCOUNT_UPDATE_NAME_ERROR = 'ACCOUNT_UPDATE_EMAIL_RESET';
export const ACCOUNT_UPDATE_EMAIL_REQUEST = 'ACCOUNT_UPDATE_EMAIL_REQUEST';
export const ACCOUNT_UPDATE_EMAIL_SUCCESS = 'ACCOUNT_UPDATE_EMAIL_SUCCESS';
export const ACCOUNT_UPDATE_EMAIL_ERROR = 'ACCOUNT_UPDATE_EMAIL_ERROR';
export const ACCOUNT_UPDATE_PASSWORD_REQUEST = 'ACCOUNT_UPDATE_PASSWORD_REQUEST';
export const ACCOUNT_UPDATE_PASSWORD_SUCCESS = 'ACCOUNT_UPDATE_PASSWORD_SUCCESS';
export const ACCOUNT_UPDATE_PASSWORD_ERROR = 'ACCOUNT_UPDATE_PASSWORD_ERROR';
export const ACCOUNT_REAUTH_PASSWORD_ERROR = 'ACCOUNT_REAUTH_PASSWORD_ERROR';

/**
 * Update users display name
 *
 * @param name {string}
 * @returns {Function}
 */
export const updateName = name => async dispatch => {
  dispatch({ type: ACCOUNT_UPDATE_NAME_REQUEST });
  try {
    const user = await api.auth.updateProfile(name);
    dispatch({ type: ACCOUNT_UPDATE_NAME_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: ACCOUNT_UPDATE_NAME_ERROR, payload: error });
  }
};

/**
 * Set new user email
 *
 * @param email {string}
 * @param password {string}
 * @returns {Function}
 */
export const updateEmail = (email, password) => async dispatch => {
  dispatch({ type: ACCOUNT_UPDATE_EMAIL_REQUEST });
  try {
    await api.auth.reauthenticateWithPassword(password);
    const user = await api.auth.updateEmail(email);
    dispatch({ type: ACCOUNT_UPDATE_EMAIL_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: ACCOUNT_UPDATE_EMAIL_ERROR, payload: error });
  }
};

/**
 * Set new password for users signed in with email/password
 *
 * @param currentPassword {string}
 * @param newPassword {string}
 * @returns {Function}
 */
export const updatePassword = (currentPassword, newPassword) => async dispatch => {
  dispatch({ type: ACCOUNT_UPDATE_PASSWORD_REQUEST });
  try {
    await api.auth.reauthenticateWithPassword(currentPassword);
  } catch (error) {
    dispatch({ type: ACCOUNT_REAUTH_PASSWORD_ERROR, payload: error });
    return;
  }
  try {
    const user = await api.auth.updatePassword(newPassword);
    dispatch({ type: ACCOUNT_UPDATE_PASSWORD_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: ACCOUNT_UPDATE_PASSWORD_ERROR, payload: error });
  }
};

/**
 * Set new password for users signed in with Google, so they'll be able
 * to sign in with email password as well.
 *
 * @param newPassword {string}
 * @returns {Function}
 */
export const updatePasswordForGoogleSignIn = newPassword => async dispatch => {
  dispatch({ type: ACCOUNT_UPDATE_PASSWORD_REQUEST });
  try {
    await api.auth.reauthenticateWithGoogle();
    const user = await api.auth.updatePassword(newPassword);
    dispatch({ type: ACCOUNT_UPDATE_PASSWORD_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: ACCOUNT_UPDATE_PASSWORD_ERROR, payload: error });
  }
};

/**
 * Pass validation error to the state
 *
 * @param error
 * @returns {Function}
 */
export const updatePasswordError = error => dispatch => {
  dispatch({ type: ACCOUNT_UPDATE_PASSWORD_ERROR, payload: error });
};

/**
 * Reset account forms
 * @returns {Function}
 */
export const resetAccountForms = () => dispatch => {
  dispatch({ type: ACCOUNT_FORMS_RESET });
};
