import React from 'react';
import spiderman from 'static/spiderman.png';
import 'pages/HomePage/HomePage.scss';
import Blockquote from 'components/Blockquote/Blockquote';

const HomePage = () => {
  const author = 'Stan Lee';
  const quote = 'That’s what any story should have, but comics didn’t have until that point, They were all cardboard figures.';

  return (
    <div className="main-content">
      <div className="intro-block">
        <div className="intro-text">
          The Marvel Universe is a fictional universe where the stories in most
          American comic book titles and other media published by Marvel Comics
          take place. Super-teams such as the Avengers, the X-Men, the Fantastic
          Four, the Guardians of the Galaxy, the Defenders, the Midnight Sons,
          and many Marvel superheroes live in this universe
        </div>
        <div className="intro-image">
          <img src={spiderman} alt="spiderman" />
        </div>
      </div>

      <div className="stan-block">
        <div className="stan-image" />
        <div className="stan-text">
          Under Mr. Lee, Marvel transformed the comic book world by imbuing its
          characters with the self-doubts and neuroses of average people, as
          well an awareness of trends and social causes and, often, a sense of
          humor.
          <br />
          <br />
          In humanizing his heroes, giving them character flaws and insecurities
          that belied their supernatural strengths, Mr. Lee tried “to make them
          real flesh-and-blood characters with personality,” he told The
          Washington Post in 1992.
        </div>
      </div>

      <Blockquote author={author} quote={quote} />
    </div>
  );
};

export default HomePage;
