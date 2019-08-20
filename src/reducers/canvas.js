import {
  CANVAS_UNLOAD,
  CANVAS_FETCH_REQUEST,
  CANVAS_FETCH_SUCCESS,
  CANVAS_SET_SHARE_URL,
  CANVAS_SHARING_SUCCESS,
  CANVAS_FETCH_ERROR,
  CANVAS_REMOVE_SUCCESS,
} from '../actions/canvas';
import {
  ENTRY_ADD_REQUEST,
  ENTRY_ADD_SUCCESS,
  ENTRY_ADD_ERROR,
  ENTRY_UPDATE_SUCCESS,
  ENTRY_REMOVE_REQUEST,
  ENTRY_REMOVE_SUCCESS,
  ENTRY_REMOVE_ERROR,
} from '../actions/entry';
import { AUTH_SET_USER, AUTH_UNSET_USER } from '../actions/auth';
import { CANVAS_PERMISSION_DENIED } from '../constants';
import schemas from '../constants/schemas';

// Default store state
const defaultState = {
  isFetching: false,
  data: null,
  // The URL for sharing
  shareUrl: '',
  // The flag showing that access to canvas is restricted to current user
  isPermissionDenied: false,
};

/**
 * Transform canvas entries into an schema object
 *
 * @param canvas
 * @returns {{} & {entries}}
 */
function canvasReducer(canvas) {
  const { schema } = schemas[canvas.type];
  // Create array for each column in schema
  const columns = schema.reduce(
    (obj, col) => Object.assign({ [col.label]: [] }, obj),
    {},
  );

  // Go through entries in canvas and put it in right column
  canvas.entries.forEach(entry => {
    if (entry.label in columns) {
      columns[entry.label].push(entry);
    }
  });

  return {
    ...canvas,
    entries: columns,
  };
}

/**
 * Updates entry value in the state
 * @param state
 * @param payload
 * @returns {*}
 */
function entryUpdateReducer(state, payload) {
  const { data } = state;
  const { canvasId, entry = {} } = payload;
  const { label } = entry;

  // Check canvas data still exists and it's same canvas
  if (!data || data.id !== canvasId || !(label in data.entries)) {
    return state;
  }

  const column = data.entries[label].map(ent => {
    if (ent.id === entry.id) {
      return Object.assign({}, ent, entry);
    }
    return ent;
  });

  // Because each nested object in the state should be copied.
  // See: https://redux.js.org/recipes/structuringreducers/immutableupdatepatterns#common-mistake-2-only-making-a-shallow-copy-of-one-level
  return {
    ...state,
    data: {
      ...data,
      entries: {
        ...data.entries,
        [label]: column,
      },
    },
  };
}

function addEntryOptimistically(state, payload) {
  const { data } = state;
  const { canvasId, entry = {} } = payload;
  const { label } = entry;

  // Check canvas data still exists and it's same canvas
  if (!data || data.id !== canvasId || !(label in data.entries)) {
    return state;
  }

  const column = data.entries[label].slice(0);
  column.push({
    ...entry,
    isOptimistic: true,
  });

  return {
    ...state,
    data: {
      ...data,
      entries: {
        ...data.entries,
        [label]: column,
      },
    },
  };
}

function addEntryReducer(state, payload) {
  const { data } = state;
  const { canvasId, entry = {}, entryOptimisticId } = payload;
  const { label } = entry;

  // Check canvas data still exists and it's same canvas
  if (!data || data.id !== canvasId || !(label in data.entries)) {
    return state;
  }

  const column = data.entries[label].map(ent => {
    if (ent.id === entryOptimisticId) {
      return entry;
    }
    return ent;
  });

  return {
    ...state,
    data: {
      ...data,
      entries: {
        ...data.entries,
        [label]: column,
      },
    },
  };
}

function addEntryError(state, payload) {
  const { data } = state;
  const { canvasId, entry = {}, entryOptimisticId } = payload;
  const { label } = entry;

  // Check canvas data still exists and it's same canvas
  if (!data || data.id !== canvasId || !(label in data.entries)) {
    return state;
  }

  const column = data.entries[label].filter(ent => ent.id !== entryOptimisticId);

  return {
    ...state,
    canvas: {
      ...data,
      entries: {
        ...data.entries,
        [label]: column,
      },
    },
  };
}

function entryRemoveOptimistically(state, payload) {
  const { data } = state;
  const { canvasId, entryId } = payload;
  const entries = {};

  // Check canvas data still exists and it's same canvas
  if (!data || data.id !== canvasId) {
    return state;
  }

  // Make new entries object where deleted entry is marked as hidden
  Object.keys(data.entries).forEach(label => {
    entries[label] = data.entries[label].map(entry => {
      if (entry.id === entryId) {
        return {
          ...entry,
          isHidden: true,
        };
      }
      return entry;
    });
  });

  return {
    ...state,
    data: {
      ...data,
      entries,
    },
  };
}

function entryRemoveReducer(state, payload) {
  const { data } = state;
  const { canvasId, entryId } = payload;
  const entries = {};

  // Check canvas data still exists and it's same canvas
  if (!data || data.id !== canvasId) {
    return state;
  }

  Object.keys(data.entries).forEach(label => {
    entries[label] = data.entries[label].filter(entry => entry.id !== entryId);
  });

  return {
    ...state,
    data: {
      ...data,
      entries,
    },
  };
}

function entryRemoveError(state, payload) {
  const { data } = state;
  const { canvasId, entryId } = payload;
  const entries = {};

  if (!data || data.id !== canvasId) {
    return state;
  }

  // In case of error during entry deletion just rollback hidden status
  Object.keys(data.entries).forEach(label => {
    entries[label] = data.entries[label].map(entry => {
      if (entry.id === entryId) {
        return {
          ...entry,
          isHidden: false,
        };
      }
      return entry;
    });
  });

  return {
    ...state,
    data: {
      ...data,
      entries,
    },
  };
}

function sharingSettingsUpdateReduce(state, { canvasId, options = {} }) {
  const { data } = state;

  if (!data || data.id !== canvasId) {
    return state;
  }

  return {
    ...state,
    data: {
      ...data,
      ...options,
    },
  };
}

function reduceCanvasOnSignOut(state) {
  const { data } = state;
  // Canvas loaded and not public, clear data and set restriction flag
  if (data && !data.isPublic) {
    return {
      ...defaultState,
      isPermissionDenied: true,
    };
  }

  // Canvas is loaded and public, change ownership status only
  if (data) {
    return {
      ...state,
      data: {
        ...data,
        isOwner: false,
      },
    };
  }

  return state;
}

function reduceCanvasOnLogIn(state, { uid }) {
  const { data } = state;

  // Change ownership status if logged in user is owner
  if (data && data.ownerId === uid) {
    return {
      ...state,
      data: {
        ...data,
        isOwner: true,
      },
    };
  }

  return state;
}

const canvas = (state = defaultState, action) => {
  switch (action.type) {
    case CANVAS_UNLOAD:
      return defaultState;
    case CANVAS_FETCH_REQUEST:
      return {
        ...state,
        isPermissionDenied: false,
        isFetching: true,
      };
    case CANVAS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isPermissionDenied: false,
        data: canvasReducer(action.payload),
      };
    case CANVAS_FETCH_ERROR:
      if (action.payload.error === CANVAS_PERMISSION_DENIED) {
        return {
          ...state,
          isFetching: false,
          isPermissionDenied: true,
          data: null,
        };
      }
      return state;
    case CANVAS_REMOVE_SUCCESS:
      if (state.data && state.data.id === action.payload.canvasId) {
        return {
          ...state,
          isPermissionDenied: true,
        };
      }
      return state;
    case ENTRY_ADD_REQUEST:
      return addEntryOptimistically(state, action.payload);
    case ENTRY_ADD_SUCCESS:
      return addEntryReducer(state, action.payload);
    case ENTRY_ADD_ERROR:
      return addEntryError(state, action.payload);
    case ENTRY_UPDATE_SUCCESS:
      return entryUpdateReducer(state, action.payload);
    case ENTRY_REMOVE_REQUEST:
      return entryRemoveOptimistically(state, action.payload);
    case ENTRY_REMOVE_SUCCESS:
      return entryRemoveReducer(state, action.payload);
    case ENTRY_REMOVE_ERROR:
      return entryRemoveError(state, action.payload);
    case CANVAS_SET_SHARE_URL:
      return {
        ...state,
        shareUrl: action.payload,
      };
    case CANVAS_SHARING_SUCCESS:
      return sharingSettingsUpdateReduce(state, action.payload);
    case AUTH_UNSET_USER:
      return reduceCanvasOnSignOut(state);
    case AUTH_SET_USER:
      return reduceCanvasOnLogIn(state, action.payload);
    default:
      return state;
  }
};

export default canvas;
