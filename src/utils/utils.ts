/* eslint no-restricted-syntax: 0 */
const getQueryVariable = (variable: string) => {
  const query = window.location.search.substring(1);
  const vars = query.split('&');

  for (const v of vars) {
    const pair = v.split('=');
    if (pair[0] === variable) {
      return pair[1];
    }
  }

  return '';
};

const shortenText = (text: string, length: number) => {
  if (text.length <= length) {
    return text;
  }
  let sub = text.substr(0, length);
  sub += '...';
  return sub;
};

export { getQueryVariable, shortenText };
