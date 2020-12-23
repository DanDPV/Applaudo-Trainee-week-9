/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint no-shadow: 0 */
/* eslint no-unused-vars: 0 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'store/store';
import useFetch from 'hooks/useFetch';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import IComic from 'interfaces/IComic';
import Card from 'components/Card/Card';
import Loading from 'components/Loading/Loading';
import { comicReset, setComicBaseUrl } from 'actions/searchComic';
import 'pages/comics/ListComicsPage/ListComicsPage.scss';

const ListComicsPage = () => {
  enum QuerysParams {
    Page = 'page',
    Format = 'format',
    Title = 'title',
  }

  const dispatch = useDispatch();
  const { url } = useSelector((state: IRootState) => state.searchComic);
  const { loading, data: genericResponse, error } = useFetch<IGenericApiResponse<IComic>>(url);

  const { data } = genericResponse ?? {};
  const { results, total } = data ?? {};

  useEffect(() => {
    dispatch(setComicBaseUrl(`${process.env.REACT_APP_API_URL}v1/public/comics`));
    return () => {
      dispatch(comicReset());
    };
  }, []);

  return (
    <div className="comic-main-content mb-5">
      <div className="comic-page-title-div">
        <h1>Comics</h1>
      </div>
      {loading && <Loading />}
      {error && <h2 className="error-message">Could not load characters 😓</h2>}
      <div className="cards">
        <div className="cards-content">
          {results
            && results.map(char => (
              <Card
                key={char.id}
                name={char.title}
                description={char.description ?? ''}
                imageUrl={`${char.thumbnail.path}/portrait_uncanny.${char.thumbnail.extension}`}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ListComicsPage;
