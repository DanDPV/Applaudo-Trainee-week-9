import React from 'react';
import { shortenText } from 'utils/utils';
import 'components/Card/Card.scss';

interface ICard {
  name: string;
  description: string;
  imageUrl: string;
}

const Card = ({ name, description, imageUrl }: ICard) => (
  <div
    className="card"
    style={{
      backgroundImage: `url(${imageUrl})`,
    }}
  >
    <div className="content">
      <h2 className="title">{name}</h2>
      <p className="copy">
        {shortenText(description, 50)}
      </p>
      <button type="button" className="btn">
        View More
      </button>
    </div>
  </div>
);

export default Card;
