/* eslint no-case-declarations:0 */
import ISearchComicState from 'reducers/searchComic/ISearchComicState';
import SearchComicActions from 'reducers/searchComic/searchComic.actions';
import queryString from 'query-string';

const initState = {
  offset: 0,
  limit: 12,
  baseUrl: '',
  url: '',
  format: '',
  title: '',
  loading: false,
  error: '',
  data: null,
};

const searchComicReducer = (
  state: ISearchComicState = initState,
  action: SearchComicActions,
) => {
  const getBaseQueryString = () => ({
    apikey: process.env.REACT_APP_PUBLIC_KEY,
    limit: state.limit,
    offset: state.offset,
    format: state.format === '' ? undefined : state.format,
    titleStartsWith: state.title === '' ? undefined : state.title,
  });

  switch (action.type) {
    case 'SET_LIMIT_COMIC':
      const setLimitQuery = getBaseQueryString();
      setLimitQuery.limit = action.payload.limit;
      const setLimitUrl = `${state.baseUrl}?${queryString.stringify(setLimitQuery)}`;
      return {
        ...state,
        limit: action.payload.limit,
        url: setLimitUrl,
      };

    case 'SET_OFFSET_COMIC':
      const setOffsetQuery = getBaseQueryString();
      setOffsetQuery.offset = action.payload.offset;
      const setOffsetUrl = `${state.baseUrl}?${queryString.stringify(setOffsetQuery)}`;
      return {
        ...state,
        offset: action.payload.offset,
        url: setOffsetUrl,
      };

    case 'SET_BASE_URL_COMIC':
      const setBaseUrlQuery = getBaseQueryString();
      const setBaseUrlUrl = `${action.payload.baseUrl}?${queryString.stringify(setBaseUrlQuery)}`;
      return {
        ...state,
        baseUrl: action.payload.baseUrl,
        url: setBaseUrlUrl,
      };

    case 'SET_ALL_PARAMS_COMIC':
      const setAllParamsQuery = getBaseQueryString();
      setAllParamsQuery.offset = action.payload.offset;

      if (action.payload.format) setAllParamsQuery.format = action.payload.format;
      else setAllParamsQuery.format = undefined;

      if (action.payload.title) setAllParamsQuery.titleStartsWith = action.payload.title;
      else setAllParamsQuery.titleStartsWith = undefined;

      const setAllParamsUrl = `${state.baseUrl}?${queryString.stringify(
        setAllParamsQuery,
      )}`;

      return {
        ...state,
        offset: action.payload.offset,
        format: action.payload.format,
        title: action.payload.title,
        url: setAllParamsUrl,
      };

    case 'SET_TITLE_COMIC':
      return {
        ...state,
        title: action.payload.title,
      };

    case 'SET_FORMAT_COMIC':
      return {
        ...state,
        format: action.payload.format,
      };

    case 'SET_LOADING_COMIC':
      return {
        ...state,
        loading: action.payload.loading,
      };

    case 'SET_ERROR_COMIC':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'SET_DATA_COMIC':
      return {
        ...state,
        data: action.payload.data,
      };

    case 'SET_ASYNC_CONTENT_COMIC':
      return {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error,
        data: action.payload.data,
      };

    case 'RESET_COMIC':
      return {
        ...initState,
      };

    default:
      return state;
  }
};

export default searchComicReducer;
