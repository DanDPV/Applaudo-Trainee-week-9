export interface ILocalItem {
  id: number;
  type: 'CHARACTER' | 'COMIC' | 'STORY';
}

interface ILocalItemsState {
  hiddenItems: ILocalItem[];
  bookmarks: ILocalItem[];
}

export default ILocalItemsState;
