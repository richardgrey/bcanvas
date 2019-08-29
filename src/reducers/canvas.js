import pick from '../utils/pick';
import { CANVAS_PERMISSION_DENIED } from '../constants';
import {
  CANVAS_UNLOAD,
  CANVAS_FETCH_REQUEST,
  CANVAS_FETCH_SUCCESS,
  CANVAS_FETCH_ERROR,
  CANVAS_SHARING_SUCCESS,
  CANVAS_REMOVE_SUCCESS,
  CANVAS_UPDATE_TITLE_SUCCESS,
  CANVAS_CREATE_REQUEST, CANVAS_CREATE_SUCCESS,
} from '../actions/canvas';
import {
  ENTRY_ADD_REQUEST,
  ENTRY_ADD_ERROR,
  ENTRY_UPDATE_SUCCESS,
  ENTRY_UPDATE_ERROR,
  ENTRY_REMOVE_REQUEST,
  ENTRY_REMOVE_SUCCESS,
  ENTRY_REMOVE_ERROR,
} from '../actions/entry';
import { AUTH_UNSET_USER } from '../actions/auth';

/**
 * Returns set of permissions of canvas for provided user ID
 *
 * @param data {object}
 * @param data.ownerId {string}
 * @param data.isPublic {string}
 * @param userId {string}
 * @returns {object}
 */
const canvasPermissions = (data, userId) => {
  const isOwner = data.ownerId === userId;
  const canView = isOwner || data.isPublic || false;
  const canEdit = isOwner;

  return { isOwner, canView, canEdit };
};

/**
 * @public
 * Converts API canvas data object to the state object.
 * NOTE: this method although used in reducers/canvasList.
 *
 * @param data {object}
 * @param userId {string}
 * @returns {object}
 */
export const reduceCanvasData = (data, userId) => {
  const picked = pick(data, [
    'id',
    'type',
    'slug',
    'title',
    'entries',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'ownerId',
    'isPublic',
  ]);

  return Object.assign({ ...canvasPermissions(data, userId) }, picked);
};

/**
 * Add new entry to the state.
 *
 * @param state {object}
 * @param payload {object}
 * @param payload.canvasId {string}
 * @param payload.entryId {string}
 * @param payload.label {string}
 * @param payload.value {string}
 * @returns {object}
 */
const addEntryReducer = (state, payload) => {
  const { canvasId, entryId, label, value } = payload;
  const { entries = {} } = state;

  if (state.id === canvasId) {
    return {
      ...state,
      entries: {
        ...entries,
        [entryId]: { label, value },
      },
    };
  }

  return state;
};

/**
 * Mark entry as with error
 *
 * @param state {object}
 * @param payload {object}
 * @param payload.canvasId {string}
 * @param payload.entryId {string}
 * @returns {object}
 */
const entryUpdateErrorReducer = (state, payload) => {
  const { canvasId, entryId } = payload;
  const { entries = {} } = state;

  if (state.id === canvasId) {
    const entry = entries[entryId];
    return {
      ...state,
      entries: {
        ...entries,
        [entryId]: Object.assign({ isError: true }, entry),
      },
    };
  }

  return state;
};

/**
 * Update entry in canvas state
 *
 * @param state {object}
 * @param state.entries {object}
 * @param payload {object}
 * @param payload.canvasId {string}
 * @param payload.entryId {string}
 * @param payload.value {string}
 * @returns {object}
 */
const updateEntryReducer = (state, payload) => {
  const { canvasId, entryId, value } = payload;
  const { entries = {} } = state;

  if (state.id === canvasId) {
    return {
      ...state,
      entries: {
        ...entries,
        [entryId]: Object.assign({ value }, entries[entryId]),
      },
    };
  }

  return state;
};

/**
 * Marks entry with provided ID as hidden.
 *
 * @param state {object}
 * @param state.entries {object}
 * @param payload {object}
 * @param payload.canvasId {string}
 * @param payload.entryId {string}
 * @param flag {boolean}
 * @returns {object}
 */
const toggleEntryHidden = (state, payload, flag) => {
  const { canvasId, entryId } = payload;
  const { entries = {} } = state;

  if (state.id === canvasId) {
    const togglingEntry = entries[entryId];
    return {
      ...state,
      entries: {
        ...entries,
        [entryId]: Object.assign({ isHidden: flag }, togglingEntry),
      },
    };
  }

  return state;
};

/**
 * Removes entry with given ID from the state
 *
 * @param state {object}
 * @param payload {object}
 * @param payload.canvasId {string}
 * @param payload.entryId {string}
 * @returns {object}
 */
const removeEntryReducer = (state, payload) => {
  const { canvasId, entryId } = payload;
  const { entries = {} } = state;

  if (state.id === canvasId) {
    const updatedEntries = Object.keys(entries)
      .filter(key => key !== entryId)
      .reduce((obj, key) => {
        obj[key] = entries[key];
        return obj;
      }, {});

    return {
      ...state,
      entries: updatedEntries,
    };
  }

  return state;
};

/**
 * Change sharing setting of the canvas
 *
 * @param state {object}
 * @param payload {object}
 * @param payload.canvasId {string}
 * @param payload.options {object}
 * @param payload.options.isPublic {boolean}
 * @returns {object}
 */
const updateSharingReducer = (state, payload) => {
  const { canvasId, options } = payload;

  if (state.id === canvasId) {
    return {
      ...state,
      isPublic: options.isPublic,
    };
  }

  return state;
};

/**
 * Default state
 *
 * @type {object}
 */
const defaultState = {
  // Flag
  isFetching: false,
  // When new canvas is in process of creation will contain its ID or False
  // See action.canvas.createCanvas to go dipper in the process
  isCreating: false,

  // From API
  id: undefined,
  slug: undefined,
  type: undefined,
  title: undefined,
  entries: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  deletedAt: undefined,
  ownerId: undefined,
  isPublic: undefined,

  // Generic properties
  isOwner: undefined,
  canView: undefined,
  canEdit: undefined,
};

/**
 * Canvas reducer
 *
 * @param state {object}
 * @param action {object}
 * @param action.action {string}
 * @param action.payload {*}
 * @returns {object}
 */
const canvas = (state = defaultState, action) => {
  switch (action.type) {
    case CANVAS_UNLOAD:
      return defaultState;
    case CANVAS_CREATE_REQUEST:
      return {
        ...state,
        isCreating: action.payload.canvas.id,
      };
    case CANVAS_CREATE_SUCCESS:
      return {
        ...state,
        isCreating: action.payload.canvas.id === state.isCreating ? false : state.isCreating,
      };
    case CANVAS_FETCH_REQUEST:
      return {
        ...defaultState,
        isFetching: true,
      };
    case CANVAS_FETCH_ERROR:
      if (action.payload.error === CANVAS_PERMISSION_DENIED) {
        return {
          ...defaultState,
          isFetching: false,
          canView: false,
        };
      }
      return {
        ...state,
        isFetching: false,
      };
    case CANVAS_FETCH_SUCCESS:
      return {
        ...state,
        ...reduceCanvasData(action.payload, action.payload.currentUserId),
        isFetching: false,
        lastFetch: Date.now(),
      };
    case CANVAS_REMOVE_SUCCESS:
      if (state.id === action.payload.canvasId) {
        return {
          ...defaultState,
        };
      }
      return state;
    case CANVAS_UPDATE_TITLE_SUCCESS:
      if (state.id === action.payload.canvasId) {
        return {
          ...state,
          title: action.payload.title,
        };
      }
      return state;
    case ENTRY_ADD_REQUEST:
      return {
        ...state,
        ...addEntryReducer(state, action.payload),
      };
    case ENTRY_ADD_ERROR:
      return {
        ...state,
        ...entryUpdateErrorReducer(state, action.payload),
      };
    case ENTRY_UPDATE_SUCCESS:
      return {
        ...state,
        ...updateEntryReducer(state, action.payload),
      };
    case ENTRY_UPDATE_ERROR:
      return {
        ...state,
        ...entryUpdateErrorReducer(state, action.payload),
      };
    case ENTRY_REMOVE_REQUEST:
      return {
        ...state,
        ...toggleEntryHidden(state, action.payload, true),
      };
    case ENTRY_REMOVE_ERROR:
      return {
        ...state,
        ...toggleEntryHidden(state, action.payload, false),
      };
    case ENTRY_REMOVE_SUCCESS:
      return {
        ...state,
        ...removeEntryReducer(state, action.payload),
      };
    case CANVAS_SHARING_SUCCESS:
      return updateSharingReducer(state, action.payload);
    case AUTH_UNSET_USER:
      if (state.id) {
        return {
          ...state,
          ...canvasPermissions(state, null),
        };
      }
      return defaultState;
    default:
      return state;
  }
};

export default canvas;
