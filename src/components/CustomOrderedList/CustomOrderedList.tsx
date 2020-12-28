/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import React from 'react';
import { shortenText } from 'utils/utils';
import IExtendedObjectItem from 'interfaces/common/IExtendedObjectItem';
import 'components/CustomOrderedList/CustomOrderedList.scss';

interface ICustomOrderedList {
  items: IExtendedObjectItem[];
  onClick(id: string): void;
}

const CustomOrderedList = ({ items, onClick }: ICustomOrderedList) => (
  <ol className="custom-ol">
    {items.map(item => {
      const pathVars = item.resourceURI.split('/');
      const resourceId = pathVars[pathVars.length - 1];
      return (
        <li className="custom-li" key={item.resourceURI} onClick={() => onClick(resourceId)}>
          {shortenText(item.name, 30)}
        </li>
      );
    })}
  </ol>
);

export default CustomOrderedList;
