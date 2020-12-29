import { ILocalItem } from 'reducers/localItems/ILocalItemsState';
import { IHideLocalItem, ILocalItemsReset } from 'reducers/localItems/localItems.actions';

const hideLocalItem = (item: ILocalItem): IHideLocalItem => ({
  type: 'HIDE_LOCAL_ITEM',
  payload: {
    item,
  },
});

const resetLocalItems = (): ILocalItemsReset => ({
  type: 'RESET_LOCAL_ITEMS',
});

export {
  hideLocalItem,
  resetLocalItems,
};
