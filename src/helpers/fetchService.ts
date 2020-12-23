/* eslint-disable import/prefer-default-export */
import queryString from 'query-string';
import { get } from 'API/FetchInfo';
import IGenericApiResponse from 'interfaces/IGenericApiResponse';
import IComic from 'interfaces/IComic';

const getFirstNComics = async (limit: number) => {
  try {
    const data = await get<IGenericApiResponse<IComic>>(
      `${process.env.REACT_APP_API_URL}v1/public/comics?${queryString.stringify(
        {
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

export { getFirstNComics };
