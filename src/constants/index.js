// Available canvas types
export const CANVAS_TYPE_BUSINESS = 'business';
export const CANVAS_TYPE_VALUE = 'value';
export const CANVAS_TYPE_LEAN = 'lean';

// Auth
export const ERROR_AUTH_LOGIN = 'ERROR_AUTH_LOGIN';
export const ERROR_AUTH_REGISTER = 'ERROR_AUTH_REGISTER';
export const ERROR_AUTH_SIGN_OUT = 'ERROR_AUTH_SIGN_OUT';
export const ERROR_REAUTH_PASSWORD_LOGIN = 'ERROR_REAUTH_PASSWORD_LOGIN';
export const ERROR_REAUTH_GOOGLE_LOGIN = 'ERROR_REAUTH_GOOGLE_LOGIN';
export const ERROR_AUTH_EMAIL_IS_USED = 'ERROR_AUTH_EMAIL_IS_USED';
export const ERROR_AUTH_EMAIL_IS_INVALID = 'ERROR_AUTH_EMAIL_IS_INVALID';
export const ERROR_AUTH_USER_IS_DISABLED = 'ERROR_AUTH_USER_IS_DISABLED';
export const ERROR_AUTH_USER_NOT_FOUND = 'ERROR_AUTH_USER_NOT_FOUND';
export const ERROR_AUTH_WRONG_PASSWORD = 'ERROR_AUTH_WRONG_PASSWORD';
export const ERROR_AUTH_WEEK_PASSWORD = 'ERROR_AUTH_WEEK_PASSWORD';
export const ERROR_AUTH_INTERNAL_ERROR = 'ERROR_AUTH_INTERNAL_ERROR';
export const ERROR_AUTH_INV_DISPLAY_NAME = 'ERROR_AUTH_INV_DISPLAY_NAME';
export const ERROR_AUTH_WRONG_USER = 'ERROR_AUTH_WRONG_USER';
export const ERROR_UNAUTHORIZED_ACTION = 'ERROR_UNAUTHORIZED_ACTION';
export const ERROR_AUTH_REAUTH_REQUIRED = 'ERROR_AUTH_REAUTH_REQUIRED';
export const ERROR_CANVAS_NOT_FOUND = 'ERROR_CANVAS_NOT_FOUND';
export const CANVAS_PERMISSION_DENIED = 'CANVAS_PERMISSION_DENIED';

// Account
export const ERROR_ACCOUNT_UPDATE_PROFILE = 'ERROR_AUTH_UPDATE_PROFILE';
export const ERROR_ACCOUNT_UPDATE_EMAIL = 'ERROR_AUTH_UPDATE_EMAIL';
export const ERROR_ACCOUNT_UPDATE_PASSWORD = 'ERROR_AUTH_UPDATE_PASSWORD';
export const ERROR_ACCOUNT_CONFIRM_PASSWORD = 'ERROR_ACCOUNT_CONFIRM_PASSWORD';

// Form errors
export const ERROR_CODE_MESSAGES = {
  [ERROR_AUTH_EMAIL_IS_USED]: [
    'email',
    'This email already in use. Try another one or try to sign in',
  ],
  [ERROR_AUTH_EMAIL_IS_INVALID]: ['email', 'Something wrong with this email'],
  [ERROR_AUTH_USER_IS_DISABLED]: ['email', 'This account was disabled. What you did?'],
  [ERROR_AUTH_USER_NOT_FOUND]: ['password', 'The password or email is incorrect'],
  [ERROR_AUTH_WRONG_PASSWORD]: ['password', 'The password or email is incorrect'],
  [ERROR_AUTH_WEEK_PASSWORD]: [
    'password',
    'This password is to short. It should be at least 6\u00a0symbols',
  ],
  [ERROR_AUTH_INV_DISPLAY_NAME]: ['name', 'Let’s be a friends! What’s your name?'],
  [ERROR_ACCOUNT_CONFIRM_PASSWORD]: ['repassword', 'Passwords should match'],
};

export const DEFAULT_USER_NAME = 'Anonymous';
export const DEFAULT_CANVAS_TITLE = 'Untitled Canvas';
