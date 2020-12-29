/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers } from 'redux';
import searchReducer from 'reducers/search/searchReducer';
import searchComicReducer from 'reducers/searchComic/searchComicReducer';
import searchStoryReducer from 'reducers/searchStory/searchStoryReducer';
import viewItemReducer from 'reducers/viewItem/viewItemReducer';
import localItemsReducer from 'reducers/localItems/localItemsReducer';

const rootReducer = combineReducers({
  search: searchReducer,
  searchComic: searchComicReducer,
  searchStory: searchStoryReducer,
  viewItem: viewItemReducer,
  localItems: localItemsReducer,
});

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

export type IRootState = ReturnType<typeof rootReducer>

export default store;
