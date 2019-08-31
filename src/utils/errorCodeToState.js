import {
  ERROR_ACCOUNT_CONFIRM_PASSWORD,
  ERROR_AUTH_EMAIL_IS_INVALID,
  ERROR_AUTH_EMAIL_IS_USED,
  ERROR_AUTH_INV_DISPLAY_NAME,
  ERROR_AUTH_USER_IS_DISABLED,
  ERROR_AUTH_USER_NOT_FOUND,
  ERROR_AUTH_WEEK_PASSWORD,
  ERROR_AUTH_WRONG_PASSWORD,
} from '../constants';

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

export const ERROR_CODE_RECOVERY_MESSAGES = {
  [ERROR_AUTH_EMAIL_IS_INVALID]: ['email', 'Something wrong with this email'],
  [ERROR_AUTH_USER_IS_DISABLED]: ['email', 'This account was disabled. What you did?'],
  [ERROR_AUTH_USER_NOT_FOUND]: ['email', 'We didn’t find anyone with this email in out records'],
};

/**
 * Converts API error to form error object
 *
 * @param error {string}
 * @param [context] {string}
 * @returns {object|null}
 */
export default function errorCodeToState(error, context) {
  let messages;
  if (context === 'recovery') {
    messages = ERROR_CODE_RECOVERY_MESSAGES;
  } else {
    messages = ERROR_CODE_MESSAGES;
  }
  if (error in messages) {
    const [fieldName, message] = ERROR_CODE_MESSAGES[error];
    return { [fieldName]: message };
  }
  return undefined;
}
