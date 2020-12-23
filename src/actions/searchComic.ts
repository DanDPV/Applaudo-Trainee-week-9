import { IComicReset, IComicSetBaseUrl } from 'reducers/searchComic/searchComic.actions';

const setComicBaseUrl = (baseUrl: string): IComicSetBaseUrl => ({
  type: 'SET_BASE_URL_COMIC',
  payload: {
    baseUrl,
  },
});

const comicReset = (): IComicReset => ({
  type: 'RESET_COMIC',
});

export { setComicBaseUrl, comicReset };
