/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import store from 'store/store';
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

  test('should filtered characters by name', async () => {
    const searchValue = 'spid';
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ListCharactersPage />
        </BrowserRouter>
      </Provider>,
    );

    userEvent.type(screen.getByPlaceholderText(/Hero´s name/i), searchValue);

    await waitFor(() => {
      expect(container.querySelector('.card')).not.toBeNull();
      expect(container.querySelector('.loading-container')).toBeNull();
      expect((screen.getByPlaceholderText(/Hero´s name/i) as HTMLInputElement).value).toBe(searchValue);
    });
  });
});
