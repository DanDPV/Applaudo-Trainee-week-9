/* eslint no-case-declarations:0 */
import ISearchState from 'reducers/search/ISearchState';
import SearchActions from 'reducers/search/search.actions';
import queryString from 'query-string';

const searchReducer = (state: ISearchState, action: SearchActions) => {
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

    default:
      return state;
  }
};

export default searchReducer;
