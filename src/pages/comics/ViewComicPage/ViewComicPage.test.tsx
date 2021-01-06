/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import store from 'store/store';
import { renderWithRouter } from 'tests/utils';
import ViewComicPage from './ViewComicPage';

describe('Test on ViewComicPage component', () => {
  test('should render component correctly', async () => {
    const { container } = renderWithRouter(
      <Provider store={store}>
        <ViewComicPage />
      </Provider>,
      { route: '/comics/1' },
    );

    await waitFor(() => {
      expect(container.querySelector('.image-header-title')).not.toBeNull();
      expect(container).toMatchSnapshot();
    });
  });

  test('should show character and story list correctly', async () => {
    const { container } = renderWithRouter(
      <Provider store={store}>
        <ViewComicPage />
      </Provider>,
      { route: '/comics/1' },
    );

    await waitFor(() => {
      expect(container.querySelector('.image-header-title')).not.toBeNull();
    });

    expect(screen.getByText(/Char Spiderman/i)).toBeInTheDocument();
    expect(screen.getByText(/Spiderman Story/i)).toBeInTheDocument();
  });

  test('should Add/Remove bookmark', async () => {
    const { container } = renderWithRouter(
      <Provider store={store}>
        <ViewComicPage />
      </Provider>,
      { route: '/comics/1' },
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
});
