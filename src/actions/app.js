export const APP_SET_BASE_URL = 'APP_SET_BASE_URL';

export const setBaseUrl = url => ({
  type: APP_SET_BASE_URL,
  payload: url,
});
