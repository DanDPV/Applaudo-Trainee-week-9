import Loading from 'components/Loading/Loading';
import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import RouteNames from 'routers/RouteNames';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const ListCharactersPage = lazy(() => import('pages/characters/ListCharactersPage'));

const MenuLayoutRouter = () => (
  <div className="page-container">
    <div className="content-wrap">
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path={RouteNames.ListCharactersPage} component={ListCharactersPage} />
          <Route path={RouteNames.Home} component={HomePage} />
        </Switch>
      </Suspense>
    </div>
  </div>
);

export default MenuLayoutRouter;
