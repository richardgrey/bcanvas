import { firestore, firebaseAuth, FieldValue } from '../firebase';
import {
  ERROR_CANVAS_NOT_FOUND,
  ERROR_UNAUTHORIZED_ACTION,
  CANVAS_PERMISSION_DENIED,
} from '../constants';
import {
  CANVAS_DOCUMENT_DEFAULTS,
  ENTRY_DOCUMENT_DEFAULTS,
  documentUpdatedTick,
  normalizeCanvas,
  normalizeEntry,
} from './helper';

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
        .set(payload, { merge: true })
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

  entries: async canvasId =>
    new Promise((resolve, reject) => {
      firestore
        .collection('canvases')
        .doc(canvasId)
        .collection('entries')
        .orderBy('createdAt')
        .get()
        .then(snap => {
          const entries = [];
          snap.docs.forEach(doc => entries.push(normalizeEntry(doc)));
          resolve(entries);
        })
        .catch(error => reject(error));
    }),

  addEntry: async (canvasId, data = {}) =>
    new Promise((resolve, reject) => {
      const { label, value } = data;
      // Should check for canvas existence but that will cost another request.
      // Omitted for now.
      const cnvsRef = firestore.collection('canvases').doc(canvasId);
      cnvsRef
        .collection('entries')
        .add({
          ...ENTRY_DOCUMENT_DEFAULTS,
          label,
          value,
        })
        .then(entryRef => {
          documentUpdatedTick(cnvsRef);
          resolve(entryRef.id);
        })
        .catch(error => reject(error));
    }),

  updateEntry: async (canvasId, entryId, data = {}) =>
    new Promise((resolve, reject) => {
      // Should check for canvas existence but that will cost another request.
      // Omitted for now.
      const { label, value } = data;
      const payload = {
        updatedAt: FieldValue.serverTimestamp(),
      };

      if (value) {
        payload.value = value;
      }
      if (label) {
        payload.label = label;
      }

      const cnvsRef = firestore.collection('canvases').doc(canvasId);
      cnvsRef
        .collection('entries')
        .doc(entryId)
        .set(payload, { merge: true })
        .then(() => {
          documentUpdatedTick(cnvsRef);
          resolve();
        })
        .catch(error => reject(error));
    }),

  removeEntry: async (canvasId, entryId) =>
    new Promise((resolve, reject) => {
      const cnvsRef = firestore.collection('canvases').doc(canvasId);
      cnvsRef
        .collection('entries')
        .doc(entryId)
        .delete()
        .then(() => {
          documentUpdatedTick(cnvsRef);
          resolve();
        })
        .catch(error => reject(error));
    }),
};

export default canvas;
