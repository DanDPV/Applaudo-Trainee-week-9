import {
  ISetOffset,
  ISetBaseUrl,
  IReset,
  ISetAllParams,
  ISetName,
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

const setName = (name: string): ISetName => ({
  type: 'SET_NAME',
  payload: {
    name,
  },
});

const setAllParams = (offset: number, name: string): ISetAllParams => ({
  type: 'SET_ALL_PARAMS',
  payload: {
    offset,
    name,
  },
});

const reset = (): IReset => ({
  type: 'RESET',
});

export {
  setBaseUrl,
  setOffset,
  setName,
  setAllParams,
  reset,
};
