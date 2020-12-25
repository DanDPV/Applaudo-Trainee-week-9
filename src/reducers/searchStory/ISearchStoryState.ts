import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import IStory from 'interfaces/IStory';

interface ISearchStoryState {
  offset: number;
  limit: number;
  baseUrl: string;
  url: string;
  title: string;
  loading: boolean;
  error: string;
  data: IGenericApiResponse<IStory> | null;
}

export default ISearchStoryState;
