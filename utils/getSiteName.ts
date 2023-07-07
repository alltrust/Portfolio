export const getSiteName = (link: string) => {
  const startIdx = link.indexOf('//') + 2;
  const endIdx = link.indexOf('.');
  const siteName = link.slice(startIdx, endIdx);

  return siteName;
};
