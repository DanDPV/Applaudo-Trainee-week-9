import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loading from 'components/Loading/Loading';
import MenuLayoutRouter from 'routers/MenuLayoutRouter/MenuLayoutRouter';
import FooterLayoutRoute from 'routers/FooterLayoutRoute/FooterLayoutRoute';
import RouteNames from 'routers/RouteNames';

const ViewCharacterPage = lazy(() => import('pages/characters/ViewCharacterPage/ViewCharacterPage'));

const AppRouter = () => (
  <Router>
    <Suspense fallback={<Loading />}>
      <Switch>
        <FooterLayoutRoute
          exact
          path={RouteNames.ViewCharacterPage}
          component={ViewCharacterPage}
        />
        <Route path={RouteNames.Home} component={MenuLayoutRouter} />
      </Switch>
    </Suspense>
  </Router>
);

export default AppRouter;
