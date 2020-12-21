import React from 'react';
import 'components/Blockquote/Blockquote.scss';

interface IBlockquote {
  author: string;
  quote: string;
}

const Blockquote = ({ author, quote }: IBlockquote) => (
  <div className="quote fade-in">
    <span className="left">❝</span>
    <blockquote>{quote}</blockquote>
    <small className="blockquote-author">{author}</small>
    <span className="right">❞</span>
  </div>
);

export default Blockquote;
