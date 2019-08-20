import { FieldValue, Timestamp } from '../firebase';
import { CANVAS_TYPE_BUSINESS } from '../constants';

export const CANVAS_DOCUMENT_DEFAULTS = {
  title: null,
  description: null,
  type: CANVAS_TYPE_BUSINESS,
  ownerId: null,
  isPublic: false,
  createdAt: FieldValue.serverTimestamp(),
  updatedAt: FieldValue.serverTimestamp(),
  deletedAt: null,
};

export const ENTRY_DOCUMENT_DEFAULTS = {
  label: null,
  value: null,
  createdAt: FieldValue.serverTimestamp(),
  updatedAt: FieldValue.serverTimestamp(),
};

export const documentUpdatedTick = docRef =>
  docRef.set({ updatedAt: FieldValue.serverTimestamp() }, { merge: true });

export const timestampFieldsToMillis = doc => {
  const data = doc.data();
  const newData = {};

  Object.keys(data).forEach(key => {
    if (data[key] instanceof Timestamp) {
      newData[key] = data[key].toMillis();
    } else {
      newData[key] = data[key];
    }
  });

  return newData;
};

export const normalizeCanvas = doc => ({
  id: doc.id,
  ...timestampFieldsToMillis(doc),
});

export const normalizeEntry = doc => ({
  id: doc.id,
  ...timestampFieldsToMillis(doc),
});
