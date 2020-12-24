interface IFormatOptions {
  name: string;
  value: string;
}
const formatOptions = [
  {
    value: 'comic',
    name: 'Comic',
  },
  {
    value: 'magazine',
    name: 'Magazine',
  },
  {
    value: 'trade paperback',
    name: 'Trade Paperback',
  },
  {
    value: 'hardcover',
    name: 'Hardcover',
  },
  {
    value: 'digest',
    name: 'Digest',
  },
  {
    value: 'graphic novel',
    name: 'Graphic Novel',
  },
  {
    value: 'digital comic',
    name: 'Digital Comic',
  },
  {
    value: 'infinite comic',
    name: 'Infinite Comic',
  },
] as IFormatOptions[];

export default formatOptions;
