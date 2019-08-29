export default function isFirestoreId(str) {
  return /^[a-zA-Z0-9]{20}$/g.test(str);
}
