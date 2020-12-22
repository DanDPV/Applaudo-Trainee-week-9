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

export interface ISetName {
  readonly type: 'SET_NAME';
  payload: {
    name: string;
  };
}

export interface ISetAllParams {
  readonly type: 'SET_ALL_PARAMS';
  payload: {
    offset: number;
    name: string;
  };
}

export interface IReset {
  readonly type: 'RESET';
}

type SearchActions = ISetOffset | ISetLimit | ISetBaseUrl | ISetName | ISetAllParams | IReset;

export default SearchActions;
