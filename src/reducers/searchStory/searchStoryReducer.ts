/* eslint no-case-declarations:0 */
import ISearchStoryState from 'reducers/searchStory/ISearchStoryState';
import SearchStoryActions from 'reducers/searchStory/searchStory.actions';
import queryString from 'query-string';

const initState = {
  offset: 0,
  limit: 12,
  baseUrl: '',
  url: '',
  title: '',
  loading: false,
  error: '',
  data: null,
};

const searchStoryReducer = (
  state: ISearchStoryState = initState,
  action: SearchStoryActions,
) => {
  const getBaseQueryString = () => ({
    apikey: process.env.REACT_APP_PUBLIC_KEY,
    limit: state.limit,
    offset: state.offset,
    titleStartsWith: state.title === '' ? undefined : state.title,
  });

  switch (action.type) {
    case 'SET_LIMIT_STORY':
      const setLimitQuery = getBaseQueryString();
      setLimitQuery.limit = action.payload.limit;
      const setLimitUrl = `${state.baseUrl}?${queryString.stringify(
        setLimitQuery,
      )}`;
      return {
        ...state,
        limit: action.payload.limit,
        url: setLimitUrl,
      };

    case 'SET_OFFSET_STORY':
      const setOffsetQuery = getBaseQueryString();
      setOffsetQuery.offset = action.payload.offset;
      const setOffsetUrl = `${state.baseUrl}?${queryString.stringify(
        setOffsetQuery,
      )}`;
      return {
        ...state,
        offset: action.payload.offset,
        url: setOffsetUrl,
      };

    case 'SET_BASE_URL_STORY':
      const setBaseUrlQuery = getBaseQueryString();
      const setBaseUrlUrl = `${action.payload.baseUrl}?${queryString.stringify(
        setBaseUrlQuery,
      )}`;
      return {
        ...state,
        baseUrl: action.payload.baseUrl,
        url: setBaseUrlUrl,
      };

    case 'SET_ALL_PARAMS_STORY':
      const setAllParamsQuery = getBaseQueryString();
      setAllParamsQuery.offset = action.payload.offset;

      if (action.payload.title) setAllParamsQuery.titleStartsWith = action.payload.title;
      else setAllParamsQuery.titleStartsWith = undefined;

      const setAllParamsUrl = `${state.baseUrl}?${queryString.stringify(
        setAllParamsQuery,
      )}`;

      return {
        ...state,
        offset: action.payload.offset,
        title: action.payload.title,
        url: setAllParamsUrl,
      };

    case 'SET_TITLE_STORY':
      return {
        ...state,
        title: action.payload.title,
      };

    case 'SET_LOADING_STORY':
      return {
        ...state,
        loading: action.payload.loading,
      };

    case 'SET_ERROR_STORY':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'SET_DATA_STORY':
      return {
        ...state,
        data: action.payload.data,
      };

    case 'RESET_STORY':
      return {
        ...initState,
      };

    default:
      return state;
  }
};

export default searchStoryReducer;
