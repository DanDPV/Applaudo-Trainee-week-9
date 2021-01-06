/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';
import store from 'store/store';
import ListComicsPage from './ListComicsPage';

describe('Test on ListComicsPage', () => {
  test('Should render component correctly', async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListComicsPage />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(container.querySelector('.card')).not.toBeNull();
      expect(container.querySelector('.loading-container')).toBeNull();
      expect(container).toMatchSnapshot();
    });
  });

  test('should show typed title on input', async () => {
    const search = 'x-men';
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ListComicsPage />
        </MemoryRouter>
      </Provider>,
    );

    userEvent.type(screen.getByPlaceholderText(/Comic's title/i), search);
    expect((screen.getByPlaceholderText(/Comic's title/i) as HTMLInputElement).value).toBe(search);
  });

  test('should add/remove bookmark', async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListComicsPage />
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
          <ListComicsPage />
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
});
