/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';
import { setViewItemAsyncContent } from 'actions/viewItem';
import { IRootState } from 'store/store';
import { get } from 'API/FetchInfo';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import IStory from 'interfaces/IStory';

const ViewStoryPage = () => {
  interface pathParams {
    idStory: string;
  }

  const { idStory } = useParams<pathParams>();
  const dispatch = useDispatch();
  const { loading, error, data: genericResponse } = useSelector(
    (state: IRootState) => state.viewItem,
  );

  const { data } = genericResponse ?? {};
  const { results } = data ?? {};

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
        dispatch(setViewItemAsyncContent(false, 'Could not load stpry', null));
      });
  }, []);

  return (
    <div>
      <h1>{idStory}</h1>
    </div>
  );
};

export default ViewStoryPage;
