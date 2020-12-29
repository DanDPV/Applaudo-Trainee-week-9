/* eslint-disable no-unused-vars */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
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
      <div className="card-actions">
        <button
          type="button"
          className="btn btn-more"
          onClick={() => handleViewMore(id)}
        >
          View More
        </button>
        <button
          type="button"
          className="btn btn-action"
        >
          <FontAwesomeIcon icon={faEyeSlash} />
        </button>
        <button
          type="button"
          className="btn btn-action"
        >
          <FontAwesomeIcon icon={faBookmark} />
        </button>
      </div>
    </div>
  </div>
);

export default Card;
