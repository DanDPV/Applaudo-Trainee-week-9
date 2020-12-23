import { IComicReset, IComicSetAllParams, IComicSetBaseUrl } from 'reducers/searchComic/searchComic.actions';

const setComicBaseUrl = (baseUrl: string): IComicSetBaseUrl => ({
  type: 'SET_BASE_URL_COMIC',
  payload: {
    baseUrl,
  },
});

const setComicAllParams = (
  offset: number,
  format: string,
  title: string,
): IComicSetAllParams => ({
  type: 'SET_ALL_PARAMS_COMIC',
  payload: {
    offset,
    format,
    title,
  },
});

const comicReset = (): IComicReset => ({
  type: 'RESET_COMIC',
});

export { setComicBaseUrl, setComicAllParams, comicReset };
