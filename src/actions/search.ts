import {
  ISetOffset,
  ISetBaseUrl,
  IReset,
  ISetAllParams,
  ISetName,
  ISetComic,
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

const setComic = (comic: string): ISetComic => ({
  type: 'SET_COMIC',
  payload: {
    comic,
  },
});

const setAllParams = (offset: number, name: string, comic: string): ISetAllParams => ({
  type: 'SET_ALL_PARAMS',
  payload: {
    offset,
    name,
    comic,
  },
});

const reset = (): IReset => ({
  type: 'RESET',
});

export {
  setBaseUrl,
  setOffset,
  setName,
  setComic,
  setAllParams,
  reset,
};
