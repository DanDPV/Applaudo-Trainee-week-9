/* eslint no-case-declarations:0 */
import ISearchState from 'reducers/search/ISearchState';
import SearchActions from 'reducers/search/search.actions';
import queryString from 'query-string';

const initState = {
  offset: 0,
  limit: 12,
  baseUrl: '',
  url: '',
  name: '',
};

type searchQueryType = {
  apikey: string,
  limit: number,
  offset: number,
  nameStartsWith: string | undefined,
}

const searchReducer = (
  state: ISearchState = initState,
  action: SearchActions,
) => {
  switch (action.type) {
    case 'SET_LIMIT':
      const setLimitUrl = `${state.baseUrl}?${queryString.stringify({
        apikey: process.env.REACT_APP_PUBLIC_KEY,
        offset: state.offset,
        limit: action.payload.limit,
      })}`;
      return {
        ...state,
        limit: action.payload.limit,
        url: setLimitUrl,
      };

    case 'SET_OFFSET':
      const setOffsetQuery = {
        apikey: process.env.REACT_APP_PUBLIC_KEY,
        limit: state.limit,
        offset: action.payload.offset,
        nameStartsWith: state.name ?? undefined,
      } as searchQueryType;

      const setOffsetUrl = `${state.baseUrl}?${queryString.stringify(setOffsetQuery)}`;
      return {
        ...state,
        offset: action.payload.offset,
        url: setOffsetUrl,
      };

    case 'SET_BASE_URL':
      const setBaseUrlUrl = `${action.payload.baseUrl}?${queryString.stringify({
        apikey: process.env.REACT_APP_PUBLIC_KEY,
        limit: state.limit,
        offset: state.offset,
      })}`;
      return {
        ...state,
        baseUrl: action.payload.baseUrl,
        url: setBaseUrlUrl,
      };

    case 'SET_NAME':
      return {
        ...state,
        name: action.payload.name,
      };

    case 'SET_ALL_PARAMS':
      const setAllParamsQuery = {
        apikey: process.env.REACT_APP_PUBLIC_KEY,
        limit: state.limit,
        offset: action.payload.offset,
        nameStartsWith: undefined,
      } as searchQueryType;

      if (action.payload.name) setAllParamsQuery.nameStartsWith = action.payload.name;

      const setAllParamsUrl = `${state.baseUrl}?${queryString.stringify(
        setAllParamsQuery,
      )}`;

      return {
        ...state,
        name: action.payload.name,
        offset: action.payload.offset,
        url: setAllParamsUrl,
      };

    case 'RESET':
      return {
        ...initState,
      };

    default:
      return state;
  }
};

export default searchReducer;
