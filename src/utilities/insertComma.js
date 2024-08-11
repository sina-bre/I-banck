export const insertComma = (str) => {
  str = str.replace(/٬/g, '');
  return str
    .split('')
    .reverse()
    .join('')
    .replace(/(.{3})(?=.)/g, '$1٬')
    .split('')
    .reverse()
    .join('');
};
