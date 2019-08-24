import pick from '../utils/pick';
import { AUTH_SET_USER, AUTH_UNSET_USER } from '../actions/auth';
import {
  ACCOUNT_UPDATE_NAME_SUCCESS,
  ACCOUNT_UPDATE_EMAIL_SUCCESS,
  ACCOUNT_UPDATE_PASSWORD_SUCCESS,
  ACCOUNT_UPDATE_NAME_ERROR,
  ACCOUNT_UPDATE_EMAIL_ERROR,
  ACCOUNT_UPDATE_PASSWORD_ERROR,
  ACCOUNT_UPDATE_NAME_REQUEST,
  ACCOUNT_UPDATE_EMAIL_REQUEST,
  ACCOUNT_UPDATE_PASSWORD_REQUEST,
  ACCOUNT_REAUTH_PASSWORD_ERROR,
  ACCOUNT_UPDATE_FORM_RESET,
} from '../actions/account';

import errorCodeToState from '../utils/errorCodeToState';

/**
 * Transforms Firebase User object to plain state object.
 *
 * @param user {object} Firebase user object
 * @returns {object}
 */
const reduceUser = user => {
  const profile = pick(user, ['uid', 'displayName', 'email', 'emailVerified', 'photoURL']);
  const { providerData } = user;
  const providers = Array.isArray(providerData) ? providerData.map(p => p.providerId) : {};

  return {
    ...profile,
    providers,
  };
};

/**
 * Uses to replace authentication password error in the from
 * from 'password' field to 'confirmPassword'
 *
 * @param payload {string}
 * @returns {Object}
 */
const reduceCurrentPasswordErrors = payload => {
  const errorsObj = errorCodeToState(payload);

  if (errorsObj) {
    return Object.keys(errorsObj).reduce((obj, key) => {
      // eslint-disable-next-line no-param-reassign
      obj[key === 'password' ? 'confirmPassword' : key] = errorsObj[key];
      return obj;
    }, {});
  }

  return errorsObj;
};

const defaultState = {
  // Profile information
  uid: undefined,
  displayName: undefined,
  email: undefined,
  emailVerified: undefined,
  photoURL: undefined,
  // Contains methods user has signed in
  providers: undefined,

  // Account forms states
  errors: undefined,
  isSubmitting: false,
  isSuccess: false,
};

export default function account(state = defaultState, action) {
  switch (action.type) {
    case AUTH_SET_USER:
      return {
        ...state,
        ...reduceUser(action.payload),
      };
    case AUTH_UNSET_USER:
      return {
        ...defaultState,
      };

    case ACCOUNT_UPDATE_NAME_REQUEST:
    case ACCOUNT_UPDATE_EMAIL_REQUEST:
    case ACCOUNT_UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: defaultState.errors,
      };
    case ACCOUNT_UPDATE_NAME_SUCCESS:
    case ACCOUNT_UPDATE_EMAIL_SUCCESS:
    case ACCOUNT_UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        ...reduceUser(action.payload),
        errors: undefined,
        isSubmitting: false,
        isSuccess: true,
      };
    case ACCOUNT_UPDATE_NAME_ERROR:
    case ACCOUNT_UPDATE_EMAIL_ERROR:
    case ACCOUNT_UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        errors: errorCodeToState(action.payload),
        isSubmitting: false,
        isSuccess: false,
      };
    case ACCOUNT_REAUTH_PASSWORD_ERROR:
      return {
        ...state,
        errors: reduceCurrentPasswordErrors(action.payload),
        isSubmitting: false,
        isSuccess: false,
      };
    case ACCOUNT_UPDATE_FORM_RESET:
      return {
        ...state,
        errors: undefined,
        isSuccess: false,
        isSubmitting: false,
      };

    default:
      return state;
  }
}
