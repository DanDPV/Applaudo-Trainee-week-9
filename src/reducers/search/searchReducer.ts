/* eslint no-case-declarations:0 */
import ISearchState from 'reducers/search/ISearchState';
import SearchActions from 'reducers/search/search.actions';
import queryString from 'query-string';

const initState = {
  offset: 0,
  limit: 5,
  total: 0,
  count: 0,
  baseUrl: '',
  url: '',
};

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
      const setOffsetUrl = `${state.baseUrl}?${queryString.stringify({
        apikey: process.env.REACT_APP_PUBLIC_KEY,
        limit: state.limit,
        offset: action.payload.offset,
      })}`;
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

    case 'RESET':
      return {
        ...initState,
      };

    default:
      return state;
  }
};

export default searchReducer;
