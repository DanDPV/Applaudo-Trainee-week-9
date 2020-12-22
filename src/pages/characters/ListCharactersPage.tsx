import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'store/store';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import ICharacter from 'interfaces/ICharacter';
import useFetch from 'hooks/useFetch';

const ListCharactersPage = () => {
  const dispatch = useDispatch();
  const { url } = useSelector((state: IRootState) => state.search);
  const { loading } = useFetch<IGenericApiResponse<ICharacter>>(url);

  useEffect(() => {
    dispatch({
      type: 'SET_BASE_URL',
      payload: {
        baseUrl: `${process.env.REACT_APP_API_URL}v1/public/characters`,
      },
    });

    return () => {
      dispatch({
        type: 'RESET',
      });
    };
  }, []);

  return (
    <div className="main-content mb-5">
      <h1>List Characters Page</h1>
      <h2>{JSON.stringify(loading)}</h2>
    </div>
  );
};

export default ListCharactersPage;
