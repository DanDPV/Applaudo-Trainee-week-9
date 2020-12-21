import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import ViewCharacterPage from 'pages/characters/ViewCharacterPage';
import MenuLayoutRouter from 'routers/MenuLayoutRouter/MenuLayoutRouter';
import RouteNames from 'routers/RouteNames';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path={RouteNames.ViewCharacterPage} component={ViewCharacterPage} />
      <Route path={RouteNames.Home} component={MenuLayoutRouter} />
    </Switch>
  </Router>
);

export default AppRouter;
