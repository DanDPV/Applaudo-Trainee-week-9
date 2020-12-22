import Loading from 'components/Loading/Loading';
import Navbar from 'components/Navbar/Navbar';
import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import RouteNames from 'routers/RouteNames';
import Footer from 'components/Footer/Footer';
import 'routers/MenuLayoutRouter/MenuLayoutRouter.scss';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const ListCharactersPage = lazy(() => import('pages/characters/ListCharactersPage'));

const MenuLayoutRouter = () => (
  <div className="page-container">
    <div className="content-wrap">
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path={RouteNames.ListCharactersPage} component={ListCharactersPage} />
          <Route path={RouteNames.Home} component={HomePage} />
        </Switch>
      </Suspense>
    </div>
    <Footer />
  </div>
);

export default MenuLayoutRouter;
