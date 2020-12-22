import IUrls from 'interfaces/common/IUrls';
import IExtendedObject from 'interfaces/common/IExtendedObject';

interface ICharacter {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  urls: IUrls[];
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: IExtendedObject;
  stories: IExtendedObject;
  events: IExtendedObject;
  series: IExtendedObject;
}

export default ICharacter;
