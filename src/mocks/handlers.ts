/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
import { rest } from 'msw';

const handlers = [
  rest.get(`${process.env.REACT_APP_API_URL}v1/public/characters`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          offset: 0,
          limit: 12,
          total: 1,
          count: 1,
          results: [
            {
              id: 1,
              name: 'spiderman',
              description: 'description',
              thumbnail: {
                path: 'path',
                extension: 'jpg',
              },
            },
          ],
        },
      }),
    );
  }),
  rest.get(`${process.env.REACT_APP_API_URL}v1/public/comics`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          offset: 0,
          limit: 12,
          total: 1,
          count: 1,
          results: [
            {
              id: 1,
              title: 'comic spiderman',
              description: 'description',
              thumbnail: {
                path: 'path',
                extension: 'jpg',
              },
            },
          ],
        },
      }),
    );
  }),
  rest.get(`${process.env.REACT_APP_API_URL}v1/public/stories`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          offset: 0,
          limit: 12,
          total: 1,
          count: 1,
          results: [
            {
              id: 1,
              title: 'story spiderman',
              description: 'description',
              thumbnail: {
                path: 'path',
                extension: 'jpg',
              },
            },
          ],
        },
      }),
    );
  }),
];

export default handlers;
