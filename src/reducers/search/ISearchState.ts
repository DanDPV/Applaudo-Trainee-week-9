import ICharacter from 'interfaces/ICharacter';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';

interface ISearchState {
  offset: number;
  limit: number;
  baseUrl: string;
  url: string;
  name: string;
  comic: string;
  story: string;
  loading: boolean;
  error: string;
  data: IGenericApiResponse<ICharacter> | null;
}

export default ISearchState;
