import IComic from 'interfaces/IComic';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';

interface ISearchComicState {
  offset: number;
  limit: number;
  baseUrl: string;
  url: string;
  format: string;
  title: string;
  loading: boolean;
  error: string;
  data: IGenericApiResponse<IComic> | null;
}

export default ISearchComicState;
