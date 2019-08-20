export const APP_SET_BASE_URL = 'APP_SET_BASE_URL';
export const MODAL_SHARE_TOGGLE = 'MODAL_SHARE_TOGGLE';

export const setBaseUrl = url => ({
  type: APP_SET_BASE_URL,
  payload: url,
});

export const toggleShareModal = flag => ({
  type: MODAL_SHARE_TOGGLE,
  payload: flag,
});
