/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint no-shadow: 0 */
/* eslint no-unused-vars: 0 */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';
import { IRootState } from 'store/store';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import ICharacter from 'interfaces/ICharacter';
import IComic from 'interfaces/IComic';
import IStory from 'interfaces/IStory';
import { getFirstNComics, getFirstNStories } from 'helpers/fetchService';
import useFetch from 'hooks/useFetch';
import Card from 'components/Card/Card';
import Loading from 'components/Loading/Loading';
import Pagination from 'components/Pagination/Pagination';
import { getQueryVariable } from 'utils/utils';
import {
  reset,
  setAllParams,
  setBaseUrl,
  setComic,
  setName,
  setStory,
} from 'actions/search';
import 'pages/characters/ListCharactersPage/ListCharactersPage.scss';

const ListCharactersPage = () => {
  enum QuerysParams {
    Page = 'page',
    Name = 'name',
    Comic = 'comic',
    Story = 'story'
  }

  const history = useHistory();
  const dispatch = useDispatch();
  const [comics, setComics] = useState<IComic[]>([]);
  const [stories, setStories] = useState<IStory[]>([]);
  const {
    url,
    limit,
    offset,
    name,
    comic,
    story,
  } = useSelector((state: IRootState) => state.search);
  const { loading, data: genericResponse, error } = useFetch<IGenericApiResponse<ICharacter>>(url);

  const { data } = genericResponse ?? {};
  const { results, total } = data ?? {};

  const handleChangePage = (newPage: number) => history.push(
    `?${queryString.stringify({
      page: newPage,
      name,
      comic,
      story,
    })}`,
  );

  const debouncedNameChange = useCallback(
    debounce((name: string, comic: string, story: string) => history.push(
      `?${queryString.stringify({
        name,
        comic,
        story,
        page: 1,
      })}`,
    ), 1000),
    [],
  );

  const handleNameChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(target.value));
    debouncedNameChange(target.value, comic, story);
  };

  const handleComicChange = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setComic(target.value));

    history.push(
      `?${queryString.stringify({
        comic: target.value,
        page: 1,
        story,
        name,
      })}`,
    );
  };

  const handleStoryChange = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStory(target.value));

    history.push(
      `?${queryString.stringify({
        story: target.value,
        page: 1,
        comic,
        name,
      })}`,
    );
  };

  useEffect(() => {
    dispatch(setBaseUrl(`${process.env.REACT_APP_API_URL}v1/public/characters`));

    getFirstNComics(10).then(genRes => {
      if (genRes) {
        const { data } = genRes;
        const { results } = data;
        setComics(results);
      } else {
        setComics([]);
      }
    }).catch(e => setComics([]));

    getFirstNStories(10).then(genRes => {
      if (genRes) {
        const { data } = genRes;
        const { results } = data;
        setStories(results);
      } else {
        setStories([]);
      }
    }).catch(e => setStories([]));

    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    const newPage = getQueryVariable(QuerysParams.Page)
      ? +getQueryVariable(QuerysParams.Page)
      : 1;

    const newName = getQueryVariable(QuerysParams.Name)
      ? decodeURI(getQueryVariable(QuerysParams.Name))
      : '';

    const newComic = getQueryVariable(QuerysParams.Comic)
      ? decodeURI(getQueryVariable(QuerysParams.Comic))
      : '';

    const newStory = getQueryVariable(QuerysParams.Story)
      ? decodeURI(getQueryVariable(QuerysParams.Story))
      : '';

    const newOffset = Math.ceil((newPage - 1) * limit);

    dispatch(setAllParams(newOffset, newName, newComic, newStory));
  }, [history.location, limit]);

  return (
    <div className="main-content mb-5">
      <div className="page-title-div">
        <h1>Characters</h1>
      </div>
      <div className="search-filters-form mb-5">
        <form>
          <div className="search-title">Search your hero</div>
          <div className="search-header">Name</div>
          <div className="search-header">Comic</div>
          <div className="search-header">Story</div>
          <div className="search-value">
            <input
              type="text"
              name="name"
              autoComplete="off"
              className="search-input"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div className="search-value">
            <select className="search-input" value={comic} onChange={handleComicChange}>
              <option value="">Select a comic</option>
              {comics
                && comics.map(comic => (
                  <option key={comic.id} value={comic.id}>
                    {comic.title}
                  </option>
                ))}
            </select>
          </div>

          <div className="search-value">
            <select className="search-input" value={story} onChange={handleStoryChange}>
              <option value="">Select a story</option>
              {stories
                && stories.map(story => (
                  <option key={story.id} value={story.id}>
                    {story.title}
                  </option>
                ))}
            </select>
          </div>
        </form>
      </div>
      {loading && <Loading />}
      {error && <h2 className="error-message">Could not load characters 😓</h2>}
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
      {results && results.length <= 0 && (
        <h2 className="error-message">Characters not found 😮</h2>
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

export default ListCharactersPage;
