/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import { IRootState } from 'store/store';
import { get } from 'API/FetchInfo';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import ICharacter from 'interfaces/ICharacter';
import 'pages/bookmarks/common/styles.scss';

const CharacterBookmarks = () => {
  const { bookmarks } = useSelector((state: IRootState) => state.localItems);

  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState(false);

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
  }, []);

  return (
    <div className="main-content mb-5">
      <div className="bookmarks-title-div">
        <h1>Character Bookmarks</h1>
      </div>
    </div>
  );
};

export default CharacterBookmarks;
