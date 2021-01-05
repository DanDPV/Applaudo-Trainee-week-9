/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import { getQueryVariable, shortenText } from './utils';

describe('Test on utils', () => {
  test('should return query params', () => {
    const hostName = 'http://dummy.com';
    const param = 'page';
    const value = '1';
    const search = `?${param}=${value}`;

    global.window = Object.create(window);
    const url = `${hostName}${search}`;
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
        search,
      },
      writable: true,
    });

    const queryParam = getQueryVariable(param);
    expect(queryParam).toBe(value);
  });

  test('should return shortened text', () => {
    const text = 'This is a very long text, so it needs to be shortened';
    const expectedText = 'This is a very long text...';

    const shortenedText = shortenText(text, 24);
    expect(shortenedText).toBe(expectedText);
  });
});
