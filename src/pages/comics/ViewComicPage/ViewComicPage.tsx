import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faEyeSlash,
  faBookmark as faBookmarkSolid,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { IRootState } from 'store/store';
import { setViewItemAsyncContent } from 'actions/viewItem';
import { get } from 'API/FetchInfo';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import IComic from 'interfaces/IComic';
import Loading from 'components/Loading/Loading';
import CustomOrderedList from 'components/CustomOrderedList/CustomOrderedList';
import RouteNames from 'routers/RouteNames';
import { imagePlaceholder } from 'utils/globals';
import { addBookmark, hideLocalItem, removeBookmark } from 'actions/localItems';
import 'pages/comics/ViewComicPage/ViewComicPage.scss';

const ViewComicPage = () => {
  interface pathParams {
    idComic: string;
  }

  const history = useHistory();
  const dispatch = useDispatch();
  const { idComic } = useParams<pathParams>();
  const { loading, error, data: genericResponse } = useSelector(
    (state: IRootState) => state.viewItem,
  );
  const { hiddenItems, bookmarks } = useSelector((state: IRootState) => state.localItems);

  const { data } = genericResponse ?? {};
  const { results } = data ?? {};
  const [comic, setComic] = useState<IComic | null>(null);
  const [inBookmark, setInBookmark] = useState(
    !!bookmarks.find(
      item => item.type === 'COMIC' && item.id === parseFloat(idComic),
    ),
  );
  const [bookmarkIcon, setBookmarkIcon] = useState<IconDefinition>(
    inBookmark ? faBookmarkSolid : faBookmarkRegular,
  );
  const [hidden] = useState(
    !!hiddenItems.find(
      item => item.type === 'COMIC' && item.id === parseFloat(idComic),
    ),
  );

  const handleBack = () => {
    if (history.length <= 2) history.push(RouteNames.Home);
    else history.goBack();
  };

  const handleViewChar = (id: string) => history.push(`/characters/${id}`);

  const handleViewStory = (id: string) => history.push(`/stories/${id}`);

  const handleAddBookmark = (id: number) => {
    dispatch(addBookmark({ id, type: 'COMIC' }));
    setBookmarkIcon(faBookmarkSolid);
    setInBookmark(true);
  };

  const handleRemoveBookmark = (id: number) => {
    dispatch(removeBookmark({ id, type: 'COMIC' }));
    setBookmarkIcon(faBookmarkRegular);
    setInBookmark(false);
  };

  const handleHideItem = (id: number) => {
    dispatch(hideLocalItem({ id, type: 'COMIC' }));
    handleBack();
  };

  useEffect(() => {
    if (results) {
      if (!('comics' in results[0])) {
        setComic((results[0] as unknown) as IComic);
      }
    }
  }, [results]);

  useEffect(() => {
    dispatch(setViewItemAsyncContent(true, '', null));
    const url = `${
      process.env.REACT_APP_API_URL
    }v1/public/comics/${idComic}?${queryString.stringify({
      apikey: process.env.REACT_APP_PUBLIC_KEY,
    })}`;
    get<IGenericApiResponse<IComic>>(url)
      .then(res => {
        dispatch(setViewItemAsyncContent(false, '', res));
      })
      .catch(() => {
        dispatch(setViewItemAsyncContent(false, 'Could not load comic', null));
      });
  }, []);

  return (
    <div className="main-content mb-5">
      {loading && <Loading />}
      {error && <h2 className="error-message">Could not load comic 😓</h2>}
      {!loading && !error && comic && (
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
            <h1 className="image-header-title">{comic.title}</h1>
          </div>
          <div className="comic-description fade-in">
            <div
              className="comic-image"
              style={{
                backgroundImage: `url('${
                  comic.thumbnail
                    ? `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`
                    : imagePlaceholder
                }')`,
              }}
            />
            <div className="comic-info">
              <p className="comic-description-p">{comic.description}</p>
              {comic.urls && comic.urls.length > 0 && (
                <>
                  <p className="comic-extra-title">
                    {`Learn more about ${comic.title}`}
                  </p>
                  <div className="comic-extra-div">
                    {comic.urls.map(res => (
                      <a
                        className="comic-extra-button"
                        target="_blank"
                        rel="noopener noreferrer"
                        key={res.type}
                        href={res.url}
                      >
                        {res.type}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="actions-title-div">
            <p className="actions-title">Actions:</p>
          </div>
          <div className="actions-menu">
            <button
              type="button"
              className="action-btn add-bookmark"
              onClick={() => {
                if (inBookmark) handleRemoveBookmark(parseFloat(idComic));
                else handleAddBookmark(parseFloat(idComic));
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
                onClick={() => { handleHideItem(parseFloat(idComic)); }}
              >
                <FontAwesomeIcon icon={faEyeSlash} />
                {'\u00A0'}
                Hide item
              </button>
            )}
          </div>
          <div className="related-items-div fade-in">
            <h3 className="related-items-title">Characters</h3>
            {comic.characters.returned > 0
              ? <CustomOrderedList items={comic.characters.items} onClick={handleViewChar} />
              : <p className="not-found">No characters found 🤔</p>}
          </div>
          <div className="related-items-div fade-in">
            <h3 className="related-items-title">Stories</h3>
            {comic.stories.returned > 0
              ? <CustomOrderedList items={comic.stories.items} onClick={handleViewStory} />
              : <p className="not-found">No stories found 🤔</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewComicPage;
