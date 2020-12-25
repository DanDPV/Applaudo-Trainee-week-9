/* eslint jsx-a11y/label-has-associated-control: 0 */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import RouteNames from 'routers/RouteNames';
import 'components/Navbar/Navbar.scss';
import useWindowDimensions from 'hooks/useWindowDimensions';

const Navbar = () => {
  const { width } = useWindowDimensions();

  return (
    <nav>
      <button type="button" className="logo logo-button">
        { width > 350 ? 'Marvel Heroes' : 'Marvel'}
      </button>
      <label htmlFor="toggle" className="menu-label">
        <FontAwesomeIcon icon={faBars} />
      </label>
      <input
        name="toggle"
        id="toggle"
        type="checkbox"
        className="menu-button"
      />
      <ul>
        <li>
          <NavLink className="link" exact to={RouteNames.Home}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="link" exact to={RouteNames.ListCharactersPage}>
            Characters
          </NavLink>
        </li>
        <li>
          <NavLink className="link" exact to={RouteNames.ListComicsPage}>
            Comics
          </NavLink>
        </li>
        <li>
          <NavLink className="link" exact to={RouteNames.ListStoriesPage}>
            Stories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
