/* eslint-disable no-param-reassign */
/**
 * Reduce provided object to only provided keys and return new object.
 *
 * @param obj {object}
 * @param keys {string[]}
 * @returns {object}
 */
export default function pick(obj, keys) {
  return keys.reduce((result, propName) => {
    if (propName in obj) {
      result[propName] = obj[propName];
    }
    return result;
  }, {});
}
