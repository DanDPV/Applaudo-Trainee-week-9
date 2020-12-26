/* eslint-disable no-undef */
/* eslint react/jsx-props-no-spreading: 0 */
/* eslint no-shadow: 0 */
/* eslint no-confusing-arrow: 0 */
import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import Footer from 'components/Footer/Footer';
import 'routers/FooterLayoutRoute/FooterLayoutRoute.scss';

interface IFooterLayouteRoute {
  component: React.ElementType;
  exact: boolean;
  path: string;
}

const FooterLayoutRoute = ({
  component: Component,
  exact,
  path,
}: IFooterLayouteRoute) => (
  <Route
    exact={exact}
    path={path}
    component={(props: RouteComponentProps) => (
      <div className="page-container">
        <div className="content-wrap">
          <Component {...props} />
        </div>
        <Footer />
      </div>
    )}
  />
);

export default FooterLayoutRoute;
