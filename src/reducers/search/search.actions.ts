export interface ISetOffset {
  readonly type: 'SET_OFFSET';
  payload: {
    offset: number;
  };
}

export interface ISetLimit {
  readonly type: 'SET_LIMIT';
  payload: {
    limit: number;
  };
}

export interface ISetBaseUrl {
  readonly type: 'SET_BASE_URL';
  payload: {
    baseUrl: string;
  };
}

export interface IReset {
  readonly type: 'RESET';
}

type SearchActions = ISetOffset | ISetLimit | ISetBaseUrl | IReset;

export default SearchActions;
