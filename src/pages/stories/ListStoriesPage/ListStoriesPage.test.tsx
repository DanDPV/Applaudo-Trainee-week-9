/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';
import { rest } from 'msw';

import store from 'store/store';
import server from 'mocks/server';
import { emptyResponse } from 'mocks/testData';
import ListStoriesPage from './ListStoriesPage';

describe('Test on ListStoriesPage', () => {
  test('Should render component correctly', async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListStoriesPage />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(container.querySelector('.card')).not.toBeNull();
      expect(container.querySelector('.loading-container')).toBeNull();
      expect(container).toMatchSnapshot();
    });
  });

  test('should add/remove bookmark', async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListStoriesPage />
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
          <ListStoriesPage />
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

  test('should handle no results', async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_API_URL}v1/public/stories`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(emptyResponse()),
        );
      }),
    );

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListStoriesPage />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Stories not found 😮/i)).toBeInTheDocument();
      expect(container.querySelector('.card')).toBeNull();
      expect(container.querySelector('.pagination-options')).toBeNull();
    });
  });

  test('should handle api error', async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_API_URL}v1/public/stories`, (req, res, ctx) => {
        return res(
          ctx.status(404),
        );
      }),
    );

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListStoriesPage />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Could not load stories 😓/i)).toBeInTheDocument();
      expect(container.querySelector('.card')).toBeNull();
      expect(container.querySelector('.pagination-options')).toBeNull();
    });
  });
});
