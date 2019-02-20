export const normalize = query =>
  query
    .split(' ')
    .filter(s => s !== '&')
    .join('+');
