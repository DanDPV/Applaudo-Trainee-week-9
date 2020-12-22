import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'store/store';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import ICharacter from 'interfaces/ICharacter';
import useFetch from 'hooks/useFetch';
import Card from 'components/Card/Card';
import Loading from 'components/Loading/Loading';
import 'pages/characters/ListCharactersPage/ListCharactersPage.scss';

const ListCharactersPage = () => {
  const dispatch = useDispatch();
  const { url } = useSelector((state: IRootState) => state.search);
  const { loading, data: genericResponse, error } = useFetch<IGenericApiResponse<ICharacter>>(url);

  const { data } = genericResponse ?? {};
  const { results } = data ?? {};

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
      <div className="page-title-div">
        <h1>Characters</h1>
      </div>
      {
        loading && <Loading />
      }
      {
        error && <h2 className="error-message">Could not load characters 😓</h2>
      }
      <div className="cards">
        <div className="cards-content">
          {results
            && results.map(char => (
              <Card
                key={char.id}
                name={char.name}
                description={char.description}
                imageUrl={`${char.thumbnail.path}/portrait_uncanny.${char.thumbnail.extension}`}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ListCharactersPage;
