import { IconTypes } from 'solid-icons';

interface IListItemData {
  isLink: boolean,
  url?: string,
  icon: IconTypes,
  label: string,
  onClick: () => void;
}

export default IListItemData;

