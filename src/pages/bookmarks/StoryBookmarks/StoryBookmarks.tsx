/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import IStory from 'interfaces/IStory';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'store/store';
import { get } from 'API/FetchInfo';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import { imagePlaceholder } from 'utils/globals';
import Card from 'components/Card/Card';
import { addBookmark, hideLocalItem, removeBookmark } from 'actions/localItems';
import 'pages/bookmarks/common/styles.scss';

const StoryBookmarks = () => {
  const { hiddenItems, bookmarks } = useSelector((state: IRootState) => state.localItems);
  const history = useHistory();
  const dispatch = useDispatch();

  const [stories, setStories] = useState<IStory[]>([]);
  const [loading, setLoading] = useState(false);

  const handleViewMore = (id: number) => history.push(`/comics/${id}`);

  const handleHideItem = (id: number) => {
    dispatch(hideLocalItem({ id, type: 'STORY' }));
    setStories(char => [...char.filter(c => c.id !== id)]);
  };

  const handleAddBookmark = (id: number) => dispatch(addBookmark({ id, type: 'STORY' }));

  const handleRemoveBookmark = (id: number) => {
    dispatch(removeBookmark({ id, type: 'STORY' }));
    setStories(char => [...char.filter(c => c.id !== id)]);
  };

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
    <div className="main-content mb-5">
      <div className="bookmarks-title-div">
        <h1>Story Bookmarks</h1>
      </div>
      <div className="cards">
        <div className="cards-content">
          {!loading
            && stories
            && stories.map(story => {
              const inBookmark = bookmarks.find(item => item.type === 'STORY' && item.id === story.id);
              return (
                <Card
                  key={story.id}
                  id={story.id}
                  name={story.title}
                  description={story.description ?? ''}
                  bookmarkIcon={inBookmark ? faBookmarkSolid : faBookmarkRegular}
                  handleViewMore={handleViewMore}
                  handleHideItem={handleHideItem}
                  handleBookmarkAction={inBookmark ? handleRemoveBookmark : handleAddBookmark}
                  imageUrl={story.thumbnail
                    ? `${story.thumbnail.path}/portrait_uncanny.${story.thumbnail.extension}`
                    : imagePlaceholder}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default StoryBookmarks;
