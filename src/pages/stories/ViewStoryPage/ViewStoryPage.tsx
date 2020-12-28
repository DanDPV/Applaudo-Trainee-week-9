import React from 'react';
import { useParams } from 'react-router-dom';

const ViewStoryPage = () => {
  interface pathParams {
    idStory: string;
  }

  const { idStory } = useParams<pathParams>();

  return (
    <div>
      <h1>{idStory}</h1>
    </div>
  );
};

export default ViewStoryPage;
