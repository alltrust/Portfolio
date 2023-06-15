export const calculateReadingTime = (articleLength: string) => {
  const avgWordsPerMin = 200;
  const wordCount = articleLength.split(' ').length;
  const totalMins = Math.ceil(wordCount / avgWordsPerMin);

  return totalMins;
};
