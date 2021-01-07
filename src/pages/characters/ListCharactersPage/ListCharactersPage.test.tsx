/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';
import { rest } from 'msw';
import configureStore from 'redux-mock-store';

import store from 'store/store';
import { setName } from 'actions/search';
import { addBookmark } from 'actions/localItems';
import server from 'mocks/server';
import ListCharactersPage from './ListCharactersPage';

describe('Test on ListCharactersPage component', () => {
  test('Should render component correctly', async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListCharactersPage />
        </MemoryRouter>
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
        <MemoryRouter>
          <ListCharactersPage />
        </MemoryRouter>
      </Provider>,
    );

    userEvent.type(screen.getByPlaceholderText(/Hero´s name/i), search);
    expect((screen.getByPlaceholderText(/Hero´s name/i) as HTMLInputElement).value).toBe(search);
  });

  test('should add/remove bookmark', async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListCharactersPage />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(container.querySelector('.card')).not.toBeNull();
      expect(container.querySelector('.loading-container')).toBeNull();
    });

    userEvent.click(container.querySelector('.btn-bookmark') as TargetElement);

    expect(container.querySelector('.bookmark-selected')).not.toBe(null);

    userEvent.click(container.querySelector('.btn-bookmark') as TargetElement);

    expect(container.querySelector('.bookmark-selected')).toBe(null);
  });

  test('should hide card', async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListCharactersPage />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(container.querySelector('.card')).not.toBeNull();
      expect(container.querySelector('.loading-container')).toBeNull();
    });

    userEvent.click(container.querySelector('.btn-hide') as TargetElement);

    expect(container.querySelector('.card')).toBeNull();
  });

  test('should handle api error', async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_API_URL}v1/public/characters`, (req, res, ctx) => {
        return res(
          ctx.status(404),
        );
      }),
    );

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListCharactersPage />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Could not load characters 😓/i)).toBeInTheDocument();
      expect(container.querySelector('.card')).toBeNull();
      expect(container.querySelector('.pagination-options')).toBeNull();
    });
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
      data: {
        data: {
          offset: 0,
          limit: 12,
          total: 1,
          count: 1,
          results: [
            {
              id: 1,
              name: 'spiderman',
              description: 'description',
              thumbnail: {
                path: 'path',
                extension: 'jpg',
              },
            },
          ],
        },
      },
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

  test('should dispatch add bookmark', () => {
    const { container } = render(
      <Provider store={testStore}>
        <MemoryRouter>
          <ListCharactersPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(container.querySelector('.card')).not.toBeNull();
    userEvent.click(container.querySelector('.btn-bookmark') as TargetElement);
    expect(testStore.dispatch).toHaveBeenCalledWith(addBookmark({ id: 1, type: 'CHARACTER' }));
  });
});
