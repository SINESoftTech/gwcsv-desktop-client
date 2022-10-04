export const getFileExt = (fileName) => {
  if (fileName.endsWith('jpg')) {
    return 'jpg';
  }
  if (fileName.endsWith('png')) {
    return 'png';
  }
  return 'jpg';
};
