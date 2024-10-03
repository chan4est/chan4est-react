export default function timestampToDate(psqlTimestamp) {
  const date = new Date(psqlTimestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
  const year = String(date.getFullYear());

  return `${month}/${day}/${year}`;
}
