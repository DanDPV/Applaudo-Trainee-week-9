/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { IRootState } from 'store/store';
import { get } from 'API/FetchInfo';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import ICharacter from 'interfaces/ICharacter';
import { imagePlaceholder } from 'utils/globals';
import Card from 'components/Card/Card';
import Loading from 'components/Loading/Loading';
import { addBookmark, hideLocalItem, removeBookmark } from 'actions/localItems';
import 'pages/bookmarks/common/styles.scss';

const CharacterBookmarks = () => {
  const { bookmarks } = useSelector((state: IRootState) => state.localItems);
  const history = useHistory();
  const dispatch = useDispatch();

  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState(false);

  const handleViewMore = (id: number) => history.push(`/characters/${id}`);

  const handleHideItem = (id: number) => dispatch(hideLocalItem({ id, type: 'CHARACTER' }));

  const handleAddBookmark = (id: number) => dispatch(addBookmark({ id, type: 'CHARACTER' }));

  const handleRemoveBookmark = (id: number) => dispatch(removeBookmark({ id, type: 'CHARACTER' }));

  useEffect(() => {
    setLoading(true);
    const charBookmarks = bookmarks.filter(item => item.type === 'CHARACTER');
    charBookmarks.forEach((bChar, index, arr) => {
      const url = `${process.env.REACT_APP_API_URL}v1/public/characters/${bChar.id}?${queryString.stringify({
        apikey: process.env.REACT_APP_PUBLIC_KEY,
      })}`;
      get<IGenericApiResponse<ICharacter>>(url)
        .then(res => {
          const { data: charData } = res ?? {};
          const { results: charResult } = charData ?? {};
          setCharacters(chars => [...chars, charResult[0]]);
          if (index === arr.length - 1) setLoading(false);
        });
    });
    setLoading(false);
  }, []);

  return (
    <div className="main-content mb-5">
      <div className="bookmarks-title-div">
        <h1>Character Bookmarks</h1>
      </div>
      {loading && <Loading />}
      <div className="cards">
        <div className="cards-content">
          {!loading
            && characters
            && characters.map(char => {
              const inBookmark = bookmarks.find(item => item.type === 'CHARACTER' && item.id === char.id);
              return (
                <Card
                  key={char.id}
                  id={char.id}
                  name={char.name}
                  description={char.description ?? ''}
                  bookmarkIcon={inBookmark ? faBookmarkSolid : faBookmarkRegular}
                  handleViewMore={handleViewMore}
                  handleHideItem={handleHideItem}
                  handleBookmarkAction={inBookmark ? handleRemoveBookmark : handleAddBookmark}
                  imageUrl={char.thumbnail
                    ? `${char.thumbnail.path}/portrait_uncanny.${char.thumbnail.extension}`
                    : imagePlaceholder}
                />
              );
            })}
        </div>
      </div>
      {!loading && characters && characters.length <= 0 && (
        <h2 className="error-message">You don&apos;t have bookmarks in characters</h2>
      )}
    </div>
  );
};

export default CharacterBookmarks;
