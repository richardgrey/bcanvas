import { firebaseAuth, googleProvider, EmailProvider } from '../firebase';
import {
  ERROR_AUTH_LOGIN,
  ERROR_AUTH_REGISTER,
  ERROR_AUTH_SIGN_OUT,
  ERROR_AUTH_EMAIL_IS_USED,
  ERROR_AUTH_EMAIL_IS_INVALID,
  ERROR_AUTH_USER_IS_DISABLED,
  ERROR_AUTH_USER_NOT_FOUND,
  ERROR_AUTH_WRONG_PASSWORD,
  ERROR_AUTH_WEEK_PASSWORD,
  ERROR_AUTH_INTERNAL_ERROR,
  ERROR_AUTH_INV_DISPLAY_NAME,
  ERROR_AUTH_REAUTH_REQUIRED,
  ERROR_ACCOUNT_UPDATE_PROFILE,
  ERROR_ACCOUNT_UPDATE_EMAIL,
  ERROR_ACCOUNT_UPDATE_PASSWORD,
  ERROR_REAUTH_PASSWORD_LOGIN,
  ERROR_REAUTH_GOOGLE_LOGIN,
  ERROR_AUTH_WRONG_USER,
  ERROR_AUTH_EXPIRED_ACTION_CODE,
  ERROR_AUTH_INVALID_ACTION_CODE,
} from '../constants';

export const AUTH_ERROR_CODE_MAP = {
  'auth/email-already-in-use': ERROR_AUTH_EMAIL_IS_USED,
  'auth/weak-password': ERROR_AUTH_WEEK_PASSWORD,
  'auth/user-disabled': ERROR_AUTH_USER_IS_DISABLED,
  'auth/invalid-email': ERROR_AUTH_EMAIL_IS_INVALID,
  'auth/user-not-found': ERROR_AUTH_USER_NOT_FOUND,
  'auth/wrong-password': ERROR_AUTH_WRONG_PASSWORD,
  'auth/internal-error': ERROR_AUTH_INTERNAL_ERROR,
  'auth/invalid-display-name': ERROR_AUTH_INV_DISPLAY_NAME,
  'auth/requires-recent-login': ERROR_AUTH_REAUTH_REQUIRED,
  CREDENTIAL_TOO_OLD_LOGIN_AGAIN: ERROR_AUTH_REAUTH_REQUIRED,
  // For auth with Google, when user sign in in different account from current
  'auth/user-mismatch': ERROR_AUTH_WRONG_USER,
  'auth/expired-action-code': ERROR_AUTH_EXPIRED_ACTION_CODE,
  'auth/invalid-action-code': ERROR_AUTH_INVALID_ACTION_CODE,
};

const auth = {
  onAuthStateChanged: observer => firebaseAuth.onAuthStateChanged(observer),

  signUpViaEmail: async (email, password, displayName = null) =>
    new Promise((resolve, reject) => {
      firebaseAuth
        .createUserWithEmailAndPassword(email, password)
        .then(result => {
          if (displayName) {
            result.user.updateProfile({ displayName }).then(() => resolve(result.user));
          } else {
            resolve(result.user);
          }
        })
        .catch(error => reject(AUTH_ERROR_CODE_MAP[error.code] || ERROR_AUTH_REGISTER));
    }),

  signInViaEmail: async (email, password) =>
    new Promise((resolve, reject) => {
      firebaseAuth
        .signInWithEmailAndPassword(email, password)
        .then(user => resolve(user))
        .catch(error => reject(AUTH_ERROR_CODE_MAP[error.code] || ERROR_AUTH_LOGIN));
    }),

  signInWithGoogle: async () =>
    new Promise((resolve, reject) => {
      firebaseAuth
        .signInWithPopup(googleProvider)
        .then(result => resolve(result.user))
        .catch(error => reject(error || ERROR_AUTH_LOGIN));
    }),

  signOut: async () =>
    new Promise((resolve, reject) => {
      firebaseAuth
        .signOut()
        .then(() => resolve())
        .catch(() => reject(ERROR_AUTH_SIGN_OUT));
    }),

  updateProfile: async (displayName, photoURL) =>
    new Promise((resolve, reject) => {
      const user = firebaseAuth.currentUser;
      user
        .updateProfile({ displayName, photoURL })
        .then(() => resolve(user.toJSON()))
        .catch(() => reject(ERROR_ACCOUNT_UPDATE_PROFILE));
    }),

  updateEmail: async email =>
    new Promise((resolve, reject) => {
      const user = firebaseAuth.currentUser;
      user
        .updateEmail(email)
        .then(() => resolve(user.toJSON()))
        .catch(error => reject(AUTH_ERROR_CODE_MAP[error.code] || ERROR_ACCOUNT_UPDATE_EMAIL));
    }),

  updatePassword: async newPassword =>
    new Promise((resolve, reject) => {
      const user = firebaseAuth.currentUser;
      user
        .updatePassword(newPassword)
        .then(() => resolve(user.toJSON()))
        .catch(error => {
          reject(AUTH_ERROR_CODE_MAP[error.code] || ERROR_ACCOUNT_UPDATE_PASSWORD);
        });
    }),

  reauthenticateWithGoogle: async () =>
    new Promise((resolve, reject) => {
      const user = firebaseAuth.currentUser;
      user
        .reauthenticateWithPopup(googleProvider)
        .then(result => resolve(result.user))
        .catch(error => {
          reject(AUTH_ERROR_CODE_MAP[error.code] || ERROR_REAUTH_GOOGLE_LOGIN);
        });
    }),

  reauthenticateWithPassword: async password =>
    new Promise((resolve, reject) => {
      const user = firebaseAuth.currentUser;
      const authProvider = EmailProvider.credential(user.email, password);
      user
        .reauthenticateWithCredential(authProvider)
        .then(result => resolve(result.user))
        .catch(error => reject(AUTH_ERROR_CODE_MAP[error.code] || ERROR_REAUTH_PASSWORD_LOGIN));
    }),

  sendPasswordResetEmail: async email =>
    new Promise((resolve, reject) => {
      firebaseAuth
        .sendPasswordResetEmail(email)
        .then(() => resolve())
        .catch(error => reject(AUTH_ERROR_CODE_MAP[error.code] || error));
    }),

  verifyPasswordResetCode: async code =>
    new Promise((resolve, reject) => {
      firebaseAuth
        .verifyPasswordResetCode(code)
        .then(email => resolve(email))
        .catch(error => reject(AUTH_ERROR_CODE_MAP[error.code] || error));
    }),

  confirmPasswordReset: async (code, password) =>
    new Promise((resolve, reject) => {
      firebaseAuth
        .confirmPasswordReset(code, password)
        .then(() => resolve())
        .catch(error => reject(AUTH_ERROR_CODE_MAP[error.code] || error));
    }),
};

export default auth;
