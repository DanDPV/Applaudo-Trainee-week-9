import React from 'react';
import spiderman from 'static/spiderman.png';
import 'pages/HomePage/HomePage.scss';

const HomePage = () => (
  <div className="main-content">
    <div className="intro-block">
      <div className="intro-text">
        The Marvel Universe is a fictional universe where the stories in most
        American comic book titles and other media published by Marvel Comics
        take place. Super-teams such as the Avengers, the X-Men, the Fantastic
        Four, the Guardians of the Galaxy, the Defenders, the Midnight Sons, and
        many Marvel superheroes live in this universe
      </div>
      <div className="intro-image">
        <img src={spiderman} alt="spiderman" />
      </div>
    </div>
  </div>
);

export default HomePage;
