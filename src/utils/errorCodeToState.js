import { ERROR_CODE_MESSAGES } from '../constants';

/**
 * Converts API error to form error object
 *
 * @param error {string}
 * @returns {object|null}
 */
export default function errorCodeToState(error) {
  if (error in ERROR_CODE_MESSAGES) {
    const [fieldName, message] = ERROR_CODE_MESSAGES[error];
    return { [fieldName]: message };
  }
  return undefined;
}
