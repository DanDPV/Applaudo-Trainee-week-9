import IUrls from 'interfaces/common/IUrls';
import IExtendedObject from 'interfaces/common/IExtendedObject';
import IExtendedObjectItem from 'interfaces/common/IExtendedObjectItem';

interface IComic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: Date;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: {
    type: string;
    language: string;
    text: string;
  }[];
  resourceURI: string;
  urls: IUrls[];
  series: IExtendedObjectItem;
  variants: IExtendedObjectItem[];
  collections: IExtendedObjectItem[];
  collectedIssues: IExtendedObjectItem[];
  dates: {
    type: string;
    date: Date;
  }[];
  prices: {
    type: string;
    price: number;
  }[];
  thumbnail: {
    path: string;
    extension: string;
  };
  images: {
    path: string;
    extension: string;
  }[];
  creators: IExtendedObject;
  characters: IExtendedObject;
  stories: IExtendedObject;
  events: IExtendedObject;
}

export default IComic;
