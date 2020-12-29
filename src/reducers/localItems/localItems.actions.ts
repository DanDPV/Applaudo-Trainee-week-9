import { ILocalItem } from 'reducers/localItems/ILocalItemsState';

export interface IHideLocalItem {
  readonly type: 'HIDE_LOCAL_ITEM';
  payload: {
    item: ILocalItem;
  };
}

export interface IAddBookmark {
  readonly type: 'ADD_BOOKMARK';
  payload: {
    item: ILocalItem;
  };
}

export interface IRemoveBookmark {
  readonly type: 'REMOVE_BOOKMARK';
  payload: {
    item: ILocalItem;
  };
}

export interface ILocalItemsReset {
  readonly type: 'RESET_LOCAL_ITEMS';
}

type LocalItemsActions =
  | IHideLocalItem
  | ILocalItemsReset
  | IAddBookmark
  | IRemoveBookmark;

export default LocalItemsActions;
