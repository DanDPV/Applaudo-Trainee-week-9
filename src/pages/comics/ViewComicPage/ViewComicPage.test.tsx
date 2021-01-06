/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { waitFor } from '@testing-library/react';
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
});
