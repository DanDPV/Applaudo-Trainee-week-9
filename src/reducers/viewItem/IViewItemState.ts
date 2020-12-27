import IComic from 'interfaces/IComic';
import IStory from 'interfaces/IStory';
import ICharacter from 'interfaces/ICharacter';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';

interface IViewItemState {
  loading: boolean;
  error: string;
  data: IGenericApiResponse<IStory>
    | IGenericApiResponse<ICharacter>
    | IGenericApiResponse<IComic>
    | null;
}

export default IViewItemState;
