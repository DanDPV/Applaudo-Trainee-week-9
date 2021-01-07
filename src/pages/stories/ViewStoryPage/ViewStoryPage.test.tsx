/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { createMemoryHistory } from 'history';

import store from 'store/store';
import { renderWithRouter } from 'tests/utils';
import { renderWithCustomHistory } from 'tests/componentUtils';
import server from 'mocks/server';
import ViewStoryPage from './ViewStoryPage';

describe('Test on ViewStoryPage', () => {
  test('should render component correctly', async () => {
    const { container } = renderWithRouter(
      <Provider store={store}>
        <ViewStoryPage />
      </Provider>,
      { route: '/stories/1' },
    );

    await waitFor(() => {
      expect(container.querySelector('.image-header-title')).not.toBeNull();
      expect(screen.getByText(/Original Issue/i)).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });

  test('should show character and comic list correctly', async () => {
    const { container } = renderWithRouter(
      <Provider store={store}>
        <ViewStoryPage />
      </Provider>,
      { route: '/stories/1' },
    );

    await waitFor(() => {
      expect(container.querySelector('.image-header-title')).not.toBeNull();
    });

    expect(screen.getByText(/Char Spiderman/i)).toBeInTheDocument();
    expect(screen.getByText(/Spiderman Comic/i)).toBeInTheDocument();
  });

  test('should Add/Remove bookmark', async () => {
    const { container } = renderWithRouter(
      <Provider store={store}>
        <ViewStoryPage />
      </Provider>,
      { route: '/stories/1' },
    );

    await waitFor(() => {
      expect(container.querySelector('.image-header-title')).not.toBeNull();
    });

    expect(screen.getByText(/Add bookmark/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Add bookmark/i));
    expect(screen.getByText(/Remove bookmark/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Remove bookmark/i));
    expect(screen.getByText(/Add bookmark/i)).toBeInTheDocument();
  });

  test('should hide item', async () => {
    const history = createMemoryHistory();
    history.push('/stories');
    history.push('/stories/1');
    const { container } = renderWithCustomHistory(history);

    await waitFor(() => {
      expect(container.querySelector('.image-header-title')).not.toBeNull();
    });

    expect(screen.getByText(/Hide item/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Hide item/i));
    await waitFor(() => {
      expect(container.querySelector('.card')).toBeNull();
      expect(container.querySelector('.loading-container')).toBeNull();
      expect(screen.getByText(/Stories on this page are hidden 🤐/i)).toBeInTheDocument();
    });
  });

  test('should handle api error', async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_API_URL}v1/public/stories/:idStory`, (req, res, ctx) => {
        return res(
          ctx.status(404),
        );
      }),
    );

    renderWithRouter(
      <Provider store={store}>
        <ViewStoryPage />
      </Provider>,
      { route: '/stories/1' },
    );

    await waitFor(() => {
      expect(screen.getByText(/Could not load story 😓/i)).toBeInTheDocument();
    });
  });
});
