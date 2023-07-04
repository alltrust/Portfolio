export const transformDate = (dateString: string) => {
  const year = parseInt(dateString.slice(0, 4));
  const month = parseInt(dateString.slice(5, 7)) - 1; // Subtract 1 as month is zero-based in JavaScript
  const day = parseInt(dateString.slice(8, 10));

  const date = new Date(year, month, day);

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};
