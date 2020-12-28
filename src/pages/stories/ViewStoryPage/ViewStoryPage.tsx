/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import queryString from 'query-string';
import { IRootState } from 'store/store';
import { get } from 'API/FetchInfo';
import RouteNames from 'routers/RouteNames';
import { setViewItemAsyncContent } from 'actions/viewItem';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import IStory from 'interfaces/IStory';
import CustomOrderedList from 'components/CustomOrderedList/CustomOrderedList';
import 'pages/stories/ViewStoryPage/ViewStoryPage.scss';

const ViewStoryPage = () => {
  interface pathParams {
    idStory: string;
  }

  const history = useHistory();
  const dispatch = useDispatch();
  const { idStory } = useParams<pathParams>();
  const { loading, error, data: genericResponse } = useSelector(
    (state: IRootState) => state.viewItem,
  );

  const { data } = genericResponse ?? {};
  const { results } = data ?? {};
  const [story, setStory] = useState<IStory | null>(null);

  const handleBack = () => {
    if (history.length <= 2) history.push(RouteNames.Home);
    else history.goBack();
  };

  useEffect(() => {
    if (results) {
      if (!('stories' in results[0])) {
        setStory((results[0] as unknown) as IStory);
      }
    }
  }, [results]);

  useEffect(() => {
    dispatch(setViewItemAsyncContent(true, '', null));
    const url = `${
      process.env.REACT_APP_API_URL
    }v1/public/stories/${idStory}?${queryString.stringify({
      apikey: process.env.REACT_APP_PUBLIC_KEY,
    })}`;
    get<IGenericApiResponse<IStory>>(url)
      .then(res => {
        dispatch(setViewItemAsyncContent(false, '', res));
      })
      .catch(() => {
        dispatch(setViewItemAsyncContent(false, 'Could not load story', null));
      });
  }, []);

  return (
    <div className="main-content mb-5">
      {!loading && !error && story && (
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
            <h1 className="image-header-title">Marvel story</h1>
          </div>
          <div className="story-info">
            {story.title}
          </div>
          <div className="story-info">
            {story.description}
          </div>
          <div className="related-items-div">
            <h3 className="related-items-title">Characters</h3>
            {story.characters.returned > 0
              ? <CustomOrderedList items={story.characters.items} />
              : <p className="not-found">No characters found 🤔</p>}
          </div>
          <div className="related-items-div">
            <h3 className="related-items-title">Comics</h3>
            {story.comics.returned > 0
              ? <CustomOrderedList items={story.comics.items} />
              : <p className="not-found">No comics found 🤔</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewStoryPage;
