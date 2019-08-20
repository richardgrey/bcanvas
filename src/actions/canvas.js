import api from '../api';
import history from '../history';

export const CANVAS_LIST_FETCH_REQUEST = 'CANVAS_LIST_FETCH_REQUEST';
export const CANVAS_LIST_FETCH_SUCCESS = 'CANVAS_LIST_FETCH_SUCCESS';
export const CANVAS_LIST_FETCH_ERROR = 'CANVAS_LIST_FETCH_ERROR';
export const CANVAS_FETCH_REQUEST = 'CANVAS_FETCH_REQUEST';
export const CANVAS_FETCH_SUCCESS = 'CANVAS_FETCH_SUCCESS';
export const CANVAS_FETCH_ERROR = 'CANVAS_FETCH_ERROR';
export const CANVAS_CREATE_REQUEST = 'CANVAS_CREATE_REQUEST';
export const CANVAS_CREATE_SUCCESS = 'CANVAS_CREATE_SUCCESS';
export const CANVAS_CREATE_ERROR = 'CANVAS_CREATE_ERROR';
export const CANVAS_UPDATE_TITLE_REQUEST = 'CANVAS_UPDATE_TITLE_REQUEST';
export const CANVAS_UPDATE_TITLE_SUCCESS = 'CANVAS_UPDATE_TITLE_SUCCESS';
export const CANVAS_UPDATE_TITLE_ERROR = 'CANVAS_UPDATE_TITLE_ERROR';
export const CANVAS_REMOVE_REQUEST = 'CANVAS_REMOVE_REQUEST';
export const CANVAS_REMOVE_SUCCESS = 'CANVAS_REMOVE_SUCCESS';
export const CANVAS_REMOVE_ERROR = 'CANVAS_REMOVE_ERROR';
export const CANVAS_ENTRIES_FETCH_REQUEST = 'CANVAS_ENTRIES_FETCH_REQUEST';
export const CANVAS_ENTRIES_FETCH_SUCCESS = 'CANVAS_ENTRIES_FETCH_SUCCESS';
export const CANVAS_ENTRIES_FETCH_ERROR = 'CANVAS_ENTRIES_FETCH_ERROR';
export const CANVAS_SHARING_REQUEST = 'CANVAS_SHARING_REQUEST';
export const CANVAS_SHARING_SUCCESS = 'CANVAS_SHARING_SUCCESS';
export const CANVAS_SHARING_ERROR = 'CANVAS_SHARING_ERROR';

export const CANVAS_UNLOAD = 'CANVAS_UNLOAD';
export const CANVAS_SET_SHARE_URL = 'CANVAS_SET_SHARE_URL';

/**
 * Check if current users is owner of the canvas
 *
 * @param cnvs {object}
 * @param cnvs.ownerID {uid}
 * @param user {object}
 * @param user.uid {uid}
 * @returns {boolean}
 */
function isCanvasOwner(cnvs, user) {
  return user.uid && user.uid === cnvs.ownerId;
}

/**
 * Returns sharable link for canvas
 *
 * @param cnvs {object}
 * @param cnvs.id {uid}
 * @param baseUrl {URL}
 * @returns {string}
 */
function canvasShareUrl(cnvs, baseUrl) {
  return `${baseUrl}/canvas/${cnvs.id}`;
}

/**
 * Load canvases available for current user
 *
 * @returns {Function}
 */
export const fetchCanvasList = () => async (dispatch, getState) => {
  const { app, account, canvasList } = getState();

  // Don't make another request if it's already loading
  if (canvasList.isFetching) {
    return;
  }

  dispatch({ type: CANVAS_LIST_FETCH_REQUEST });
  try {
    const canvases = await api.canvas.list();

    // Extends canvas info width generic data
    dispatch({
      type: CANVAS_LIST_FETCH_SUCCESS,
      payload: canvases.map(cnvs => ({
        ...cnvs,
        isOwner: isCanvasOwner(cnvs, account),
        shareUrl: canvasShareUrl(cnvs, app.baseUrl),
      })),
    });
  } catch (error) {
    dispatch({
      type: CANVAS_LIST_FETCH_ERROR,
      payload: { error },
    });
  }
};

/**
 * Get a full object of canvas with entries
 *
 * @param canvasId {uid}
 * @returns {Function}
 */
export const fetchCanvasWithEntries = canvasId => async (dispatch, getState) => {
  const { app, account } = getState();

  dispatch({
    type: CANVAS_FETCH_REQUEST,
    payload: { canvasId },
  });

  try {
    const canvas = await api.canvas.get(canvasId);
    const entries = await api.canvas.entries(canvasId);

    const payload = {
      ...canvas,
      entries,
      isOwner: isCanvasOwner(canvas, account),
      shareUrl: canvasShareUrl(canvas, app.baseUrl),
    };

    dispatch({
      type: CANVAS_FETCH_SUCCESS,
      payload,
    });
  } catch (error) {
    dispatch({
      type: CANVAS_FETCH_ERROR,
      payload: { canvasId, error },
    });
  }
};

/**
 * Get Entries of canvas with provided ID
 *
 * @param canvasId {uid}
 * @returns {Function}
 */
export const fetchCanvasEntries = canvasId => async dispatch => {
  dispatch({
    type: CANVAS_ENTRIES_FETCH_REQUEST,
    payload: { canvasId },
  });
  try {
    const entries = await api.canvas.entries(canvasId);
    dispatch({
      type: CANVAS_ENTRIES_FETCH_SUCCESS,
      payload: entries,
    });
  } catch (error) {
    dispatch({
      type: CANVAS_ENTRIES_FETCH_ERROR,
      payload: { canvasId, error },
    });
  }
};

export const createCanvas = (data = {}) => async (dispatch, getState) => {
  const { app } = getState();

  dispatch({
    type: CANVAS_CREATE_REQUEST,
    payload: { data },
  });
  try {
    const canvasId = await api.canvas.create(data);
    const canvas = await api.canvas.get(canvasId);

    dispatch({
      type: CANVAS_CREATE_SUCCESS,
      payload: {
        ...canvas,
        isOwner: true,
        shareUrl: canvasShareUrl(canvas, app.baseUrl),
      },
    });
    // Go to newly created canvas
    history.push(`/canvas/${canvasId}`);
    // Fetch updated list of canvases
    dispatch(fetchCanvasList());
  } catch (error) {
    dispatch({
      type: CANVAS_CREATE_ERROR,
      payload: { error },
    });
  }
};

/**
 * Change title of the canvas with provided ID.
 *
 * @param canvasId {uid}
 * @param title {string}
 * @returns {Function}
 */
export const updateCanvasTitle = (canvasId, title) => async dispatch => {
  dispatch({
    type: CANVAS_UPDATE_TITLE_REQUEST,
    payload: { canvasId, title },
  });
  try {
    await api.canvas.update(canvasId, { title });
    dispatch({
      type: CANVAS_UPDATE_TITLE_SUCCESS,
      payload: { canvasId, title },
    });
  } catch (error) {
    dispatch({
      type: CANVAS_UPDATE_TITLE_ERROR,
      payload: { canvasId, error },
    });
  }
};

export const removeCanvas = canvasId => async dispatch => {
  dispatch({
    type: CANVAS_REMOVE_REQUEST,
    payload: { canvasId },
  });
  try {
    await api.canvas.remove(canvasId);
    dispatch({
      type: CANVAS_REMOVE_SUCCESS,
      payload: { canvasId },
    });
  } catch (error) {
    dispatch({
      type: CANVAS_REMOVE_ERROR,
      payload: { canvasId, error },
    });
  }
};

export const saveSharingSettings = (canvasId, opts = {}) => async dispatch => {
  dispatch({
    type: CANVAS_SHARING_REQUEST,
    payload: { canvasId, opts },
  });
  try {
    const options = {
      isPublic: opts.isPublic,
    };
    await api.canvas.update(canvasId, options);
    dispatch({
      type: CANVAS_SHARING_SUCCESS,
      payload: { canvasId, options },
    });
  } catch (error) {
    dispatch({
      type: CANVAS_SHARING_ERROR,
      payload: { canvasId, error },
    });
  }
};

export const unloadCanvas = () => ({
  type: CANVAS_UNLOAD,
});

export const setShareUrl = url => ({
  type: CANVAS_SET_SHARE_URL,
  payload: url,
});
