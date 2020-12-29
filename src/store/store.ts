/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import searchReducer from 'reducers/search/searchReducer';
import searchComicReducer from 'reducers/searchComic/searchComicReducer';
import searchStoryReducer from 'reducers/searchStory/searchStoryReducer';
import viewItemReducer from 'reducers/viewItem/viewItemReducer';
import localItemsReducer from 'reducers/localItems/localItemsReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['localItems'],
};

const rootReducer = combineReducers({
  search: searchReducer,
  searchComic: searchComicReducer,
  searchStory: searchStoryReducer,
  viewItem: viewItemReducer,
  localItems: localItemsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

export const persistor = persistStore(store);

export type IRootState = ReturnType<typeof rootReducer>;

export default store;
