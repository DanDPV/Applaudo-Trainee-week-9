/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IRootState } from 'store/store';
import { setViewItemAsyncContent } from 'actions/viewItem';
import { get } from 'API/FetchInfo';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import IComic from 'interfaces/IComic';

const ViewComicPage = () => {
  interface pathParams {
    idComic: string;
  }

  const { idComic } = useParams<pathParams>();
  const dispatch = useDispatch();
  const {
    loading,
    error,
    data: genericResponse,
  } = useSelector((state: IRootState) => state.viewItem);

  const { data } = genericResponse ?? {};
  const { results } = data ?? {};

  useEffect(() => {
    dispatch(setViewItemAsyncContent(true, '', null));
    const url = `${process.env.REACT_APP_API_URL}v1/public/comics/${idComic}?${queryString.stringify({
      apikey: process.env.REACT_APP_PUBLIC_KEY,
    })}`;
    get<IGenericApiResponse<IComic>>(url)
      .then(res => {
        dispatch(setViewItemAsyncContent(false, '', res));
      })
      .catch(() => {
        dispatch(setViewItemAsyncContent(false, 'Could not load character', null));
      });
  }, []);

  return <h1>{idComic}</h1>;
};

export default ViewComicPage;
