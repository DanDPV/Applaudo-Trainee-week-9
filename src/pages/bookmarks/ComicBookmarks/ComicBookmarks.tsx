import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkSolid, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import IComic from 'interfaces/IComic';
import { IRootState } from 'store/store';
import { get } from 'API/FetchInfo';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import { imagePlaceholder } from 'utils/globals';
import Card from 'components/Card/Card';
import Loading from 'components/Loading/Loading';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import RouteNames from 'routers/RouteNames';
import {
  addBookmark,
  hideLocalItem,
  removeBookmark,
  resetBookmarks,
  resetHiddenItems,
} from 'actions/localItems';
import 'pages/bookmarks/common/styles.scss';

const ComicBookmarks = () => {
  const { hiddenItems, bookmarks } = useSelector((state: IRootState) => state.localItems);
  const history = useHistory();
  const dispatch = useDispatch();

  const [comics, setComics] = useState<IComic[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('Delete all bookmarks?');
  const [bodyModal, setBodyModal] = useState('Are you sure you want to delete all of your bookmarks in characters,comics and stories?');
  const [confirmTextModal, setConfirmTextModal] = useState('Yes, delete!');
  const [typeModal, setTypeModal] = useState<'BOOKMARK' | 'HIDDEN'>('BOOKMARK');

  const handleViewMore = (id: number) => history.push(`/comics/${id}`);

  const handleHideItem = (id: number) => {
    dispatch(hideLocalItem({ id, type: 'COMIC' }));
    setComics(char => [...char.filter(c => c.id !== id)]);
  };

  const handleAddBookmark = (id: number) => dispatch(addBookmark({ id, type: 'COMIC' }));

  const handleRemoveBookmark = (id: number) => {
    dispatch(removeBookmark({ id, type: 'COMIC' }));
    setComics(char => [...char.filter(c => c.id !== id)]);
  };

  const handleResetBookmarks = () => {
    dispatch(resetBookmarks());
    setComics([]);
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
    setComics([]);
    setLoading(true);
    const comicBookmarks = bookmarks.filter(item => item.type === 'COMIC');
    const hiddenComics = hiddenItems.filter(item => item.type === 'COMIC');
    comicBookmarks.forEach((bComic, index, arr) => {
      const validateVisibility = hiddenComics.filter(item => item.id === bComic.id);
      if (validateVisibility.length === 0) {
        const url = `${process.env.REACT_APP_API_URL}v1/public/comics/${bComic.id}?${queryString.stringify({
          apikey: process.env.REACT_APP_PUBLIC_KEY,
        })}`;
        get<IGenericApiResponse<IComic>>(url)
          .then(res => {
            const { data: comicData } = res ?? {};
            const { results: comicResult } = comicData ?? {};
            setComics(c => [...c, comicResult[0]]);
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
          <h1>Comic Bookmarks</h1>
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
            to={RouteNames.StoryBookmarks}
          >
            Stories
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
              && comics
              && comics.map(comic => {
                const inBookmark = bookmarks.find(item => item.type === 'COMIC' && item.id === comic.id);
                return (
                  <Card
                    key={comic.id}
                    id={comic.id}
                    name={comic.title}
                    description={comic.description ?? ''}
                    bookmarkClassName={inBookmark ? 'btn btn-action btn-bookmark bookmark-selected' : 'btn btn-action btn-bookmark'}
                    bookmarkIcon={inBookmark ? faBookmarkSolid : faBookmarkRegular}
                    handleViewMore={handleViewMore}
                    handleHideItem={handleHideItem}
                    handleBookmarkAction={inBookmark ? handleRemoveBookmark : handleAddBookmark}
                    imageUrl={comic.thumbnail
                      ? `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`
                      : imagePlaceholder}
                  />
                );
              })}
          </div>
        </div>
        {!loading && comics && comics.length <= 0 && (
          <h2 className="error-message">You don&apos;t have bookmarks in comics</h2>
        )}
      </div>
    </>
  );
};

export default ComicBookmarks;
