import IExtendedObjectItem from 'interfaces/common/IExtendedObjectItem';

interface IExtendedObject {
  available: number;
  returned: number;
  collectionURI: string;
  items: IExtendedObjectItem[];
}

export default IExtendedObject;
