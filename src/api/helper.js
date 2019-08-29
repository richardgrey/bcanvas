import { FieldValue, Timestamp } from '../firebase';
import { CANVAS_TYPE_BUSINESS } from '../constants';
import isObject from '../utils/isObject';

export const CANVAS_DOCUMENT_DEFAULTS = {
  title: null,
  description: null,
  type: CANVAS_TYPE_BUSINESS,
  ownerId: null,
  isPublic: false,
  createdAt: FieldValue.serverTimestamp(),
  updatedAt: FieldValue.serverTimestamp(),
  deletedAt: null,
  slug: null,
};

export const timestampFieldsToMillis = doc => {
  const data = typeof doc.data === 'function' ? doc.data() : doc;
  const newData = {};

  Object.keys(data).forEach(key => {
    if (data[key] instanceof Timestamp) {
      newData[key] = data[key].toMillis();
    } else if (isObject(data[key])) {
      newData[key] = timestampFieldsToMillis(data[key]);
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
