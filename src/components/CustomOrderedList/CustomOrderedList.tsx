import React from 'react';
import { shortenText } from 'utils/utils';
import IExtendedObjectItem from 'interfaces/common/IExtendedObjectItem';
import 'components/CustomOrderedList/CustomOrderedList.scss';

interface ICustomOrderedList {
    items: IExtendedObjectItem[];
}

const CustomOrderedList = ({ items }: ICustomOrderedList) => (
  <ol className="custom-ol">
    {items.map(item => (
      <li className="custom-li" key={item.resourceURI}>
        {shortenText(item.name, 30)}
      </li>
    ))}
  </ol>
);

export default CustomOrderedList;
