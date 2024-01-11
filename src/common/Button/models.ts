import { MouseEventHandler } from 'react';

export enum ButtonType {
  Button = 'button',
  Reset = 'reset',
  Submit = 'submit',
}

export interface IButtonProps {
  name: String;
  handleClick?: MouseEventHandler;
  type: String;
  className?: String;
  theme?: any;
  marginTop?: String;
  marginBottom?: String;
  marginRight?: String;
  marginLeft?: String;
  width?: String;
  height?: String;
  buttonType?: ButtonType;
  disabled?: boolean | undefined;
  style?: any;
  startIcon?: any;
}

export enum ButtonTypes {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  Default = 'default',
  Error = 'error',
}