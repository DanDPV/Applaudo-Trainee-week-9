import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import { NavLink } from 'react-router-dom';
import RouteNames from 'routers/RouteNames';
import 'components/Footer/Footer.scss';

const Footer = () => (
  <footer className="footer">
    <div className="footer-right">
      <a href="https://www.facebook.com/Marvel/">
        <FontAwesomeIcon icon={faFacebookF} />
      </a>
      <a href="https://twitter.com/marvel">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
    </div>

    <div className="footer-left">
      <p className="footer-links">
        <NavLink exact to={RouteNames.Home} className="link-1 footer-link">
          Home
        </NavLink>
        <NavLink
          exact
          to={RouteNames.ListCharactersPage}
          className="footer-link"
        >
          Characters
        </NavLink>
        <NavLink
          exact
          to={RouteNames.ListComicsPage}
          className="footer-link"
        >
          Comics
        </NavLink>
        <NavLink
          exact
          to={RouteNames.ListStoriesPage}
          className="footer-link"
        >
          Stories
        </NavLink>
        <NavLink
          exact
          to={RouteNames.CharacterBookmarks}
          className="footer-link"
        >
          Bookmarks
        </NavLink>
      </p>
      <p>Marvel &copy; 2020</p>
    </div>
  </footer>
);

export default Footer;
