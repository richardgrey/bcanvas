import errorCodeToState from '../utils/errorCodeToState';
import {
  AUTH_SET_USER,
  AUTH_UNSET_USER,
  AUTH_RESET_FORMS,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_ERROR,
  AUTH_PASSWORD_RESET_EMAIL_REQUEST,
  AUTH_PASSWORD_RESET_EMAIL_SUCCESS,
  AUTH_PASSWORD_RESET_EMAIL_ERROR,
  AUTH_PASSWORD_CODE_VALIDATION_SUCCESS,
  AUTH_PASSWORD_CODE_VALIDATION_ERROR,
  AUTH_RESET_PASSWORD_ERROR,
  AUTH_PASSWORD_CONFIRM_REQUEST,
  AUTH_PASSWORD_CONFIRM_SUCCESS,
  AUTH_PASSWORD_CONFIRM_ERROR,
} from '../actions/auth';
import { ERROR_AUTH_USER_NOT_FOUND } from '../constants';

// Default state
const defaultState = {
  isAuthenticated: false,
  isValidVerificationCode: undefined,
  isSubmitting: undefined,
  errors: undefined,
};

export default function auth(state = defaultState, action) {
  switch (action.type) {
    case AUTH_SET_USER:
      return {
        ...state,
        isAuthenticated: true,
      };
    case AUTH_UNSET_USER:
      return {
        ...state,
        isAuthenticated: false,
      };
    case AUTH_RESET_FORMS:
      return {
        ...state,
        isSubmitting: false,
        isSuccess: false,
        isValidVerificationCode: undefined,
        errors: undefined,
      };
    case AUTH_LOGIN_REQUEST:
    case AUTH_REGISTER_REQUEST:
    case AUTH_PASSWORD_RESET_EMAIL_REQUEST:
    case AUTH_PASSWORD_CONFIRM_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        isSuccess: false,
        errors: undefined,
      };
    case AUTH_LOGIN_SUCCESS:
    case AUTH_REGISTER_SUCCESS:
    case AUTH_PASSWORD_RESET_EMAIL_SUCCESS:
    case AUTH_PASSWORD_CONFIRM_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        isSuccess: true,
        errors: undefined,
      };
    case AUTH_REGISTER_ERROR:
    case AUTH_LOGIN_ERROR:
    case AUTH_RESET_PASSWORD_ERROR:
    case AUTH_PASSWORD_CONFIRM_ERROR:
      return {
        ...state,
        isSubmitting: false,
        errors: errorCodeToState(action.payload),
      };
    case AUTH_PASSWORD_RESET_EMAIL_ERROR:
      if (action.payload === ERROR_AUTH_USER_NOT_FOUND) {
        // If user was not found imitate success to avoid accounts parsing.
        return {
          ...state,
          isSubmitting: false,
          isSuccess: true,
          errors: undefined,
        };
      }
      return {
        ...state,
        isSubmitting: false,
        errors: errorCodeToState(action.payload, 'recovery'),
      };
    case AUTH_PASSWORD_CODE_VALIDATION_SUCCESS:
      return {
        ...state,
        isValidVerificationCode: true,
      };
    case AUTH_PASSWORD_CODE_VALIDATION_ERROR:
      return {
        ...state,
        isValidVerificationCode: false,
      };
    default:
      return state;
  }
}
