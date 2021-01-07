/* eslint-disable implicit-arrow-linebreak */
import ICharacter from 'interfaces/ICharacter';
import IComic from 'interfaces/IComic';
import IStory from 'interfaces/IStory';

const createGenericApiResponse = <T>(results: T[]) => ({
  data: {
    offset: 0,
    limit: 12,
    total: 1,
    count: 1,
    results,
  },
});

const charactersResponse = () =>
  createGenericApiResponse<ICharacter>([
    {
      id: 1,
      name: 'spiderman',
      description: 'description',
      thumbnail: {
        path: 'path',
        extension: 'jpg',
      },
      modified: new Date(),
      resourceURI: '',
      urls: [],
      comics: {} as any,
      stories: {} as any,
      events: {} as any,
      series: {} as any,
    },
  ]);

const characterResponse = () =>
  createGenericApiResponse<ICharacter>([
    {
      id: 1,
      name: 'spiderman',
      description: 'description',
      thumbnail: {
        path: 'path',
        extension: 'jpg',
      },
      modified: new Date(),
      resourceURI: '',
      urls: [{
        type: 'detail',
        url: 'http://marvel.com/characters/2854/adam_warlock?utm_campaign=apiRef&utm_source=10dea460449717d1dce670f173fe30b9',
      },
      {
        type: 'wiki',
        url: 'http://marvel.com/universe/Warlock,_Adam?utm_campaign=apiRef&utm_source=10dea460449717d1dce670f173fe30b9',
      }],
      comics: {
        available: 1,
        returned: 1,
        collectionURI: '',
        items: [{
          resourceURI: '',
          name: 'Spiderman Comic',
        }],
      },
      stories: {
        available: 1,
        returned: 1,
        collectionURI: '',
        items: [{
          resourceURI: '',
          name: 'Spiderman Story',
        }],
      },
      events: {} as any,
      series: {} as any,
    },
  ]);

const comicsResponse = () =>
  createGenericApiResponse<IComic>([
    {
      id: 1,
      title: 'comic spiderman',
      description: 'description',
      thumbnail: {
        path: 'path',
        extension: 'jpg',
      },
      modified: new Date(),
      resourceURI: '',
      urls: [],
      characters: {} as any,
      stories: {} as any,
      events: {} as any,
      series: {} as any,
      variants: {} as any,
      collections: {} as any,
      collectedIssues: {} as any,
      creators: {} as any,
      digitalId: 0,
      issueNumber: 0,
      variantDescription: '',
      isbn: '',
      upc: '',
      diamondCode: '',
      ean: '',
      issn: '',
      format: '',
      pageCount: 10,
      textObjects: [],
      dates: [],
      prices: [],
      images: [],
    },
  ]);

const comicResponse = () =>
  createGenericApiResponse<IComic>([
    {
      id: 1,
      title: 'comic spiderman',
      description: 'description',
      thumbnail: {
        path: 'path',
        extension: 'jpg',
      },
      modified: new Date(),
      resourceURI: '',
      urls: [],
      characters: {
        available: 1,
        returned: 1,
        collectionURI: '',
        items: [{
          resourceURI: '',
          name: 'Char Spiderman',
        }],
      },
      stories: {
        available: 1,
        returned: 1,
        collectionURI: '',
        items: [{
          resourceURI: '',
          name: 'Spiderman Story',
        }],
      },
      events: {} as any,
      series: {} as any,
      variants: {} as any,
      collections: {} as any,
      collectedIssues: {} as any,
      creators: {} as any,
      digitalId: 0,
      issueNumber: 0,
      variantDescription: '',
      isbn: '',
      upc: '',
      diamondCode: '',
      ean: '',
      issn: '',
      format: '',
      pageCount: 10,
      textObjects: [],
      dates: [],
      prices: [],
      images: [],
    },
  ]);

const storiesResponse = () =>
  createGenericApiResponse<IStory>([
    {
      id: 1,
      title: 'story spiderman',
      description: 'description',
      thumbnail: {
        path: 'path',
        extension: 'jpg',
      },
      modified: new Date(),
      resourceURI: '',
      comics: {} as any,
      characters: {} as any,
      events: {} as any,
      series: {} as any,
      creators: {} as any,
      originalIssue: {} as any,
      type: '',
    },
  ]);

const storyResponse = () =>
  createGenericApiResponse<IStory>([
    {
      id: 1,
      title: 'story spiderman',
      description: 'description',
      thumbnail: {
        path: 'path',
        extension: 'jpg',
      },
      modified: new Date(),
      resourceURI: '',
      comics: {
        available: 1,
        returned: 1,
        collectionURI: '',
        items: [{
          resourceURI: '',
          name: 'Spiderman Comic',
        }],
      },
      characters: {
        available: 1,
        returned: 1,
        collectionURI: '',
        items: [{
          resourceURI: '',
          name: 'Char Spiderman',
        }],
      },
      events: {} as any,
      series: {} as any,
      creators: {} as any,
      originalIssue: {
        resourceURI: 'apiUrl/comics/1',
        name: 'Spiderman Comic',
      },
      type: '',
    },
  ]);

export {
  createGenericApiResponse,
  charactersResponse,
  characterResponse,
  comicsResponse,
  comicResponse,
  storiesResponse,
  storyResponse,
};
