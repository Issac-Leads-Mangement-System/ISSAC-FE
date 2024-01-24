import { ChangeEventHandler, KeyboardEventHandler } from 'react';

export enum InputType {
  Text = 'text',
  Password = 'password',
  Number = 'number',
  NegativeNumber = 'negative-number',
  Float = 'float',
  FloatInfinte = 'float-infinite',
  NumberAndComma = 'number-and-comma',
}
export interface IInputProps {
  className?: String;
  minWidth?: String;
  label?: String;
  theme?: any;
  labelFontSize?: String;
  inputFontSize?: String;
  value?: String | Number | Date;
  disabled?: boolean;
  error?: String;
  onChange: ChangeEventHandler;
  inputType?: InputType;
  style?: any;
  icon?: String | null;
  hasEmailIcon?: boolean | false;
  hasPasswordIcon?: boolean | false;
  onKeyPress?: KeyboardEventHandler;
  name?: String;
  placeholder?: string;
  handleSubmitIconCallback?: Function;
  step?: string;
  tooltip?: any;
  hasInputTooltip?: boolean;
  allowZero?: boolean;
  versionClassName?: string;
  size?: any;
}

export enum ButtonTypes {
  Default = 'default',
}
export enum allowedInputIcons {
  search = 'Search',
  checkCircle = 'CheckCircle'
}
