interface setOffset {
  readonly type: 'SET_OFFSET';
  payload: {
    offset: number;
  };
}

interface setLimit {
  readonly type: 'SET_LIMIT';
  payload: {
    limit: number;
  };
}

interface setTotal {
  readonly type: 'SET_TOTAL';
  payload: {
    total: number;
  };
}

interface setCount {
  readonly type: 'SET_COUNT';
  payload: {
    count: number;
  };
}

interface setBaseUrl {
  readonly type: 'SET_BASE_URL';
  payload: {
    baseUrl: string;
  };
}

interface reset {
  readonly type: 'RESET';
}

type SearchActions = setOffset | setLimit | setTotal | setCount | setBaseUrl | reset;

export default SearchActions;
