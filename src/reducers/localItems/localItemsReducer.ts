/* eslint no-case-declarations:0 */

import ILocalItemsState from 'reducers/localItems/ILocalItemsState';
import LocalItemsActions from 'reducers/localItems/localItems.actions';

const initState = {
  hiddenItems: [],
  bookmarks: [],
};

const localItemsReducer = (
  state: ILocalItemsState = initState,
  action: LocalItemsActions,
) => {
  switch (action.type) {
    case 'HIDE_LOCAL_ITEM':
      return {
        ...state,
        hiddenItems: [...state.hiddenItems, action.payload.item],
      };

    case 'ADD_BOOKMARK':
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload.item],
      };

    case 'RESET_LOCAL_ITEMS':
      return {
        ...initState,
      };

    default:
      return state;
  }
};

export default localItemsReducer;
