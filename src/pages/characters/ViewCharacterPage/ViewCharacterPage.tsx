import React from 'react';
import { useParams } from 'react-router-dom';

const ViewCharacterPage = () => {
  interface pathParams {
    idCharacter: string;
  }
  const { idCharacter } = useParams<pathParams>();

  return <h1>{idCharacter}</h1>;
};

export default ViewCharacterPage;
