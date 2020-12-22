/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint no-shadow: 0 */
/* eslint no-unused-vars: 0 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { IRootState } from 'store/store';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import ICharacter from 'interfaces/ICharacter';
import useFetch from 'hooks/useFetch';
import Card from 'components/Card/Card';
import Loading from 'components/Loading/Loading';
import Pagination from 'components/Pagination/Pagination';
import { getQueryVariable } from 'utils/utils';
import {
  reset,
  setAllParams,
  setBaseUrl,
  setName,
} from 'actions/search';
import 'pages/characters/ListCharactersPage/ListCharactersPage.scss';

const ListCharactersPage = () => {
  enum QuerysParams {
    Page = 'page',
    Name = 'name',
  }

  const history = useHistory();
  const dispatch = useDispatch();
  const {
    url,
    limit,
    offset,
    name,
  } = useSelector((state: IRootState) => state.search);
  const { loading, data: genericResponse, error } = useFetch<IGenericApiResponse<ICharacter>>(url);

  const { data } = genericResponse ?? {};
  const { results, total } = data ?? {};

  const handleChangePage = (newPage: number) => history.push(
    `?${queryString.stringify({
      page: newPage,
    })}`,
  );

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(target.value));

    const newPage = getQueryVariable(QuerysParams.Page)
      ? +getQueryVariable(QuerysParams.Page)
      : 1;

    history.push(
      `?${queryString.stringify({
        page: newPage,
        name: target.value,
      })}`,
    );
  };

  useEffect(() => {
    dispatch(setBaseUrl(`${process.env.REACT_APP_API_URL}v1/public/characters`));

    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    const newPage = getQueryVariable(QuerysParams.Page)
      ? +getQueryVariable(QuerysParams.Page)
      : 1;

    const newName = getQueryVariable(QuerysParams.Name)
      ? getQueryVariable(QuerysParams.Name)
      : '';

    const newOffset = Math.ceil((newPage - 1) * limit);

    dispatch(setAllParams(newOffset, newName));
  }, [history.location, limit]);

  return (
    <div className="main-content mb-5">
      <div className="page-title-div">
        <h1>Characters</h1>
      </div>
      {loading && <Loading />}
      {error && <h2 className="error-message">Could not load characters 😓</h2>}
      <div className="search-filters-form">
        <form>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            autoComplete="off"
            value={name}
            onChange={handleInputChange}
          />
        </form>
      </div>
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
          {results && results.length <= 0 && (
            <h2 className="error-message">Characters not found 😮</h2>
          )}
        </div>
      </div>
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

export default ListCharactersPage;
