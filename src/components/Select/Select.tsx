/* eslint no-unused-vars:0 */
import React from 'react';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { shortenText } from 'utils/utils';
import 'components/Select/Select.scss';

interface ISelect<T extends IRequiredValues> {
  items: T[];
  defaultOptionText: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface IRequiredValues {
  id: number;
  title: string;
}

const Select = <T extends IRequiredValues>({
  items,
  defaultOptionText,
  value,
  onChange,
}: ISelect<T>) => {
  const { width } = useWindowDimensions();

  return (
    <select className="search-select" value={value} onChange={onChange}>
      <option value="">{defaultOptionText}</option>
      {items
        && items.map(item => (
          <option key={item.id} value={item.id}>
            {shortenText(item.title, Math.ceil(width * 0.035))}
          </option>
        ))}
    </select>
  );
};

export default Select;
