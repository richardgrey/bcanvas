import errorCodeToState from '../utils/errorCodeToState';
import {
  AUTH_SET_USER,
  AUTH_REGISTER_ERROR,
  AUTH_LOGIN_ERROR,
  AUTH_UNSET_USER,
  AUTH_LOGIN_REQUEST,
  AUTH_REGISTER_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_REGISTER_SUCCESS,
  AUTH_RESET_FORM,
} from '../actions/auth';

// Default state
const defaultState = {
  isAuthenticated: false,
  isSubmitting: undefined,
  errorRegister: undefined,
  errorLogin: undefined,
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
    case AUTH_LOGIN_REQUEST:
    case AUTH_REGISTER_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errorRegister: undefined,
        errorLogin: undefined,
      };
    case AUTH_LOGIN_SUCCESS:
    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        errorRegister: undefined,
        errorLogin: undefined,
      };
    case AUTH_REGISTER_ERROR:
      return {
        ...state,
        isSubmitting: false,
        errorRegister: errorCodeToState(action.payload),
      };
    case AUTH_LOGIN_ERROR:
      return {
        ...state,
        isSubmitting: false,
        errorLogin: errorCodeToState(action.payload),
      };
    case AUTH_RESET_FORM:
      return {
        ...state,
        isSubmitting: false,
        errorRegister: undefined,
        errorLogin: undefined,
      };
    default:
      return state;
  }
}
