/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/store';

const StoryBookmarks = () => {
  const { hiddenItems, bookmarks } = useSelector((state: IRootState) => state.localItems);

  return (
    <div>
      <h1>Story bookmarks</h1>
    </div>
  );
};

export default StoryBookmarks;
