/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint no-shadow: 0 */
/* eslint no-unused-vars: 0 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { IRootState } from 'store/store';
import useFetch from 'hooks/useFetch';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import IComic from 'interfaces/IComic';
import Card from 'components/Card/Card';
import Loading from 'components/Loading/Loading';
import Pagination from 'components/Pagination/Pagination';
import { comicReset, setComicBaseUrl } from 'actions/searchComic';
import 'pages/comics/ListComicsPage/ListComicsPage.scss';

const ListComicsPage = () => {
  enum QuerysParams {
    Page = 'page',
    Format = 'format',
    Title = 'title',
  }

  const history = useHistory();
  const dispatch = useDispatch();
  const {
    url,
    offset,
    limit,
    format,
    title,
  } = useSelector((state: IRootState) => state.searchComic);
  const { loading, data: genericResponse, error } = useFetch<IGenericApiResponse<IComic>>(url);

  const { data } = genericResponse ?? {};
  const { results, total } = data ?? {};

  const changeUrlParams = (
    newPage: number,
    newFormat: string,
    newTitle: string,
  ) => {
    history.push(
      `?${queryString.stringify({
        page: newPage,
        format: newFormat === '' ? undefined : newFormat,
        title: newTitle === '' ? undefined : newTitle,
      })}`,
    );
  };

  const handleChangePage = (newPage: number) => changeUrlParams(newPage, format, title);

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
      {error && <h2 className="error-message">Could not load comics 😓</h2>}
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
      {results && results.length <= 0 && (
        <h2 className="error-message">Comics not found 😮</h2>
      )}
      {!loading && !error && results && results.length > 0 && (
        <Pagination
          offset={offset}
          limit={limit}
          total={total ?? 0}
          onChange={handleChangePage}
        />
      )}
    </div>
  );
};

export default ListComicsPage;
