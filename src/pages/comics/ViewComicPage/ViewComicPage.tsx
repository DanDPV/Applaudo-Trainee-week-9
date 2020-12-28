import React from 'react';
import { useParams } from 'react-router-dom';

const ViewComicPage = () => {
  interface pathParams {
    idComic: string;
  }

  const { idComic } = useParams<pathParams>();

  return <h1>{idComic}</h1>;
};

export default ViewComicPage;
