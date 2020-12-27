/* eslint-disable lines-between-class-members */
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { get } from 'API/FetchInfo';
import { IRootState } from 'store/store';
import { setViewItemAsyncContent } from 'actions/viewItem';
import ICharacter from 'interfaces/ICharacter';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import Loading from 'components/Loading/Loading';
import { imagePlaceholder } from 'utils/globals';
import RouteNames from 'routers/RouteNames';
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

  const { data } = genericResponse ?? {};
  const { results } = data ?? {};
  const [character, setCharacter] = useState<ICharacter | null>(null);

  const handleBack = () => {
    if (history.length <= 2) history.push(RouteNames.Home);
    else history.goBack();
  };

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

  return (
    <div className="main-content mb-5">
      {loading && <Loading />}
      {error && <h2 className="error-message">Could not load character 😓</h2>}
      {!loading && character && (
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
          <div className="char-description">
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
          <div className="char-comics-div">
            <h3 className="char-comics-title">Comics</h3>
            {character.comics.returned > 0
              ? (
                <ol>
                  {character.comics.items.map(comic => (
                    <li key={comic.resourceURI}>{comic.name}</li>
                  ))}
                </ol>
              )
              : <p className="not-found">Comics not found 🤔</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewCharacterPage;
