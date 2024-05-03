interface IMenuItemProp {
  disabled?: boolean,
  label: string,
  onClick?: () => void,
  isLink: boolean,
  url?: string,
  icon?: string,
}

export default IMenuItemProp;
