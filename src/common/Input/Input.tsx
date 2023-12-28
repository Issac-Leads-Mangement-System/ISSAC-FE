/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TextField, InputLabel, Tooltip } from "@mui/material";
import { Search, CheckCircle, InfoOutlined } from "@mui/icons-material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import styled from "styled-components";
import { InputStyle } from "./InputStyle";
import { trim } from "lodash";

import { IInputProps, allowedInputIcons, InputType } from "./models";

function getStartAdornment(email: any, password: any) {
  if (email) return <EmailOutlinedIcon className="emailAdornment" />;
  if (password) return <LockOutlinedIcon className="passwordAdornment" />;
  return null;
}

function Input({
  className,
  label,
  value,
  disabled,
  error,
  onChange,
  inputType,
  icon,
  hasEmailIcon,
  hasPasswordIcon,
  onKeyPress,
  name,
  placeholder,
  style,
  handleSubmitIconCallback,
  step,
  tooltip,
  hasInputTooltip,
  allowZero,
  versionClassName,
}: IInputProps) {
  const getValue = () => {
    if (inputType === InputType.Number && !allowZero) {
      return value || "";
    }
    if (inputType === InputType.Number && allowZero && value === 0) {
      return 0;
    }
    return value || "";
  };

  const renderIcon = (iconName: String) => {
    switch (iconName) {
      case allowedInputIcons.search:
        return (
          <Search
            onClick={() => {
              if (handleSubmitIconCallback) handleSubmitIconCallback(value);
            }}
          />
        );
      case allowedInputIcons.checkCircle:
        return (
          <CheckCircle
            onClick={() => {
              if (handleSubmitIconCallback) handleSubmitIconCallback(value);
            }}
          />
        );

      default:
        return <></>;
    }
  };

  const handleChangeInput = (e: any) => {
    const positiveNumberReg = /^[0-9\b]+$/;
    const negativeNumberReg = /^-?\d+$|^-0$|^-$|^$/;
    const floatReg = /^(\d{1})(\.\d{1,2})?$/;
    const floatInfiniteReg = /^(?:\d+(?:\.\d+)?|\d+\.)$/;
    const val = (e.target as HTMLInputElement).value;
    if (
      inputType === InputType.Number &&
      (positiveNumberReg.test(val) || val === "")
    ) {
      onChange(e);
    } else if (
      inputType === InputType.NegativeNumber &&
      (negativeNumberReg.test(val) || val === "")
    ) {
      onChange(e);
    } else if (
      inputType === InputType.Float &&
      (floatReg.test(val) || val === "")
    ) {
      onChange(e);
    } else if (
      inputType === InputType.FloatInfinte &&
      (floatInfiniteReg.test(val) || val === "")
    ) {
      onChange(e);
    } else if (
      inputType === InputType.NumberAndComma &&
      _isNumberAndComma(val)
    ) {
      onChange(e);
    } else if (
      !_isNumberType(inputType) &&
      inputType !== InputType.NumberAndComma
    ) {
      onChange(e);
    }
  };

  const _isNumberAndComma = (val: string) => {
    const onlyNumbersAndComma = /^[\d,]*$/;
    return onlyNumbersAndComma.test(val);
  };

  const _isNumberType = (type: string | undefined): boolean => {
    return (
      type === InputType.Float ||
      type === InputType.FloatInfinte ||
      type === InputType.Number ||
      type === InputType.NegativeNumber
    );
  };

  return (
    <div
      className={`${className} ${versionClassName} inputWrapper`}
      style={style}
    >
      {label && (
        <InputLabel className={`${className}`}>
          {label}
          {tooltip && (
            <Tooltip title={tooltip} className="info-toltip">
              <InfoOutlined />
            </Tooltip>
          )}
        </InputLabel>
      )}
      {/* {hasInputTooltip && value ? (
        <Tooltip title={value || ""} className="info-toltip">
          <TextField
            autoComplete="true"
            className={`${className}`}
            disabled={disabled}
            value={value || ""}
            onChange={handleChangeInput}
            onBlur={(e) => {
              e.target.value = trim(e.target.value);
              handleChangeInput(e);
            }}
            helperText={error && error}
            type={
              _isNumberType(inputType) ? InputType.Number : inputType || "text"
            }
            onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
            onKeyPress={onKeyPress}
            placeholder={placeholder || ""}
            InputProps={{
              endAdornment: icon ? renderIcon(icon) : null,
              name: (name as string) || "",
              startAdornment: getStartAdornment(hasEmailIcon, hasPasswordIcon),
            }}
          />
        </Tooltip>
      ) : ( */}
      <TextField
        autoComplete="true"
        className={`${className}`}
        disabled={disabled}
        value={getValue()}
        onChange={handleChangeInput}
        onBlur={(e) => {
          e.target.value = trim(e.target.value);
          handleChangeInput(e);
        }}
        helperText={error && error}
        type={
          inputType && inputType === InputType.Float
            ? InputType.Number
            : inputType || "text"
        }
        onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
        onKeyPress={onKeyPress}
        placeholder={placeholder || ""}
        InputProps={{
          endAdornment: icon ? renderIcon(icon) : null,
          name: (name as string) || "",
          startAdornment: getStartAdornment(hasEmailIcon, hasPasswordIcon),
        }}
      />
      {/* )} */}
    </div>
  );
}

export default styled(Input)`
  ${InputStyle}
`;
