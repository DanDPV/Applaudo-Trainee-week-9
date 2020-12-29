import { ILocalItem } from 'reducers/localItems/ILocalItemsState';
import {
  IAddBookmark,
  IHideLocalItem,
  ILocalItemsReset,
  IRemoveBookmark,
} from 'reducers/localItems/localItems.actions';

const hideLocalItem = (item: ILocalItem): IHideLocalItem => ({
  type: 'HIDE_LOCAL_ITEM',
  payload: {
    item,
  },
});

const addBookmark = (item: ILocalItem): IAddBookmark => ({
  type: 'ADD_BOOKMARK',
  payload: {
    item,
  },
});

const removeBookmark = (item: ILocalItem): IRemoveBookmark => ({
  type: 'REMOVE_BOOKMARK',
  payload: {
    item,
  },
});

const resetLocalItems = (): ILocalItemsReset => ({
  type: 'RESET_LOCAL_ITEMS',
});

export {
  hideLocalItem,
  addBookmark,
  removeBookmark,
  resetLocalItems,
};
