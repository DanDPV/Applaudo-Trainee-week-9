import IStory from 'interfaces/IStory';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import {
  IStoryReset,
  IStorySetAllParams,
  IStorySetAsyncContent,
  IStorySetBaseUrl,
  IStorySetData,
  IStorySetError,
  IStorySetLoading,
  IStorySetTitle,
} from 'reducers/searchStory/searchStory.actions';

const setStoryBaseUrl = (baseUrl: string): IStorySetBaseUrl => ({
  type: 'SET_BASE_URL_STORY',
  payload: {
    baseUrl,
  },
});

const setStoryTitle = (title: string): IStorySetTitle => ({
  type: 'SET_TITLE_STORY',
  payload: {
    title,
  },
});

const setStoryAllParams = (
  offset: number,
  title: string,
): IStorySetAllParams => ({
  type: 'SET_ALL_PARAMS_STORY',
  payload: {
    offset,
    title,
  },
});

const setStoryLoading = (loading: boolean): IStorySetLoading => ({
  type: 'SET_LOADING_STORY',
  payload: {
    loading,
  },
});

const setStoryError = (error: string): IStorySetError => ({
  type: 'SET_ERROR_STORY',
  payload: {
    error,
  },
});

const setStoryData = (
  data: IGenericApiResponse<IStory> | null,
): IStorySetData => ({
  type: 'SET_DATA_STORY',
  payload: {
    data,
  },
});

const setStoryAsyncContent = (
  loading: boolean,
  error: string,
  data: IGenericApiResponse<IStory> | null,
): IStorySetAsyncContent => ({
  type: 'SET_ASYNC_CONTENT_STORY',
  payload: {
    loading,
    error,
    data,
  },
});

const storyReset = (): IStoryReset => ({
  type: 'RESET_STORY',
});

export {
  setStoryBaseUrl,
  setStoryTitle,
  setStoryAllParams,
  setStoryLoading,
  setStoryError,
  setStoryData,
  setStoryAsyncContent,
  storyReset,
};
