import {
  ISetOffset,
  ISetBaseUrl,
  IReset,
} from 'reducers/search/search.actions';

const setBaseUrl = (baseUrl: string): ISetBaseUrl => ({
  type: 'SET_BASE_URL',
  payload: {
    baseUrl,
  },
});

const setOffset = (offset: number): ISetOffset => ({
  type: 'SET_OFFSET',
  payload: {
    offset,
  },
});

const reset = (): IReset => ({
  type: 'RESET',
});

export { setBaseUrl, setOffset, reset };
