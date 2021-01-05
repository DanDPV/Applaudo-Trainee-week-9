/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import store from 'store/store';
import { setAllParams, setName } from 'actions/search';
import ListCharactersPage from './ListCharactersPage';

describe('Test on ListCharactersPage component', () => {
  test('Should render component correctly', async () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ListCharactersPage />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(container.querySelector('.card')).not.toBeNull();
      expect(container.querySelector('.loading-container')).toBeNull();
      expect(container).toMatchSnapshot();
    });
  });

  test('should show typed name on input', async () => {
    const search = 'spid';
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ListCharactersPage />
        </BrowserRouter>
      </Provider>,
    );

    userEvent.type(screen.getByPlaceholderText(/Hero´s name/i), search);
    expect((screen.getByPlaceholderText(/Hero´s name/i) as HTMLInputElement).value).toBe(search);
  });
});

describe('Mock store tests', () => {
  const mockStore = configureStore();

  const initialState = {
    search: {
      offset: 0,
      limit: 12,
      baseUrl: '',
      url: '',
      name: '',
      comic: '',
      story: '',
      loading: false,
      error: '',
      data: null,
    },
    localItems: {
      hiddenItems: [],
      bookmarks: [],
    },
  };
  const testStore = mockStore(initialState);

  testStore.dispatch = jest.fn();

  jest.mock('actions/search', () => ({
    setBaseUrl: jest.fn(),
    setName: jest.fn(),
    setAllParams: jest.fn(),
  }));

  beforeEach(() => {
    testStore.clearActions();
    jest.clearAllMocks();
  });

  test('should call set name dispatch while typing name', async () => {
    const searchValue = 'spid';
    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <ListCharactersPage />
        </MemoryRouter>
      </Provider>,
    );

    userEvent.type(screen.getByPlaceholderText(/Hero´s name/i), searchValue);

    const searchValueArray = searchValue.split('');
    // eslint-disable-next-line max-len
    searchValueArray.forEach(letter => expect(testStore.dispatch).toHaveBeenCalledWith(setName(letter)));
  });
});
