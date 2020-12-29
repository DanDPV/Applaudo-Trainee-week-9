import { ILocalItem } from 'reducers/localItems/ILocalItemsState';

export interface IHideLocalItem {
  readonly type: 'HIDE_LOCAL_ITEM';
  payload: {
    item: ILocalItem;
  };
}

export interface ILocalItemsReset {
  readonly type: 'RESET_LOCAL_ITEMS';
}

type LocalItemsActions = IHideLocalItem | ILocalItemsReset;

export default LocalItemsActions;
