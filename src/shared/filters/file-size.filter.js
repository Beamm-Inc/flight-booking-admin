/* eslint no-param-reassign:0 */

export default size => {
  if (Number.isNaN(size)) size = 0;

  if (size < 1024) return `${size} Bytes`;

  size /= 1024;

  if (size < 1024) return `${size.toFixed(2)} KB`;

  size /= 1024;

  if (size < 1024) return `${size.toFixed(2)} MB`;

  size /= 1024;

  if (size < 1024) return `${size.toFixed(2)} GB`;

  size /= 1024;

  return `${size.toFixed(2)} TB`;
};
