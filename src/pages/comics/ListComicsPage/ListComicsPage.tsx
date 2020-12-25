/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint no-shadow: 0 */
/* eslint no-unused-vars: 0 */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';
import { IRootState } from 'store/store';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import IComic from 'interfaces/IComic';
import Card from 'components/Card/Card';
import Loading from 'components/Loading/Loading';
import Pagination from 'components/Pagination/Pagination';
import {
  setComicAllParams,
  setComicBaseUrl,
  setComicData,
  setComicError,
  setComicFormat,
  setComicLoading,
  setComicTitle,
} from 'actions/searchComic';
import { getQueryVariable, shortenText } from 'utils/utils';
import { get } from 'API/FetchInfo';
import formatOptions from 'mocks/formatOptions';
import { imagePlaceholder } from 'utils/globals';
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
    loading,
    error,
    data: genericResponse,
  } = useSelector((state: IRootState) => state.searchComic);

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

  const handleChangePage = (newPage: number) => {
    window.scrollTo({ top: 300 });
    changeUrlParams(newPage, format, title);
  };

  const debouncedTitleChange = useCallback(
    debounce(
      (title: string, format: string) => changeUrlParams(1, format, title),
      1000,
    ),
    [],
  );

  const handleTitleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setComicTitle(target.value));
    debouncedTitleChange(target.value, format);
  };

  const handleFormatChange = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setComicFormat(target.value));

    changeUrlParams(1, target.value, title);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => e.preventDefault();

  useEffect(() => {
    dispatch(setComicBaseUrl(`${process.env.REACT_APP_API_URL}v1/public/comics`));
  }, []);

  useEffect(() => {
    const newPage = getQueryVariable(QuerysParams.Page)
      ? +getQueryVariable(QuerysParams.Page)
      : 1;

    const newFormat = getQueryVariable(QuerysParams.Format)
      ? decodeURI(getQueryVariable(QuerysParams.Format))
      : '';

    const newTitle = getQueryVariable(QuerysParams.Title)
      ? decodeURI(getQueryVariable(QuerysParams.Title))
      : '';

    const newOffset = Math.ceil((newPage - 1) * limit);

    dispatch(setComicAllParams(newOffset, newFormat, newTitle));
  }, [history.location, limit]);

  useEffect(() => {
    if (url) {
      dispatch(setComicLoading(true));
      dispatch(setComicData(null));
      dispatch(setComicError(''));
      get<IGenericApiResponse<IComic>>(url)
        .then(res => {
          dispatch(setComicData(res));
          dispatch(setComicLoading(false));
        })
        .catch(err => {
          dispatch(setComicData(null));
          dispatch(setComicLoading(false));
          dispatch(setComicError('Could not load comics'));
        });
    }
  }, [url]);

  return (
    <div className="comic-main-content mb-5">
      <div className="comic-page-title-div">
        <h1>Comics</h1>
      </div>
      <div className="comic-search-filters-form mb-5">
        <form onSubmit={handleSubmit}>
          <div className="comic-search-title">Search your comic</div>
          <div className="search-header">Title</div>
          <div className="search-header">Format</div>
          <div className="search-value">
            <input
              type="text"
              name="title"
              placeholder="Comic's title"
              autoComplete="off"
              className="search-input"
              value={title}
              onChange={handleTitleChange}
            />
          </div>

          <div className="search-value">
            <select className="search-select" value={format} onChange={handleFormatChange}>
              <option value="">Select a format</option>
              {formatOptions.map(format => (
                <option key={format.value} value={format.value}>
                  {shortenText(format.name, 20)}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
      {loading && <Loading />}
      {error && <h2 className="error-message">Could not load comics 😓</h2>}
      <div className="cards">
        <div className="cards-content">
          {results
            && results.map(comic => (
              <Card
                key={comic.id}
                name={comic.title}
                description={comic.description ?? ''}
                imageUrl={comic.thumbnail
                  ? `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`
                  : imagePlaceholder}
              />
            ))}
        </div>
      </div>
      {results && results.length <= 0 && (
        <h2 className="error-message">Comics not found 😮</h2>
      )}
      {!loading
      && !error
      && results
      && genericResponse
      && results.length > 0
      && (
        <Pagination
          genericResponse={genericResponse}
          onChange={handleChangePage}
        />
      )}
    </div>
  );
};

export default ListComicsPage;
