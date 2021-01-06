/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
import { rest } from 'msw';
import {
  characterResponse,
  charactersResponse,
  comicsResponse,
  storiesResponse,
} from './testData';

const handlers = [
  rest.get(`${process.env.REACT_APP_API_URL}v1/public/characters`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(charactersResponse()),
    );
  }),
  rest.get(`${process.env.REACT_APP_API_URL}v1/public/characters/:idCharacter`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(characterResponse()),
    );
  }),
  rest.get(`${process.env.REACT_APP_API_URL}v1/public/comics`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(comicsResponse()),
    );
  }),
  rest.get(`${process.env.REACT_APP_API_URL}v1/public/stories`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(storiesResponse()),
    );
  }),
];

export default handlers;
