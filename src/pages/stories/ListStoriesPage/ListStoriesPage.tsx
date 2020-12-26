/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint no-shadow: 0 */
/* eslint no-unused-vars: 0 */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { debounce } from 'lodash';
import { IRootState } from 'store/store';
import Card from 'components/Card/Card';
import Loading from 'components/Loading/Loading';
import Pagination from 'components/Pagination/Pagination';
import { getQueryVariable } from 'utils/utils';
import IStory from 'interfaces/IStory';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import { get } from 'API/FetchInfo';
import { imagePlaceholder } from 'utils/globals';
import {
  setStoryBaseUrl,
  setStoryTitle,
  setStoryAllParams,
  setStoryAsyncContent,
} from 'actions/searchStory';
import 'pages/stories/ListStoriesPage/ListStoriesPage.scss';

const ListStoriesPage = () => {
  enum QuerysParams {
    Page = 'page',
    Title = 'title',
  }

  const history = useHistory();
  const dispatch = useDispatch();
  const {
    url,
    limit,
    title,
    loading,
    error,
    data: genericResponse,
  } = useSelector((state: IRootState) => state.searchStory);

  const { data } = genericResponse ?? {};
  const { results } = data ?? {};

  const changeUrlParams = (
    newPage: number,
    newTitle: string,
  ) => {
    history.push(
      `?${queryString.stringify({
        page: newPage,
        title: newTitle === '' ? undefined : newTitle,
      })}`,
    );
  };

  const handleChangePage = (newPage: number) => {
    window.scrollTo({ top: 300 });
    changeUrlParams(newPage, title);
  };

  const debouncedTitleChange = useCallback(
    debounce(
      (title: string) => changeUrlParams(1, title),
      1000,
    ),
    [],
  );

  const handleTitleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setStoryTitle(target.value));
    debouncedTitleChange(target.value);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => e.preventDefault();

  useEffect(() => {
    dispatch(setStoryBaseUrl(`${process.env.REACT_APP_API_URL}v1/public/stories`));
  }, []);

  useEffect(() => {
    const newPage = getQueryVariable(QuerysParams.Page)
      ? +getQueryVariable(QuerysParams.Page)
      : 1;

    const newTitle = getQueryVariable(QuerysParams.Title)
      ? decodeURI(getQueryVariable(QuerysParams.Title))
      : '';

    const newOffset = Math.ceil((newPage - 1) * limit);

    dispatch(setStoryAllParams(newOffset, newTitle));
  }, [history.location, limit]);

  useEffect(() => {
    if (url) {
      dispatch(setStoryAsyncContent(true, '', null));
      get<IGenericApiResponse<IStory>>(url)
        .then(res => {
          dispatch(setStoryAsyncContent(false, '', res));
        })
        .catch(err => {
          dispatch(setStoryAsyncContent(false, 'Could not load stories', null));
        });
    }
  }, [url]);

  return (
    <div className="story-main-content mb-5">
      <div className="story-page-title-div">
        <h1>Stories</h1>
      </div>
      <div className="story-search-filters-form mb-5">
        <form onSubmit={handleSubmit}>
          <div className="story-search-title">Search your story</div>
          <div className="search-header">Title</div>
          <div className="search-value">
            <input
              type="text"
              name="title"
              placeholder="Story's title"
              autoComplete="off"
              className="search-input"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
        </form>
      </div>
      {loading && <Loading />}
      {error && <h2 className="error-message">Could not load comics 😓</h2>}
      <div className="cards">
        <div className="cards-content">
          {results
            && results.map(story => (
              <Card
                key={story.id}
                name={story.title}
                description={story.description ?? ''}
                imageUrl={story.thumbnail
                  ? `${story.thumbnail.path}/portrait_uncanny.${story.thumbnail.extension}`
                  : imagePlaceholder}
              />
            ))}
        </div>
      </div>
      {results && results.length <= 0 && (
        <h2 className="error-message">Stories not found 😮</h2>
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

export default ListStoriesPage;
