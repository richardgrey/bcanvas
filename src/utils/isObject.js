/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
export default function isObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  return Object.prototype.toString.call(obj) === '[object Object]';
}
