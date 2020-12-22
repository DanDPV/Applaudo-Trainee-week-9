import searchReducer from 'reducers/search/searchReducer';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  search: searchReducer,
});

const store = createStore(rootReducer);

export default store;
