/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkSolid, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import IStory from 'interfaces/IStory';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'store/store';
import { get } from 'API/FetchInfo';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import { imagePlaceholder } from 'utils/globals';
import Card from 'components/Card/Card';
import Loading from 'components/Loading/Loading';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import {
  addBookmark,
  hideLocalItem,
  removeBookmark,
  resetBookmarks,
  resetHiddenItems,
} from 'actions/localItems';
import RouteNames from 'routers/RouteNames';
import 'pages/bookmarks/common/styles.scss';

const StoryBookmarks = () => {
  const { hiddenItems, bookmarks } = useSelector((state: IRootState) => state.localItems);
  const history = useHistory();
  const dispatch = useDispatch();

  const [stories, setStories] = useState<IStory[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('Delete all bookmarks?');
  const [bodyModal, setBodyModal] = useState('Are you sure you want to delete all of your bookmarks in characters,comics and stories?');
  const [confirmTextModal, setConfirmTextModal] = useState('Yes, delete!');
  const [typeModal, setTypeModal] = useState<'BOOKMARK' | 'HIDDEN'>('BOOKMARK');

  const handleViewMore = (id: number) => history.push(`/stories/${id}`);

  const handleHideItem = (id: number) => {
    dispatch(hideLocalItem({ id, type: 'STORY' }));
    setStories(char => [...char.filter(c => c.id !== id)]);
  };

  const handleAddBookmark = (id: number) => dispatch(addBookmark({ id, type: 'STORY' }));

  const handleRemoveBookmark = (id: number) => {
    dispatch(removeBookmark({ id, type: 'STORY' }));
    setStories(char => [...char.filter(c => c.id !== id)]);
  };

  const handleResetBookmarks = () => {
    dispatch(resetBookmarks());
    setStories([]);
  };

  const handleResetHiddenItems = () => {
    dispatch(resetHiddenItems());
    window.location.reload();
  };

  const handleAction = (confirmed: boolean) => {
    setShowModal(false);
    if (confirmed) {
      switch (typeModal) {
        case 'BOOKMARK':
          handleResetBookmarks();
          break;
        case 'HIDDEN':
          handleResetHiddenItems();
          break;
        default:
          handleResetBookmarks();
          break;
      }
    }
  };

  useEffect(() => {
    setStories([]);
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
    <>
      <ConfirmModal
        title={titleModal}
        confirmText={confirmTextModal}
        open={showModal}
        handleAction={handleAction}
      >
        <p>
          {bodyModal}
        </p>
      </ConfirmModal>
      <div className="main-content mb-5">
        <div className="bookmarks-title-div">
          <h1>Story Bookmarks</h1>
        </div>
        <div className="bookmark-menu-title-div">
          <p className="bookmark-menu-title">
            View your bookmarks in:
          </p>
        </div>
        <div className="bookmark-menu">
          <Link
            type="button"
            className="bookmark-menu-btn"
            to={RouteNames.CharacterBookmarks}
          >
            Characters
          </Link>
          <Link
            type="button"
            className="bookmark-menu-btn"
            to={RouteNames.ComicBookmarks}
          >
            Comics
          </Link>
        </div>
        <div className="bookmark-menu-title-div">
          <p className="bookmark-menu-title">Actions:</p>
        </div>
        <div className="bookmark-menu">
          <button
            type="button"
            className="bookmark-action-btn delete-bookmarks"
            onClick={() => {
              setTitleModal('Delete all bookmarks?');
              setBodyModal('Are you sure you want to delete all of your bookmarks in characters,comics and stories?');
              setConfirmTextModal('Yes, delete!');
              setTypeModal('BOOKMARK');
              setShowModal(true);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
            {'\u00A0'}
            Delete all bookmarks
          </button>
          <button
            type="button"
            className="bookmark-action-btn reset-hidden-items"
            onClick={() => {
              setTitleModal('Reset hidden items?');
              setBodyModal('Are you sure you want to reset all hidden items?');
              setConfirmTextModal('Yes!');
              setTypeModal('HIDDEN');
              setShowModal(true);
            }}
          >
            <FontAwesomeIcon icon={faEye} />
            {'\u00A0'}
            Reset hidden items
          </button>
        </div>
        {loading && <Loading />}
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
                    bookmarkClassName={inBookmark ? 'btn btn-action btn-bookmark bookmark-selected' : 'btn btn-action btn-bookmark'}
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
        {!loading && stories && stories.length <= 0 && (
          <h2 className="error-message">You don&apos;t have bookmarks in stories</h2>
        )}
      </div>
    </>
  );
};

export default StoryBookmarks;
