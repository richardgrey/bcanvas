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

export const timestampFieldsToMillis = doc => {
  const data = typeof doc.data === 'function' ? doc.data() : doc;
  const newData = {};

  Object.keys(data).forEach(key => {
    if (data[key] instanceof Timestamp) {
      newData[key] = data[key].toMillis();
    } else if (key === 'entries') {
      newData[key] = Object.keys(data[key]).reduce((o, k) => {
        o[k] = timestampFieldsToMillis(data[key][k]);
        return o;
      }, {});
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
