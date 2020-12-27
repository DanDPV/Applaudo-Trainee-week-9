import IComic from 'interfaces/IComic';
import IStory from 'interfaces/IStory';
import ICharacter from 'interfaces/ICharacter';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';

export interface IViewItemSetLoading {
  readonly type: 'SET_LOADING_VIEW_ITEM';
  payload: {
    loading: boolean;
  };
}

export interface IViewItemSetError {
  readonly type: 'SET_ERROR_VIEW_ITEM';
  payload: {
    error: string;
  };
}

export interface IViewItemSetData {
  readonly type: 'SET_DATA_VIEW_ITEM';
  payload: {
    data: IGenericApiResponse<IStory>
    | IGenericApiResponse<ICharacter>
    | IGenericApiResponse<IComic>
    | null;
  };
}

export interface IViewItemSetAsyncContent {
  readonly type: 'SET_ASYNC_CONTENT_VIEW_ITEM';
  payload: {
    loading: boolean;
    error: string;
    data: IGenericApiResponse<IStory>
    | IGenericApiResponse<ICharacter>
    | IGenericApiResponse<IComic>
    | null;
  };
}
export interface IViewItemReset {
  readonly type: 'RESET_VIEW_ITEM';
}

type ViewItemActions =
  | IViewItemSetLoading
  | IViewItemSetError
  | IViewItemSetData
  | IViewItemSetAsyncContent
  | IViewItemReset;

export default ViewItemActions;
