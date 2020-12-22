import React from 'react';
import drStrangeSprite from 'static/dr-strange-sprite.gif';
import 'components/Loading/Loading.scss';

const Loading = () => (
  <div className="loading-container">
    <img src={drStrangeSprite} alt="dr stange" className="loading-image" />
    <h2 className="loading-text bop">Loading...</h2>
    <img src={drStrangeSprite} alt="dr stange" className="loading-image flip-image" />
  </div>
);

export default Loading;
