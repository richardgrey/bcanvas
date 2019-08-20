import { firestore, firebaseAuth, FieldValue } from '../firebase';
import {
  ERROR_CANVAS_NOT_FOUND,
  ERROR_UNAUTHORIZED_ACTION,
  CANVAS_PERMISSION_DENIED,
} from '../constants';
import { CANVAS_DOCUMENT_DEFAULTS, normalizeCanvas } from './helper';

const CANVAS_ERROR_MAP = {
  'permission-denied': CANVAS_PERMISSION_DENIED,
};

const canvas = {
  list: async () =>
    new Promise((resolve, reject) => {
      const { currentUser } = firebaseAuth;

      firestore
        .collection('canvases')
        .where('ownerId', '==', currentUser.uid)
        .where('deletedAt', '==', null)
        .get()
        .then(snap => {
          const canvases = [];

          // Snap is a custom data class, not a regular array
          // @see https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot
          snap.forEach(doc => {
            canvases.push(normalizeCanvas(doc));
          });

          resolve(canvases);
        })
        .catch(error => {
          reject(error);
        });
    }),

  get: async id =>
    new Promise((resolve, reject) => {
      firestore
        .collection('canvases')
        .doc(id)
        .get()
        .then(doc => {
          if (doc.exists && doc.data().deletedAt === null) {
            resolve(normalizeCanvas(doc));
          } else {
            reject(ERROR_CANVAS_NOT_FOUND);
          }
        })
        .catch(error => reject(CANVAS_ERROR_MAP[error.code] || error));
    }),

  create: async (data = {}) =>
    new Promise((resolve, reject) => {
      const { title, description } = data;
      const { currentUser } = firebaseAuth;

      if (!currentUser || !currentUser.uid) {
        reject(ERROR_UNAUTHORIZED_ACTION);
        return;
      }

      const payload = {
        ownerId: currentUser.uid,
      };

      if (title) {
        payload.title = title;
      }
      if (description) {
        payload.description = description;
      }

      firestore
        .collection('canvases')
        .add({
          ...CANVAS_DOCUMENT_DEFAULTS,
          ...payload,
        })
        .then(docRef => resolve(docRef.id))
        .catch(error => reject(error));
    }),

  update: async (canvasId, data = {}) =>
    new Promise((resolve, reject) => {
      // TODO: concurrent requests?
      const { title, description, isPublic } = data;
      const payload = {
        updatedAt: FieldValue.serverTimestamp(),
      };

      if (title) {
        payload.title = title;
      }
      if (description) {
        payload.description = description;
      }
      if (typeof isPublic === 'boolean') {
        payload.isPublic = isPublic;
      }

      firestore
        .collection('canvases')
        .doc(canvasId)
        .update(payload)
        // .set(payload, { merge: true })
        .then(() => resolve())
        .catch(error => reject(error));
    }),

  remove: async canvasId =>
    new Promise((resolve, reject) => {
      firestore
        .collection('canvases')
        .doc(canvasId)
        .set({ deletedAt: FieldValue.serverTimestamp() }, { merge: true })
        .then(() => resolve())
        .catch(error => reject(error));
    }),

  addEntry: async (canvasId, newEntryId, label, value) =>
    new Promise((resolve, reject) => {
      firestore
        .collection('canvases')
        .doc(canvasId)
        .update({
          updatedAt: FieldValue.serverTimestamp(),
          [`entries.${newEntryId}`]: {
            label,
            value,
            createdAt: FieldValue.serverTimestamp(),
          },
        })
        .then(() => resolve(canvasId, newEntryId, label, value))
        .catch(error => reject(error));
    }),

  updateEntry: async (canvasId, entryId, value) =>
    new Promise((resolve, reject) => {
      firestore
        .collection('canvases')
        .doc(canvasId)
        .update({
          updatedAt: FieldValue.serverTimestamp(),
          [`entries.${entryId}.value`]: value,
        })
        .then(() => resolve())
        .catch(error => reject(error));
    }),

  removeEntry: async (canvasId, entryId) =>
    new Promise((resolve, reject) => {
      firestore
        .collection('canvases')
        .doc(canvasId)
        .update({
          updatedAt: FieldValue.serverTimestamp(),
          [`entries.${entryId}`]: FieldValue.delete(),
        })
        .then(() => resolve())
        .catch(error => reject(error));
    }),
};

export default canvas;
