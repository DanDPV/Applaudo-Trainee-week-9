import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faEyeSlash,
  faBookmark as faBookmarkSolid,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import queryString from 'query-string';
import { IRootState } from 'store/store';
import { get } from 'API/FetchInfo';
import RouteNames from 'routers/RouteNames';
import { setViewItemAsyncContent } from 'actions/viewItem';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import IStory from 'interfaces/IStory';
import IComic from 'interfaces/IComic';
import { imagePlaceholder } from 'utils/globals';
import CustomOrderedList from 'components/CustomOrderedList/CustomOrderedList';
import Loading from 'components/Loading/Loading';
import { addBookmark, hideLocalItem, removeBookmark } from 'actions/localItems';
import 'pages/stories/ViewStoryPage/ViewStoryPage.scss';

const ViewStoryPage = () => {
  interface pathParams {
    idStory: string;
  }

  const isMounted = useRef(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const { idStory } = useParams<pathParams>();
  const { loading, error, data: genericResponse } = useSelector(
    (state: IRootState) => state.viewItem,
  );
  const { hiddenItems, bookmarks } = useSelector((state: IRootState) => state.localItems);

  const { data } = genericResponse ?? {};
  const { results } = data ?? {};
  const [story, setStory] = useState<IStory | null>(null);
  const [originalIssue, setOriginalIssue] = useState<IComic | null>(null);
  const [inBookmark, setInBookmark] = useState(
    !!bookmarks.find(
      item => item.type === 'STORY' && item.id === parseFloat(idStory),
    ),
  );
  const [bookmarkIcon, setBookmarkIcon] = useState<IconDefinition>(
    inBookmark ? faBookmarkSolid : faBookmarkRegular,
  );
  const [hidden] = useState(
    !!hiddenItems.find(
      item => item.type === 'STORY' && item.id === parseFloat(idStory),
    ),
  );

  const handleBack = () => {
    if (history.length <= 2) history.push(RouteNames.Home);
    else history.goBack();
  };

  const handleViewChar = (id: string) => history.push(`/characters/${id}`);

  const handleViewComic = (id: string) => history.push(`/comics/${id}`);

  const handleAddBookmark = (id: number) => {
    dispatch(addBookmark({ id, type: 'STORY' }));
    setBookmarkIcon(faBookmarkSolid);
    setInBookmark(true);
  };

  const handleRemoveBookmark = (id: number) => {
    dispatch(removeBookmark({ id, type: 'STORY' }));
    setBookmarkIcon(faBookmarkRegular);
    setInBookmark(false);
  };

  const handleHideItem = (id: number) => {
    dispatch(hideLocalItem({ id, type: 'STORY' }));
    handleBack();
  };

  useEffect(() => {
    if (results) {
      if (!('stories' in results[0])) {
        setStory((results[0] as unknown) as IStory);
        const originalIssueMainData = results[0].originalIssue;
        if (originalIssueMainData) {
          const pathVars = originalIssueMainData.resourceURI.split('/');
          const comicId = pathVars[pathVars.length - 1];
          const url = `${process.env.REACT_APP_API_URL}v1/public/comics/${comicId}?${queryString.stringify({
            apikey: process.env.REACT_APP_PUBLIC_KEY,
          })}`;
          get<IGenericApiResponse<IComic>>(url)
            .then(res => {
              const { data: comicData } = res ?? {};
              const { results: comicResult } = comicData ?? {};
              if (isMounted.current) {
                setOriginalIssue(comicResult[0]);
              }
            })
            .catch(() => {
              if (isMounted.current) {
                setOriginalIssue(null);
              }
            });
        }
      }
    }
  }, [results]);

  useEffect(() => {
    dispatch(setViewItemAsyncContent(true, '', null));
    const url = `${
      process.env.REACT_APP_API_URL
    }v1/public/stories/${idStory}?${queryString.stringify({
      apikey: process.env.REACT_APP_PUBLIC_KEY,
    })}`;
    get<IGenericApiResponse<IStory>>(url)
      .then(res => {
        dispatch(setViewItemAsyncContent(false, '', res));
      })
      .catch(() => {
        dispatch(setViewItemAsyncContent(false, 'Could not load story', null));
      });

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="main-content mb-5">
      {loading && <Loading />}
      {error && <h2 className="error-message">Could not load story 😓</h2>}
      {!loading && !error && story && (
        <>
          <div className="image-header-div">
            <button
              type="button"
              className="back-button back-button-decoration"
              onClick={handleBack}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              {'\u00A0'}
              Back
            </button>
            <h1 className="image-header-title">Marvel story</h1>
          </div>
          <div className="story-info mb-5">
            {story.title}
          </div>
          <div className="story-info mb-5">
            {story.description}
          </div>
          {originalIssue && (
            <>
              <h3 className="original-issue-title fade-in">Original Issue</h3>
              <div className="comic-description fade-in">
                <div
                  className="comic-image"
                  style={{
                    backgroundImage: `url('${
                      originalIssue.thumbnail
                        ? `${originalIssue.thumbnail.path}/portrait_uncanny.${originalIssue.thumbnail.extension}`
                        : imagePlaceholder
                    }')`,
                  }}
                />
                <div className="comic-info">
                  <p className="comic-title">{originalIssue.title}</p>
                  <p className="comic-description-p">{originalIssue.description}</p>
                  <div className="comic-actions">
                    <button
                      type="button"
                      className="view-comic-button"
                      onClick={() => handleViewComic(originalIssue.id.toString())}
                    >
                      View comic
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="actions-title-div">
            <p className="actions-title">Actions:</p>
          </div>
          <div className="actions-menu">
            <button
              type="button"
              className="action-btn add-bookmark"
              onClick={() => {
                if (inBookmark) handleRemoveBookmark(parseFloat(idStory));
                else handleAddBookmark(parseFloat(idStory));
              }}
            >
              <FontAwesomeIcon icon={bookmarkIcon} />
              {'\u00A0'}
              {inBookmark ? 'Remove bookmark' : 'Add bookmark'}
            </button>
            {!hidden && (
              <button
                type="button"
                className="action-btn hide-item"
                onClick={() => { handleHideItem(parseFloat(idStory)); }}
              >
                <FontAwesomeIcon icon={faEyeSlash} />
                {'\u00A0'}
                Hide item
              </button>
            )}
          </div>
          <div className="related-items-div fade-in">
            <h3 className="related-items-title">Characters</h3>
            {story.characters.returned > 0
              ? <CustomOrderedList items={story.characters.items} onClick={handleViewChar} />
              : <p className="not-found">No characters found 🤔</p>}
          </div>
          <div className="related-items-div fade-in">
            <h3 className="related-items-title">Comics</h3>
            {story.comics.returned > 0
              ? <CustomOrderedList items={story.comics.items} onClick={handleViewComic} />
              : <p className="not-found">No comics found 🤔</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewStoryPage;
