/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint no-shadow: 0 */
/* eslint no-unused-vars: 0 */
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';
import { IRootState } from 'store/store';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import ICharacter from 'interfaces/ICharacter';
import IComic from 'interfaces/IComic';
import IStory from 'interfaces/IStory';
import { getComicsByOffsetLimit, getStoriesByOffsetLimit } from 'helpers/fetchService';
import Select from 'components/Select/Select';
import Card from 'components/Card/Card';
import Loading from 'components/Loading/Loading';
import Pagination from 'components/Pagination/Pagination';
import { getQueryVariable } from 'utils/utils';
import { get } from 'API/FetchInfo';
import { imagePlaceholder } from 'utils/globals';
import { hideLocalItem } from 'actions/localItems';
import {
  setAllParams,
  setAsyncContent,
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

  const isMounted = useRef(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const [comics, setComics] = useState<IComic[]>([]);
  const [stories, setStories] = useState<IStory[]>([]);
  const {
    url,
    limit,
    name,
    comic,
    story,
    loading,
    error,
    data: genericResponse,
  } = useSelector((state: IRootState) => state.search);
  const { hiddenItems } = useSelector((state: IRootState) => state.localItems);

  const { data } = genericResponse ?? {};
  const { results } = data ?? {};
  const [characters, setCharacters] = useState<ICharacter[] | null>(null);

  const changeUrlParams = (
    newPage: number,
    newName: string,
    newComic: string,
    newStory: string,
  ) => {
    history.push(
      `?${queryString.stringify({
        page: newPage,
        story: newStory === '' ? undefined : newStory,
        comic: newComic === '' ? undefined : newComic,
        name: newName === '' ? undefined : newName,
      })}`,
    );
  };

  const handleChangePage = (newPage: number) => {
    window.scrollTo({ top: 300 });
    changeUrlParams(newPage, name, comic, story);
  };

  const debouncedNameChange = useCallback(
    debounce((name: string,
      comic: string,
      story: string) => changeUrlParams(1, name, comic, story),
    1000),
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

    changeUrlParams(1, name, target.value, story);
  };

  const handleStoryChange = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStory(target.value));

    changeUrlParams(1, name, comic, target.value);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => e.preventDefault();

  const handleViewMore = (id: number) => history.push(`characters/${id}`);

  const handleHideItem = (id: number) => dispatch(hideLocalItem({ id, type: 'CHARACTER' }));

  useEffect(() => {
    dispatch(setBaseUrl(`${process.env.REACT_APP_API_URL}v1/public/characters`));

    getComicsByOffsetLimit(0, 10).then(genRes => {
      if (isMounted.current) {
        if (genRes) {
          const { data } = genRes;
          const { results } = data;
          setComics(results);
        } else {
          setComics([]);
        }
      }
    }).catch(e => {
      if (isMounted.current) {
        setComics([]);
      }
    });

    getStoriesByOffsetLimit(40, 10).then(genRes => {
      if (isMounted.current) {
        if (genRes) {
          const { data } = genRes;
          const { results } = data;
          setStories(results);
        } else {
          setStories([]);
        }
      }
    }).catch(e => {
      if (isMounted.current) {
        setStories([]);
      }
    });

    return () => {
      isMounted.current = false;
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

  useEffect(() => {
    if (url) {
      dispatch(setAsyncContent(true, '', null));
      get<IGenericApiResponse<ICharacter>>(url)
        .then(res => {
          dispatch(setAsyncContent(false, '', res));
        })
        .catch(err => {
          dispatch(setAsyncContent(false, 'Could not load characters', null));
        });
    }
  }, [url]);

  useEffect(() => {
    if (results) {
      const hiddenChars = hiddenItems.filter(item => item.type === 'CHARACTER');
      setCharacters(results.filter(char => {
        const hiddenCharFilter = hiddenChars.filter(item => item.id === char.id);
        if (hiddenCharFilter.length > 0) {
          return false;
        }
        return true;
      }));
    }
  }, [results, hiddenItems]);

  return (
    <div className="main-content mb-5">
      <div className="page-title-div">
        <h1>Characters</h1>
      </div>
      <div className="search-filters-form mb-5">
        <form onSubmit={handleSubmit}>
          <div className="search-title">Search your hero</div>
          <div className="search-header">Name</div>
          <div className="search-header">Comic</div>
          <div className="search-header">Story</div>
          <div className="search-value">
            <input
              type="text"
              name="name"
              placeholder="Hero´s name"
              autoComplete="off"
              className="search-input"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div className="search-value">
            <Select
              defaultOptionText="Select a comic"
              items={comics}
              value={comic}
              onChange={handleComicChange}
            />
          </div>

          <div className="search-value">
            <Select
              defaultOptionText="Select a story"
              items={stories}
              value={story}
              onChange={handleStoryChange}
            />
          </div>

        </form>
      </div>
      {loading && <Loading />}
      {error && <h2 className="error-message">Could not load characters 😓</h2>}
      <div className="cards">
        <div className="cards-content">
          {!loading
            && characters
            && characters.map(char => (
              <Card
                key={char.id}
                id={char.id}
                name={char.name}
                description={char.description ?? ''}
                handleViewMore={handleViewMore}
                handleHideItem={handleHideItem}
                imageUrl={char.thumbnail
                  ? `${char.thumbnail.path}/portrait_uncanny.${char.thumbnail.extension}`
                  : imagePlaceholder}
              />
            ))}
        </div>
      </div>
      {results && results.length <= 0 && (
        <h2 className="error-message">Characters not found 😮</h2>
      )}
      {!loading && characters && characters.length <= 0 && (
        <h2 className="error-message">Characters on this page are hidden 🤐</h2>
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

export default ListCharactersPage;
