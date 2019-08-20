/* eslint-disable no-param-reassign */
export default function pick(obj, keys) {
  return keys.reduce((result, propName) => {
    if (propName in obj) {
      result[propName] = obj[propName];
    }
    return result;
  }, {});
};
