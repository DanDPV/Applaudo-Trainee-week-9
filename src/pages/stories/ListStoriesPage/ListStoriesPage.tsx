/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint no-shadow: 0 */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { IRootState } from 'store/store';
import Card from 'components/Card/Card';
import Loading from 'components/Loading/Loading';
import Pagination from 'components/Pagination/Pagination';
import { getQueryVariable } from 'utils/utils';
import IStory from 'interfaces/IStory';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import { get } from 'API/FetchInfo';
import { imagePlaceholder } from 'utils/globals';
import {
  setStoryBaseUrl,
  setStoryAllParams,
  setStoryAsyncContent,
  storyReset,
} from 'actions/searchStory';
import { addBookmark, hideLocalItem, removeBookmark } from 'actions/localItems';
import 'pages/stories/ListStoriesPage/ListStoriesPage.scss';

const ListStoriesPage = () => {
  enum QuerysParams {
    Page = 'page',
    Title = 'title',
  }

  const history = useHistory();
  const dispatch = useDispatch();
  const {
    url,
    limit,
    title,
    loading,
    error,
    data: genericResponse,
  } = useSelector((state: IRootState) => state.searchStory);
  const { hiddenItems, bookmarks } = useSelector((state: IRootState) => state.localItems);

  const { data } = genericResponse ?? {};
  const { results } = data ?? {};
  const [stories, setStories] = useState<IStory[] | null>(null);

  const changeUrlParams = (
    newPage: number,
    newTitle: string,
  ) => {
    history.push(
      `?${queryString.stringify({
        page: newPage,
        title: newTitle === '' ? undefined : newTitle,
      })}`,
    );
  };

  const handleChangePage = (newPage: number) => {
    window.scrollTo({ top: 300 });
    changeUrlParams(newPage, title);
  };

  const handleViewMore = (id: number) => history.push(`stories/${id}`);

  const handleHideItem = (id: number) => dispatch(hideLocalItem({ id, type: 'STORY' }));

  const handleAddBookmark = (id: number) => dispatch(addBookmark({ id, type: 'STORY' }));

  const handleRemoveBookmark = (id: number) => dispatch(removeBookmark({ id, type: 'STORY' }));

  useEffect(() => {
    dispatch(setStoryBaseUrl(`${process.env.REACT_APP_API_URL}v1/public/stories`));

    return () => {
      dispatch(storyReset());
    };
  }, []);

  useEffect(() => {
    const newPage = getQueryVariable(QuerysParams.Page)
      ? +getQueryVariable(QuerysParams.Page)
      : 1;

    const newTitle = getQueryVariable(QuerysParams.Title)
      ? decodeURI(getQueryVariable(QuerysParams.Title))
      : '';

    const newOffset = Math.ceil((newPage - 1) * limit);

    dispatch(setStoryAllParams(newOffset, newTitle));
  }, [history.location, limit]);

  useEffect(() => {
    if (url) {
      dispatch(setStoryAsyncContent(true, '', null));
      get<IGenericApiResponse<IStory>>(url)
        .then(res => {
          dispatch(setStoryAsyncContent(false, '', res));
        })
        .catch(() => {
          dispatch(setStoryAsyncContent(false, 'Could not load stories', null));
        });
    }
  }, [url]);

  useEffect(() => {
    if (results) {
      const hiddenStories = hiddenItems.filter(item => item.type === 'STORY');
      setStories(results.filter(char => {
        const hiddenStoryFilter = hiddenStories.filter(item => item.id === char.id);
        if (hiddenStoryFilter.length > 0) {
          return false;
        }
        return true;
      }));
    }
  }, [results, hiddenItems]);

  return (
    <div className="story-main-content mb-5">
      <div className="story-page-title-div">
        <h1>Stories</h1>
      </div>
      {loading && <Loading />}
      {error && <h2 className="error-message">Could not load comics 😓</h2>}
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
      {results && results.length <= 0 && (
        <h2 className="error-message">Stories not found 😮</h2>
      )}
      {!loading && stories && stories.length <= 0 && (
        <h2 className="error-message">Stories on this page are hidden 🤐</h2>
      )}
      {!loading
      && !error
      && results
      && genericResponse
      && results.length > 0
      && (
        <Pagination
          genericResponse={genericResponse}
          onChange={handleChangePage}
        />
      )}
    </div>
  );
};

export default ListStoriesPage;
