import ICharacter from 'interfaces/ICharacter';
import IComic from 'interfaces/IComic';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import IStory from 'interfaces/IStory';
import {
  IViewItemReset,
  IViewItemSetAsyncContent,
  IViewItemSetData,
  IViewItemSetError,
  IViewItemSetLoading,
} from 'reducers/viewItem/viewItem.actions';

const setViewItemLoading = (loading: boolean): IViewItemSetLoading => ({
  type: 'SET_LOADING_VIEW_ITEM',
  payload: {
    loading,
  },
});

const setViewItemError = (error: string): IViewItemSetError => ({
  type: 'SET_ERROR_VIEW_ITEM',
  payload: {
    error,
  },
});

const setViewItemData = (
  data: IGenericApiResponse<IStory>
  | IGenericApiResponse<ICharacter>
  | IGenericApiResponse<IComic>
  | null,
): IViewItemSetData => ({
  type: 'SET_DATA_VIEW_ITEM',
  payload: {
    data,
  },
});

const setViewItemAsyncContent = (
  loading: boolean,
  error: string,
  data: IGenericApiResponse<IStory>
  | IGenericApiResponse<ICharacter>
  | IGenericApiResponse<IComic>
  | null,
): IViewItemSetAsyncContent => ({
  type: 'SET_ASYNC_CONTENT_VIEW_ITEM',
  payload: {
    loading,
    error,
    data,
  },
});

const viewItemReset = (): IViewItemReset => ({
  type: 'RESET_VIEW_ITEM',
});

export {
  setViewItemLoading,
  setViewItemError,
  setViewItemData,
  setViewItemAsyncContent,
  viewItemReset,
};
