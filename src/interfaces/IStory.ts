import IExtendedObject from 'interfaces/common/IExtendedObject';

interface IStory {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  type: string;
  modified: Date;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: IExtendedObject;
  series: IExtendedObject;
  events: IExtendedObject;
  characters: IExtendedObject;
  creators: IExtendedObject;
  originalIssue: {
    resourceURI: string;
    name: string;
  };
}

export default IStory;
