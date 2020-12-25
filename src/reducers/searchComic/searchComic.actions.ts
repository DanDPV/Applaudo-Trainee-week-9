import IComic from 'interfaces/IComic';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';

export interface IComicSetOffset {
  readonly type: 'SET_OFFSET_COMIC';
  payload: {
    offset: number;
  };
}

export interface IComicSetLimit {
  readonly type: 'SET_LIMIT_COMIC';
  payload: {
    limit: number;
  };
}

export interface IComicSetBaseUrl {
  readonly type: 'SET_BASE_URL_COMIC';
  payload: {
    baseUrl: string;
  };
}

export interface IComicSetTitle {
  readonly type: 'SET_TITLE_COMIC';
  payload: {
    title: string;
  };
}

export interface IComicSetFormat {
  readonly type: 'SET_FORMAT_COMIC';
  payload: {
    format: string;
  };
}

export interface IComicSetAllParams {
  readonly type: 'SET_ALL_PARAMS_COMIC';
  payload: {
    offset: number;
    format: string;
    title: string;
  };
}

export interface IComicSetLoading {
  readonly type: 'SET_LOADING_COMIC';
  payload: {
    loading: boolean;
  };
}

export interface IComicSetError {
  readonly type: 'SET_ERROR_COMIC';
  payload: {
    error: string;
  };
}

export interface IComicSetData {
  readonly type: 'SET_DATA_COMIC';
  payload: {
    data: IGenericApiResponse<IComic> | null;
  };
}

export interface IComicSetAsyncContent {
  readonly type: 'SET_ASYNC_CONTENT_COMIC';
  payload: {
    loading: boolean;
    error: string;
    data: IGenericApiResponse<IComic> | null;
  };
}

export interface IComicReset {
  readonly type: 'RESET_COMIC';
}

type SearchComicActions =
  | IComicSetOffset
  | IComicSetLimit
  | IComicSetBaseUrl
  | IComicSetTitle
  | IComicSetFormat
  | IComicSetAllParams
  | IComicSetLoading
  | IComicSetError
  | IComicSetData
  | IComicSetAsyncContent
  | IComicReset;

export default SearchComicActions;
