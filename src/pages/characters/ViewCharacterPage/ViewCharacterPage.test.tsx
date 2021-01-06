/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { screen, waitFor } from '@testing-library/react';
import store from 'store/store';
import { renderWithRouter } from 'tests/utils';
import ViewCharacterPage from './ViewCharacterPage';

describe('Test in ViewCharacterPage component', () => {
  test('should render component correctly', async () => {
    const { container } = renderWithRouter(
      <Provider store={store}>
        <ViewCharacterPage />
      </Provider>, { route: '/characters/1' },
    );

    await waitFor(() => {
      expect(container.querySelector('.image-header-title')).not.toBeNull();
      expect(container.querySelector('.image-header-title')?.innerHTML).toBe('spiderman');
      expect(container).toMatchSnapshot();
    });
  });

  test('should show comic and story list correctly', async () => {
    const { container } = renderWithRouter(
      <Provider store={store}>
        <ViewCharacterPage />
      </Provider>,
      { route: '/characters/1' },
    );

    await waitFor(() => {
      expect(container.querySelector('.image-header-title')).not.toBeNull();
    });

    expect(screen.getByText(/Spiderman Comic/i)).toBeInTheDocument();
    expect(screen.getByText(/Spiderman Story/i)).toBeInTheDocument();
  });
});
