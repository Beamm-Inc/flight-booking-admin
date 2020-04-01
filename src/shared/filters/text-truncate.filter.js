export default (text, truncateAt) =>
  text.slice(0, truncateAt) + (truncateAt < text.length ? "..." : "");
