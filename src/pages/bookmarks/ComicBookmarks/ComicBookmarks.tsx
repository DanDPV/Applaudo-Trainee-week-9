/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import IComic from 'interfaces/IComic';
import { IRootState } from 'store/store';
import { get } from 'API/FetchInfo';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';

const ComicBookmarks = () => {
  const { hiddenItems, bookmarks } = useSelector((state: IRootState) => state.localItems);

  const [comics, setComics] = useState<IComic[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    <div className="main-content mb-5">
      <div className="bookmarks-title-div">
        <h1>Character Bookmarks</h1>
      </div>
    </div>
  );
};

export default ComicBookmarks;
