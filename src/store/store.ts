/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, StoreEnhancer } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import searchReducer from 'reducers/search/searchReducer';
import searchComicReducer from 'reducers/searchComic/searchComicReducer';
import searchStoryReducer from 'reducers/searchStory/searchStoryReducer';
import viewItemReducer from 'reducers/viewItem/viewItemReducer';
import localItemsReducer from 'reducers/localItems/localItemsReducer';

type WindowWithDevTools = Window & {
  __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<unknown, {}>;
};

const isReduxDevtoolsExtenstionExist = (
  arg: Window | WindowWithDevTools,
): arg is WindowWithDevTools => '__REDUX_DEVTOOLS_EXTENSION__' in arg;

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
  isReduxDevtoolsExtenstionExist(window)
    ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined,
);

export const persistor = persistStore(store);

export type IRootState = ReturnType<typeof rootReducer>;

export default store;
