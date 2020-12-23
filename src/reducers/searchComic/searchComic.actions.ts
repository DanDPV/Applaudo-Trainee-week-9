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

export interface IComicSetAllParams {
  readonly type: 'SET_ALL_PARAMS_COMIC';
  payload: {
    offset: number;
    format: string;
    title: string;
  };
}

export interface IComicReset {
  readonly type: 'RESET_COMIC';
}

type SearchComicActions =
  | IComicSetOffset
  | IComicSetLimit
  | IComicSetBaseUrl
  | IComicSetAllParams
  | IComicReset;

export default SearchComicActions;
