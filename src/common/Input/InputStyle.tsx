/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from "styled-components";

export const InputStyle = (props: any) => css`
  &.inputWrapper {
    margin: 0 0em 7px;
  }
  &.MuiFormControl-root {
    min-width: ${props.minWidth ? props.minWidth.toString() : "240px"};
    margin-bottom: ${props?.style?.marginBottom
      ? props.style.marginBottom.toString()
      : "inherit"};

    .MuiOutlinedInput-root {
      background: ${props?.style?.backgroundColor
        ? props.style.backgroundColor
        : "transparent"};
      .MuiOutlinedInput-notchedOutline {
        border: 1px solid ${props.theme?.Color?.Mercury};
        border-radius: 2px;
      }
      input {
        padding: 8px 20px 8px 8px;
        line-height: 17px;
        font-size: ${props.inputFontSize
          ? props.inputFontSize.toString()
          : "14px"};
        color: ${props.theme?.Color?.Lynch};
        background: ${props?.style?.backgroundColor
          ? props.style.backgroundColor
          : "transparent"};
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        &[type="number"] {
          -moz-appearance: textfield;
        }
      }
      .MuiSvgIcon-root {
        color: ${props.theme?.Color?.Lynch};
        background: ${props?.style?.backgroundColor
          ? props.style.backgroundColor
          : "transparent"};
      }
    }
    .MuiFormHelperText-root {
      color: ${props.theme?.Color?.Error};
      margin: 5px 0px 0px 0px;
    }
  }

  &.MuiInputLabel-root {
    font-style: normal;
    font-weight: 600;
    font-size: ${props.labelFontSize ? props.labelFontSize.toString() : "13px"};
    line-height: 16px;
    color: ${props.theme?.Color?.Blumine};
    width: 100%;
    margin-bottom: 6px;
  }
`;
