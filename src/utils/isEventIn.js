export default (event = {}, node) => {
  const { path } = event;

  if (path && Array.isArray(path)) {
    return path.indexOf(node) >= 0;
  }

  return false;
};
