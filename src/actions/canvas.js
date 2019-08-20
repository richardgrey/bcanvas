import api from '../api';
import history from '../history';

export const CANVAS_LIST_FETCH_REQUEST = 'CANVAS_LIST_FETCH_REQUEST';
export const CANVAS_LIST_FETCH_SUCCESS = 'CANVAS_LIST_FETCH_SUCCESS';
export const CANVAS_LIST_FETCH_ERROR = 'CANVAS_LIST_FETCH_ERROR';

/**
 * Load canvases available for current user
 *
 * @returns {Function}
 */
export const fetchCanvasList = () => async (dispatch, getState) => {
  const { canvasList } = getState();

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
      payload: canvases,
    });
  } catch (error) {
    dispatch({
      type: CANVAS_LIST_FETCH_ERROR,
      payload: { error },
    });
  }
};

// ---

export const CANVAS_FETCH_REQUEST = 'CANVAS_FETCH_REQUEST';
export const CANVAS_FETCH_SUCCESS = 'CANVAS_FETCH_SUCCESS';
export const CANVAS_FETCH_ERROR = 'CANVAS_FETCH_ERROR';

/**
 * Get a full object of canvas with entries
 *
 * @param canvasId {uid}
 * @returns {Function}
 */
export const fetchCanvas = canvasId => async dispatch => {
  dispatch({
    type: CANVAS_FETCH_REQUEST,
    payload: { canvasId },
  });

  try {
    const canvas = await api.canvas.get(canvasId);
    dispatch({
      type: CANVAS_FETCH_SUCCESS,
      payload: canvas,
    });
  } catch (error) {
    dispatch({
      type: CANVAS_FETCH_ERROR,
      payload: { canvasId, error },
    });
  }
};

// ---

export const CANVAS_CREATE_REQUEST = 'CANVAS_CREATE_REQUEST';
export const CANVAS_CREATE_SUCCESS = 'CANVAS_CREATE_SUCCESS';
export const CANVAS_CREATE_ERROR = 'CANVAS_CREATE_ERROR';

/**
 * Creates new canvas with given type and title
 * @param data
 * @returns {Function}
 */
export const createCanvas = (data = {}) => async dispatch => {
  dispatch({
    type: CANVAS_CREATE_REQUEST,
    payload: { data },
  });
  try {
    const canvasId = await api.canvas.create(data);
    const canvas = await api.canvas.get(canvasId);

    dispatch({
      type: CANVAS_CREATE_SUCCESS,
      payload: canvas,
    });
    // Go to newly created canvas
    history.push(`/canvas/${canvasId}`);
    // Fetch updated list of canvases
    // dispatch(fetchCanvasList());
  } catch (error) {
    dispatch({
      type: CANVAS_CREATE_ERROR,
      payload: { error },
    });
  }
};

// ---

export const CANVAS_UPDATE_TITLE_REQUEST = 'CANVAS_UPDATE_TITLE_REQUEST';
export const CANVAS_UPDATE_TITLE_SUCCESS = 'CANVAS_UPDATE_TITLE_SUCCESS';
export const CANVAS_UPDATE_TITLE_ERROR = 'CANVAS_UPDATE_TITLE_ERROR';

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

// ---

export const CANVAS_REMOVE_REQUEST = 'CANVAS_REMOVE_REQUEST';
export const CANVAS_REMOVE_SUCCESS = 'CANVAS_REMOVE_SUCCESS';
export const CANVAS_REMOVE_ERROR = 'CANVAS_REMOVE_ERROR';

/**
 * Mark canvas with given ID as removed
 *
 * @param canvasId {string}
 * @returns {Function}
 */
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

// ---

export const CANVAS_SHARING_REQUEST = 'CANVAS_SHARING_REQUEST';
export const CANVAS_SHARING_SUCCESS = 'CANVAS_SHARING_SUCCESS';
export const CANVAS_SHARING_ERROR = 'CANVAS_SHARING_ERROR';

/**
 * Change Sharing settings of the canvas with given ID
 *
 * @param canvasId {string}
 * @param opts {object}
 * @param opts.isPublic {boolean}
 * @returns {Function}
 */
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

// ---

export const CANVAS_UNLOAD = 'CANVAS_UNLOAD';

/**
 * Clear canvas state
 *
 * @returns {{type: string}}
 */
export const unloadCanvas = () => ({
  type: CANVAS_UNLOAD,
});

// ---

export const CANVAS_SET_SHARE_URL = 'CANVAS_SET_SHARE_URL';

/**
 * Set sharing URL in state
 *
 * @param url
 * @returns {{payload: string, type: string}}
 */
export const setShareUrl = url => ({
  type: CANVAS_SET_SHARE_URL,
  payload: url,
});

// ---

export const CANVAS_SET_PRELOADED_CANVAS = 'CANVAS_SET_PRELOADED_CANVAS';

export const setPreloadedCanvas = canvas => ({
  type: CANVAS_SET_PRELOADED_CANVAS,
  payload: canvas,
});
