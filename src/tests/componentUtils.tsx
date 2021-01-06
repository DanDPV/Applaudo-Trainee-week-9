/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { MemoryHistory } from 'history';
import store from 'store/store';
import MenuLayoutRouter from 'routers/MenuLayoutRouter/MenuLayoutRouter';
import FooterLayoutRoute from 'routers/FooterLayoutRoute/FooterLayoutRoute';
import RouteNames from 'routers/RouteNames';
import ViewCharacterPage from 'pages/characters/ViewCharacterPage/ViewCharacterPage';
import ViewComicPage from 'pages/comics/ViewComicPage/ViewComicPage';
import ViewStoryrPage from 'pages/stories/ViewStoryPage/ViewStoryPage';

const renderWithCustomHistory = (history: MemoryHistory) => {
  return render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <FooterLayoutRoute
            exact
            path={RouteNames.ViewCharacterPage}
            component={ViewCharacterPage}
          />
          <FooterLayoutRoute
            exact
            path={RouteNames.ViewComicPage}
            component={ViewComicPage}
          />
          <FooterLayoutRoute
            exact
            path={RouteNames.ViewStoryPage}
            component={ViewStoryrPage}
          />
          <Route path={RouteNames.Home} component={MenuLayoutRouter} />
        </Switch>
      </Router>
    </Provider>,
  );
};

export { renderWithCustomHistory };
