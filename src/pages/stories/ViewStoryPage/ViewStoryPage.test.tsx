/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { screen, waitFor } from '@testing-library/react';
import store from 'store/store';
import { renderWithRouter } from 'tests/utils';
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
});
