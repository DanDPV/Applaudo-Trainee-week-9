/* eslint-disable no-underscore-dangle */
import searchReducer from 'reducers/search/searchReducer';
import searchComicReducer from 'reducers/searchComic/searchComicReducer';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  search: searchReducer,
  searchComic: searchComicReducer,
});

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

export type IRootState = ReturnType<typeof rootReducer>

export default store;
