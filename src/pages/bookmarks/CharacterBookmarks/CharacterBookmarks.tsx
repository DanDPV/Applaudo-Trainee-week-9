/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/store';
import 'pages/bookmarks/common/styles.scss';

const CharacterBookmarks = () => {
  const { bookmarks } = useSelector((state: IRootState) => state.localItems);

  return (
    <div className="main-content mb-5">
      <div className="bookmarks-title-div">
        <h1>Character Bookmarks</h1>
      </div>
    </div>
  );
};

export default CharacterBookmarks;
