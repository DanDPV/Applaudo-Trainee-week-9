/* eslint-disable no-unused-vars */
import React from 'react';
import { shortenText } from 'utils/utils';
import 'components/Card/Card.scss';

interface ICard {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  handleViewMore(id: number): void;
}

const Card = ({
  id,
  name,
  description,
  imageUrl,
  handleViewMore,
}: ICard) => (
  <div
    className="card"
    style={{
      backgroundImage: `url(${imageUrl})`,
    }}
  >
    <div className="content">
      <h2 className="title">{shortenText(name, 20)}</h2>
      <p className="copy">{shortenText(description, 50)}</p>
      <button
        type="button"
        className="btn"
        onClick={() => handleViewMore(id)}
      >
        View More
      </button>
    </div>
  </div>
);

export default Card;
