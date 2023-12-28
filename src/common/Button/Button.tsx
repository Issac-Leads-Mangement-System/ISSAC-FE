/* eslint-disable react/button-has-type */
import styled from "styled-components";
import { ButtonStyle } from "./ButtonStyle";

// import { IButtonProps } from "./models";

function Button({
  name,
  handleClick,
  className,
  buttonType,
  disabled,
  style,
  startIcon,
}: any) {
  return (
    <button
      type={buttonType || "button"}
      className={`${className}`}
      onClick={handleClick}
      style={style}
      disabled={disabled || false}
    >
      {startIcon}
      {name}
    </button>
  );
}

export default styled(Button)`
  ${ButtonStyle}
`;
