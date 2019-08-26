import { AUTH_SET_USER, AUTH_UNSET_USER } from '../actions/auth';

const defaultState = {
  isReady: false,
};

const app = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_SET_USER:
    case AUTH_UNSET_USER:
      return {
        ...state,
        isReady: true,
      };
    default:
      return state;
  }
};

export default app;
