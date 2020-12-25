import ICharacter from 'interfaces/ICharacter';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import {
  ISetOffset,
  ISetBaseUrl,
  IReset,
  ISetAllParams,
  ISetName,
  ISetComic,
  ISetStory,
  ISetLoading,
  ISetError,
  ISetData,
  ISetAsyncContent,
} from 'reducers/search/search.actions';

const setBaseUrl = (baseUrl: string): ISetBaseUrl => ({
  type: 'SET_BASE_URL',
  payload: {
    baseUrl,
  },
});

const setOffset = (offset: number): ISetOffset => ({
  type: 'SET_OFFSET',
  payload: {
    offset,
  },
});

const setName = (name: string): ISetName => ({
  type: 'SET_NAME',
  payload: {
    name,
  },
});

const setComic = (comic: string): ISetComic => ({
  type: 'SET_COMIC',
  payload: {
    comic,
  },
});

const setStory = (story: string): ISetStory => ({
  type: 'SET_STORY',
  payload: {
    story,
  },
});

const setAllParams = (
  offset: number,
  name: string,
  comic: string,
  story: string,
): ISetAllParams => ({
  type: 'SET_ALL_PARAMS',
  payload: {
    offset,
    name,
    comic,
    story,
  },
});

const setLoading = (loading: boolean): ISetLoading => ({
  type: 'SET_LOADING',
  payload: {
    loading,
  },
});

const setError = (error: string): ISetError => ({
  type: 'SET_ERROR',
  payload: {
    error,
  },
});

const setData = (data: IGenericApiResponse<ICharacter> | null): ISetData => ({
  type: 'SET_DATA',
  payload: {
    data,
  },
});

const setAsyncContent = (
  loading: boolean,
  error: string,
  data: IGenericApiResponse<ICharacter> | null,
): ISetAsyncContent => ({
  type: 'SET_ASYNC_CONTENT',
  payload: {
    loading,
    error,
    data,
  },
});

const reset = (): IReset => ({
  type: 'RESET',
});

export {
  setBaseUrl,
  setOffset,
  setName,
  setComic,
  setStory,
  setAllParams,
  setLoading,
  setError,
  setData,
  setAsyncContent,
  reset,
};
