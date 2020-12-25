import IComic from 'interfaces/IComic';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import {
  IComicReset,
  IComicSetAllParams,
  IComicSetAsyncContent,
  IComicSetBaseUrl,
  IComicSetData,
  IComicSetError,
  IComicSetFormat,
  IComicSetLoading,
  IComicSetTitle,
} from 'reducers/searchComic/searchComic.actions';

const setComicBaseUrl = (baseUrl: string): IComicSetBaseUrl => ({
  type: 'SET_BASE_URL_COMIC',
  payload: {
    baseUrl,
  },
});

const setComicTitle = (title: string): IComicSetTitle => ({
  type: 'SET_TITLE_COMIC',
  payload: {
    title,
  },
});

const setComicFormat = (format: string): IComicSetFormat => ({
  type: 'SET_FORMAT_COMIC',
  payload: {
    format,
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

const setComicLoading = (loading: boolean): IComicSetLoading => ({
  type: 'SET_LOADING_COMIC',
  payload: {
    loading,
  },
});

const setComicError = (error: string): IComicSetError => ({
  type: 'SET_ERROR_COMIC',
  payload: {
    error,
  },
});

const setComicData = (
  data: IGenericApiResponse<IComic> | null,
): IComicSetData => ({
  type: 'SET_DATA_COMIC',
  payload: {
    data,
  },
});

const setComicAsyncContent = (
  loading: boolean,
  error: string,
  data: IGenericApiResponse<IComic> | null,
): IComicSetAsyncContent => ({
  type: 'SET_ASYNC_CONTENT_COMIC',
  payload: {
    loading,
    error,
    data,
  },
});

const comicReset = (): IComicReset => ({
  type: 'RESET_COMIC',
});

export {
  setComicBaseUrl,
  setComicTitle,
  setComicFormat,
  setComicAllParams,
  setComicLoading,
  setComicError,
  setComicData,
  setComicAsyncContent,
  comicReset,
};
