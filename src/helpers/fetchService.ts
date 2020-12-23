import queryString from 'query-string';
import { get } from 'API/FetchInfo';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import IComic from 'interfaces/IComic';
import IStory from 'interfaces/IStory';

const getComicsByOffsetLimit = async (offset: number, limit: number) => {
  try {
    const data = await get<IGenericApiResponse<IComic>>(
      `${process.env.REACT_APP_API_URL}v1/public/comics?${queryString.stringify(
        {
          offset,
          limit,
          apikey: process.env.REACT_APP_PUBLIC_KEY,
        },
      )}`,
    );
    return data;
  } catch (error) {
    return null;
  }
};

const getStoriesByOffsetLimit = async (offset: number, limit: number) => {
  try {
    const data = await get<IGenericApiResponse<IStory>>(
      `${process.env.REACT_APP_API_URL}v1/public/stories?${queryString.stringify(
        {
          offset,
          limit,
          apikey: process.env.REACT_APP_PUBLIC_KEY,
        },
      )}`,
    );
    return data;
  } catch (error) {
    return null;
  }
};

export { getComicsByOffsetLimit, getStoriesByOffsetLimit };
