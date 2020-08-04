import { v4 as uuidv4 } from 'uuid';
import api from '../api';

export const ENTRY_ADD_REQUEST = 'ENTRY_ADD_REQUEST';
export const ENTRY_ADD_SUCCESS = 'ENTRY_ADD_SUCCESS';
export const ENTRY_ADD_ERROR = 'ENTRY_ADD_ERROR';

/**
 * Create new entry in given column
 *
 * @param canvasId {string}
 * @param label {string}
 * @param value {string}
 * @returns {Function}
 */
export const addEntry = (canvasId, label, value) => async dispatch => {
  const newEntryId = uuidv4();
  const payload = {
    canvasId,
    entryId: newEntryId,
    label,
    value,
  };

  dispatch({
    type: ENTRY_ADD_REQUEST,
    payload,
  });

  try {
    await api.canvas.addEntry(canvasId, newEntryId, label, value);
    dispatch({
      type: ENTRY_ADD_SUCCESS,
      payload,
    });
  } catch (error) {
    dispatch({
      type: ENTRY_ADD_ERROR,
      payload: {
        ...payload,
        error,
      },
    });
  }
};

// ---

export const ENTRY_UPDATE_REQUEST = 'ENTRY_UPDATE_REQUEST';
export const ENTRY_UPDATE_SUCCESS = 'ENTRY_UPDATE_SUCCESS';
export const ENTRY_UPDATE_ERROR = 'ENTRY_UPDATE_ERROR';

/**
 * Update value of entry with given ID
 *
 * @param canvasId {string}
 * @param entryId {string}
 * @param value {string}
 * @returns {Function}
 */
export const updateEntry = (canvasId, entryId, value) => async dispatch => {
  const payload = {
    canvasId,
    entryId,
    value,
  };
  dispatch({ type: ENTRY_UPDATE_REQUEST, payload });
  try {
    await api.canvas.updateEntry(canvasId, entryId, value);
    dispatch({
      type: ENTRY_UPDATE_SUCCESS,
      payload,
    });
  } catch (error) {
    dispatch({
      type: ENTRY_UPDATE_ERROR,
      payload: {
        ...payload,
        error,
      },
    });
  }
};

// ---

export const ENTRY_REMOVE_REQUEST = 'ENTRY_REMOVE_REQUEST';
export const ENTRY_REMOVE_SUCCESS = 'ENTRY_REMOVE_SUCCESS';
export const ENTRY_REMOVE_ERROR = 'ENTRY_REMOVE_ERROR';

/**
 * Removes entry with given ID from canvas
 *
 * @param canvasId {string}
 * @param entryId {string}
 * @returns {Function}
 */
export const removeEntry = (canvasId, entryId) => async dispatch => {
  dispatch({
    type: ENTRY_REMOVE_REQUEST,
    payload: {
      canvasId,
      entryId,
    },
  });
  try {
    await api.canvas.removeEntry(canvasId, entryId);
    dispatch({
      type: ENTRY_REMOVE_SUCCESS,
      payload: {
        canvasId,
        entryId,
      },
    });
  } catch (error) {
    dispatch({
      type: ENTRY_REMOVE_ERROR,
      payload: {
        canvasId,
        entryId,
        error,
      },
    });
  }
};
