import {
  CANVAS_LIST_FETCH_REQUEST,
  CANVAS_LIST_FETCH_SUCCESS,
  CANVAS_CREATE_SUCCESS,
  CANVAS_REMOVE_SUCCESS,
  CANVAS_UPDATE_TITLE_SUCCESS,
} from '../actions/canvas';
import { AUTH_UNSET_USER } from '../actions/auth';
import { reduceCanvasData } from './canvas';

/**
 * Add new canvas to the list
 * @param state {object}
 * @param canvas {object}
 * @param currentUserId {string}
 * @returns {object}
 */
function addCanvasToList(state, canvas, currentUserId) {
  const canvases = state.canvases.slice(0);
  canvases.push(reduceCanvasData(canvas, currentUserId));

  return {
    ...state,
    canvases,
  };
}

/**
 * Remove given canvas from the list
 * @param state {object}
 * @param canvasId {string}
 * @returns {object}
 */
function removeCanvasFromList(state, { canvasId }) {
  const { canvases } = state;

  return {
    ...state,
    canvases: canvases.slice(0).filter(canvas => canvas.id !== canvasId),
  };
}

/**
 * Updates given canvas title in the list
 * @param state {state}
 * @param canvasId {string}
 * @param title {string}
 * @returns {Object}
 */
function updateCanvasTitleInList(state, { canvasId, title }) {
  const { canvases } = state;

  return {
    ...state,
    canvases: canvases.map(canvas => {
      if (canvas.id === canvasId) {
        return {
          ...canvas,
          title,
        };
      }
      return canvas;
    }),
  };
}

/**
 * Default state
 *
 * @type {Object}
 */
const defaultState = {
  isFetching: false,
  isLoaded: false,
  canvases: [],
};

/**
 * Canvas list reducer
 *
 * @param state {object}
 * @param action {object}
 * @param action.action {string}
 * @param action.payload {*}
 * @returns {object}
 */
const canvasList = (state = defaultState, action) => {
  switch (action.type) {
    case CANVAS_LIST_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case CANVAS_LIST_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        canvases: action.payload.canvases.map(c =>
          reduceCanvasData(c, action.payload.currentUserId),
        ),
      };
    // case CANVAS_CREATE_SUCCESS:
    //   return addCanvasToList(state, action.payload.canvas, action.payload.currentUserId);
    case CANVAS_REMOVE_SUCCESS:
      return removeCanvasFromList(state, action.payload);
    case CANVAS_UPDATE_TITLE_SUCCESS:
      return updateCanvasTitleInList(state, action.payload);
    case AUTH_UNSET_USER:
      return defaultState;
    default:
      return state;
  }
};

export default canvasList;
