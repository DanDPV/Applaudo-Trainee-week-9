/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import IStory from 'interfaces/IStory';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/store';
import { get } from 'API/FetchInfo';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';

const StoryBookmarks = () => {
  const { hiddenItems, bookmarks } = useSelector((state: IRootState) => state.localItems);

  const [stories, setStories] = useState<IStory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const storiesBookmarks = bookmarks.filter(item => item.type === 'STORY');
    const hiddenStories = hiddenItems.filter(item => item.type === 'STORY');
    storiesBookmarks.forEach((bStory, index, arr) => {
      const validateVisibility = hiddenStories.filter(item => item.id === bStory.id);
      if (validateVisibility.length === 0) {
        const url = `${process.env.REACT_APP_API_URL}v1/public/stories/${bStory.id}?${queryString.stringify({
          apikey: process.env.REACT_APP_PUBLIC_KEY,
        })}`;
        get<IGenericApiResponse<IStory>>(url)
          .then(res => {
            const { data: comicData } = res ?? {};
            const { results: comicResult } = comicData ?? {};
            setStories(c => [...c, comicResult[0]]);
            if (index === arr.length - 1) setLoading(false);
          });
      }
      if (index === arr.length - 1) setLoading(false);
    });
    setLoading(false);
  }, []);

  return (
    <div>
      <h1>Story bookmarks</h1>
    </div>
  );
};

export default StoryBookmarks;
