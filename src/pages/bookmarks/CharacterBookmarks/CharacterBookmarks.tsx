/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/store';

const CharacterBookmarks = () => {
  const { bookmarks } = useSelector((state: IRootState) => state.localItems);

  return (
    <div>
      <h1>CharacterBookmarks</h1>
    </div>
  );
};

export default CharacterBookmarks;
