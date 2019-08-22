import { APP_SET_BASE_URL } from '../actions/app';
import { AUTH_SET_USER, AUTH_UNSET_USER } from '../actions/auth';

const defaultState = {
  baseUrl: '',
  isReady: false,
  isSidebarOpened: false,
  isAuthModalOpened: false,
  isUserModalOpened: false,
  isShareModalOpened: false,
};

const app = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_SET_USER:
    case AUTH_UNSET_USER:
      return {
        ...state,
        isReady: true,
      };
    case APP_SET_BASE_URL:
      return {
        ...state,
        baseUrl: action.payload,
      };
    default:
      return state;
  }
};

export default app;
