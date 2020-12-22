interface ISearchState {
  offset: number;
  limit: number;
  total: number;
  count: number;
  baseUrl: string;
  url: string;
}

export default ISearchState;
