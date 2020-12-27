import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setViewItemAsyncContent } from 'actions/viewItem';
import { get } from 'API/FetchInfo';
import ICharacter from 'interfaces/ICharacter';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';

const ViewCharacterPage = () => {
  interface pathParams {
    idCharacter: string;
  }

  const dispatch = useDispatch();
  const { idCharacter } = useParams<pathParams>();

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

  return <h1>{idCharacter}</h1>;
};

export default ViewCharacterPage;
