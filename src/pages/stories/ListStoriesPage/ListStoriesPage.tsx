/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint no-shadow: 0 */
/* eslint no-unused-vars: 0 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IRootState } from 'store/store';
import Card from 'components/Card/Card';
import { getQueryVariable } from 'utils/utils';
import IStory from 'interfaces/IStory';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import { get } from 'API/FetchInfo';
import {
  setStoryBaseUrl,
  setStoryAllParams,
  setStoryLoading,
  setStoryData,
  setStoryError,
} from 'actions/searchStory';

const ListStoriesPage = () => {
  enum QuerysParams {
    Page = 'page',
    Title = 'title',
  }

  const history = useHistory();
  const dispatch = useDispatch();
  const {
    url,
    offset,
    limit,
    title,
    loading,
    error,
    data: genericResponse,
  } = useSelector((state: IRootState) => state.searchStory);

  const { data } = genericResponse ?? {};
  const { results, total } = data ?? {};

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
      dispatch(setStoryLoading(true));
      dispatch(setStoryData(null));
      get<IGenericApiResponse<IStory>>(url)
        .then(res => {
          dispatch(setStoryData(res));
          dispatch(setStoryLoading(false));
        })
        .catch(err => {
          dispatch(setStoryData(null));
          dispatch(setStoryLoading(false));
          dispatch(setStoryError('Could not load comics'));
        });
    }
  }, [url]);

  return (
    <div className="story-main-content mb-5">
      <div className="story-page-title-div">
        <h1>Stories</h1>
      </div>
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
                  : 'https://images7.alphacoders.com/514/thumb-1920-514639.jpg'}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ListStoriesPage;
