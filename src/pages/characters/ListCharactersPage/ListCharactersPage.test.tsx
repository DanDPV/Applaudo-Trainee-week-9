/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import store from 'store/store';
import ListCharactersPage from './ListCharactersPage';

describe('Test on ListCharactersPage component', () => {
  test('Should render component correctly', () => {
    const container = render(
      <Provider store={store}>
        <BrowserRouter>
          <ListCharactersPage />
        </BrowserRouter>
      </Provider>,
    );
    expect(container.baseElement).toMatchSnapshot();
  });
});
