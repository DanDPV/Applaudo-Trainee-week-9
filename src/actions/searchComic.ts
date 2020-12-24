import IComic from 'interfaces/IComic';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import {
  IComicReset,
  IComicSetAllParams,
  IComicSetBaseUrl,
  IComicSetData,
  IComicSetError,
  IComicSetLoading,
} from 'reducers/searchComic/searchComic.actions';

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

const comicReset = (): IComicReset => ({
  type: 'RESET_COMIC',
});

export {
  setComicBaseUrl,
  setComicAllParams,
  setComicLoading,
  setComicError,
  setComicData,
  comicReset,
};
