export default function hash() {
  return Math.random()
    .toString(16)
    .substr(-6);
};
