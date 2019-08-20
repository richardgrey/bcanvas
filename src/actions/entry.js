import api from '../api';

export const ENTRY_ADD_REQUEST = 'ENTRY_ADD_REQUEST';
export const ENTRY_ADD_SUCCESS = 'ENTRY_ADD_SUCCESS';
export const ENTRY_ADD_ERROR = 'ENTRY_ADD_ERROR';

const optimisticIdPrefix = 'optimistic-entry-';
let optimisticIdCounter = 0;

/**
 * Create new entry in given column.
 * @param canvasId {string}
 * @param data {object}
 * @param data.label {string}
 * @param data.value {string}
 * @returns {Function}
 */
export const addEntry = (canvasId, data) => async dispatch => {
  const { label, value } = data;
  const optimisticId = `${optimisticIdPrefix}${optimisticIdCounter}`;

  optimisticIdCounter += 1;
  dispatch({
    type: ENTRY_ADD_REQUEST,
    payload: {
      canvasId,
      entry: {
        id: optimisticId,
        ...data,
      },
    },
  });

  try {
    const entryId = await api.canvas.addEntry(canvasId, { label, value });
    dispatch({
      type: ENTRY_ADD_SUCCESS,
      payload: {
        canvasId,
        entryOptimisticId: optimisticId,
        entry: {
          id: entryId,
          label,
          value,
        },
      },
    });
  } catch (error) {
    dispatch({
      type: ENTRY_ADD_ERROR,
      payload: {
        canvasId,
        entryOptimisticId: optimisticId,
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
 * Updates entry value.
 * @param canvasId {string}
 * @param entryId {string}
 * @param data {object}
 * @param data.label {string}
 * @param data.value {string}
 * @returns {Function}
 */
export const updateEntry = (canvasId, entryId, data) => async dispatch => {
  dispatch({ type: ENTRY_UPDATE_REQUEST });
  try {
    const { label, value } = data;
    await api.canvas.updateEntry(canvasId, entryId, { value });
    dispatch({
      type: ENTRY_UPDATE_SUCCESS,
      payload: {
        canvasId,
        entry: {
          id: entryId,
          label,
          value,
        },
      },
    });
  } catch (error) {
    dispatch({
      type: ENTRY_UPDATE_ERROR,
      payload: {
        canvasId,
        entryId,
        error,
      },
    });
  }
};

// ---

export const ENTRY_MOVE_REQUEST = 'ENTRY_MOVE_REQUEST';
export const ENTRY_MOVE_SUCCESS = 'ENTRY_MOVE_SUCCESS';
export const ENTRY_MOVE_ERROR = 'ENTRY_MOVE_ERROR';

/**
 * Moves entry to another column.
 * @param canvasId {string}
 * @param entryId {string}
 * @param data {object}
 * @param data.label {string}
 * @param data.value {string}
 * @returns {Function}
 */
export const moveEntry = (canvasId, entryId, data) => async dispatch => {
  dispatch({ type: ENTRY_MOVE_REQUEST });
  try {
    const { label } = data;
    await api.canvas.updateEntry(canvasId, entryId, { label });
    dispatch({
      type: ENTRY_MOVE_SUCCESS,
      payload: {
        id: entryId,
        label,
      },
    });
  } catch (error) {
    dispatch({
      type: ENTRY_MOVE_ERROR,
      payload: {
        canvasId,
        entryId,
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
 * Marks canvas as deleted.
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
