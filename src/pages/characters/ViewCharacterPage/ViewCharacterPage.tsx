import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faEyeSlash,
  faBookmark as faBookmarkSolid,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { get } from 'API/FetchInfo';
import { IRootState } from 'store/store';
import { setViewItemAsyncContent } from 'actions/viewItem';
import ICharacter from 'interfaces/ICharacter';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import Loading from 'components/Loading/Loading';
import CustomOrderedList from 'components/CustomOrderedList/CustomOrderedList';
import { imagePlaceholder } from 'utils/globals';
import RouteNames from 'routers/RouteNames';
import { addBookmark, hideLocalItem, removeBookmark } from 'actions/localItems';
import 'pages/characters/ViewCharacterPage/ViewCharacterPage.scss';

const ViewCharacterPage = () => {
  interface pathParams {
    idCharacter: string;
  }

  const history = useHistory();
  const dispatch = useDispatch();
  const { idCharacter } = useParams<pathParams>();
  const {
    loading,
    error,
    data: genericResponse,
  } = useSelector((state: IRootState) => state.viewItem);
  const { hiddenItems, bookmarks } = useSelector((state: IRootState) => state.localItems);

  const { data } = genericResponse ?? {};
  const { results } = data ?? {};
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [inBookmark, setInBookmark] = useState(
    !!bookmarks.find(
      item => item.type === 'CHARACTER' && item.id === parseFloat(idCharacter),
    ),
  );
  const [bookmarkIcon, setBookmarkIcon] = useState<IconDefinition>(
    inBookmark ? faBookmarkSolid : faBookmarkRegular,
  );
  const [hidden] = useState(
    !!hiddenItems.find(
      item => item.type === 'CHARACTER' && item.id === parseFloat(idCharacter),
    ),
  );

  const handleBack = () => {
    if (history.length <= 2) history.push(RouteNames.Home);
    else history.goBack();
  };

  const handleViewComic = (id: string) => history.push(`/comics/${id}`);

  const handleViewStory = (id: string) => history.push(`/stories/${id}`);

  const handleAddBookmark = (id: number) => {
    dispatch(addBookmark({ id, type: 'CHARACTER' }));
    setBookmarkIcon(faBookmarkSolid);
    setInBookmark(true);
  };

  const handleRemoveBookmark = (id: number) => {
    dispatch(removeBookmark({ id, type: 'CHARACTER' }));
    setBookmarkIcon(faBookmarkRegular);
    setInBookmark(false);
  };

  const handleHideItem = (id: number) => {
    dispatch(hideLocalItem({ id, type: 'CHARACTER' }));
    handleBack();
  };

  useEffect(() => {
    if (results) {
      if (!('characters' in results[0])) {
        setCharacter((results[0] as unknown) as ICharacter);
      }
    }
  }, [results]);

  useEffect(() => {
    dispatch(setViewItemAsyncContent(true, '', null));
    const url = `${process.env.REACT_APP_API_URL}v1/public/characters/${idCharacter}?${queryString.stringify({
      apikey: process.env.REACT_APP_PUBLIC_KEY,
    })}`;
    get<IGenericApiResponse<ICharacter>>(url)
      .then(res => {
        dispatch(setViewItemAsyncContent(false, '', res));
      })
      .catch(() => {
        dispatch(setViewItemAsyncContent(false, 'Could not load character', null));
      });
  }, []);

  return (
    <div className="main-content mb-5">
      {loading && <Loading />}
      {error && <h2 className="error-message">Could not load character 😓</h2>}
      {!loading && !error && character && (
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
            <h1 className="image-header-title">{character.name}</h1>
          </div>
          <div className="char-description fade-in">
            <div
              className="char-image"
              style={{
                backgroundImage: `url('${
                  character.thumbnail
                    ? `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`
                    : imagePlaceholder
                }')`,
              }}
            />
            <div className="char-info">
              <p className="char-description-p">{character.description}</p>
              {character.urls && character.urls.length > 0 && (
                <>
                  <p className="char-extra-title">
                    {`Learn more about ${character.name}`}
                  </p>
                  <div className="char-extra-div">
                    {character.urls.map(res => (
                      <a
                        className="char-extra-button"
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
                if (inBookmark) handleRemoveBookmark(parseFloat(idCharacter));
                else handleAddBookmark(parseFloat(idCharacter));
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
                onClick={() => { handleHideItem(parseFloat(idCharacter)); }}
              >
                <FontAwesomeIcon icon={faEyeSlash} />
                {'\u00A0'}
                Hide item
              </button>
            )}
          </div>
          <div className="related-items-div fade-in">
            <h3 className="related-items-title">Comics</h3>
            {character.comics.returned > 0
              ? <CustomOrderedList items={character.comics.items} onClick={handleViewComic} />
              : <p className="not-found">No comics found 🤔</p>}
          </div>
          <div className="related-items-div fade-in">
            <h3 className="related-items-title">Stories</h3>
            {character.stories.returned > 0
              ? <CustomOrderedList items={character.stories.items} onClick={handleViewStory} />
              : <p className="not-found">No stories found 🤔</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewCharacterPage;
