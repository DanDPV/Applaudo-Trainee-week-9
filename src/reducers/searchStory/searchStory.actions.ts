import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import IStory from 'interfaces/IStory';

export interface IStorySetOffset {
  readonly type: 'SET_OFFSET_STORY';
  payload: {
    offset: number;
  };
}

export interface IStorySetLimit {
  readonly type: 'SET_LIMIT_STORY';
  payload: {
    limit: number;
  };
}

export interface IStorySetBaseUrl {
  readonly type: 'SET_BASE_URL_STORY';
  payload: {
    baseUrl: string;
  };
}

export interface IStorySetTitle {
  readonly type: 'SET_TITLE_STORY';
  payload: {
    title: string;
  };
}

export interface IStorySetAllParams {
  readonly type: 'SET_ALL_PARAMS_STORY';
  payload: {
    offset: number;
    title: string;
  };
}

export interface IStorySetLoading {
  readonly type: 'SET_LOADING_STORY';
  payload: {
    loading: boolean;
  };
}

export interface IStorySetError {
  readonly type: 'SET_ERROR_STORY';
  payload: {
    error: string;
  };
}

export interface IStorySetData {
  readonly type: 'SET_DATA_STORY';
  payload: {
    data: IGenericApiResponse<IStory> | null;
  };
}

export interface IStoryReset {
  readonly type: 'RESET_STORY';
}

type SearchStoryActions =
  | IStorySetOffset
  | IStorySetLimit
  | IStorySetBaseUrl
  | IStorySetTitle
  | IStorySetAllParams
  | IStorySetLoading
  | IStorySetError
  | IStorySetData
  | IStoryReset;

export default SearchStoryActions;
