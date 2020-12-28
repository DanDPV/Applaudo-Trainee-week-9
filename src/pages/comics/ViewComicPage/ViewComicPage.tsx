/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { IRootState } from 'store/store';
import { setViewItemAsyncContent } from 'actions/viewItem';
import { get } from 'API/FetchInfo';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import IComic from 'interfaces/IComic';
import Loading from 'components/Loading/Loading';
import RouteNames from 'routers/RouteNames';
import 'pages/comics/ViewComicPage/ViewComicPage.scss';

const ViewComicPage = () => {
  interface pathParams {
    idComic: string;
  }

  const history = useHistory();
  const dispatch = useDispatch();
  const { idComic } = useParams<pathParams>();
  const { loading, error, data: genericResponse } = useSelector(
    (state: IRootState) => state.viewItem,
  );

  const { data } = genericResponse ?? {};
  const { results } = data ?? {};
  const [comic, setComic] = useState<IComic | null>(null);

  const handleBack = () => {
    if (history.length <= 2) history.push(RouteNames.Home);
    else history.goBack();
  };

  useEffect(() => {
    if (results) {
      if (!('comics' in results[0])) {
        setComic((results[0] as unknown) as IComic);
      }
    }
  }, [results]);

  useEffect(() => {
    dispatch(setViewItemAsyncContent(true, '', null));
    const url = `${
      process.env.REACT_APP_API_URL
    }v1/public/comics/${idComic}?${queryString.stringify({
      apikey: process.env.REACT_APP_PUBLIC_KEY,
    })}`;
    get<IGenericApiResponse<IComic>>(url)
      .then(res => {
        dispatch(setViewItemAsyncContent(false, '', res));
      })
      .catch(() => {
        dispatch(setViewItemAsyncContent(false, 'Could not load comic', null));
      });
  }, []);

  return (
    <div className="main-content mb-5">
      {loading && <Loading />}
      {error && <h2 className="error-message">Could not load comic 😓</h2>}
      {!loading && !error && comic && (
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
            <h1 className="image-header-title">{comic.title}</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewComicPage;
