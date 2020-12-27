/* eslint-disable lines-between-class-members */
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { get } from 'API/FetchInfo';
import { IRootState } from 'store/store';
import { setViewItemAsyncContent } from 'actions/viewItem';
import ICharacter from 'interfaces/ICharacter';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';

const ViewCharacterPage = () => {
  interface pathParams {
    idCharacter: string;
  }

  const dispatch = useDispatch();
  const { idCharacter } = useParams<pathParams>();
  const {
    data: genericResponse,
  } = useSelector((state: IRootState) => state.viewItem);

  const { data } = genericResponse ?? {};
  const { results } = data ?? {};
  const [character, setCharacter] = useState<ICharacter | null>(null);

  useEffect(() => {
    if (results) {
      if (!('character' in results[0])) {
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

  return <h1>{idCharacter}</h1>;
};

export default ViewCharacterPage;
