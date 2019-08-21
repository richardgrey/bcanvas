export default function isDOMEventIn(e = {}, node) {
  const { path } = e;

  if (path && Array.isArray(path)) {
    return path.indexOf(node) >= 0;
  }

  return false;
};
