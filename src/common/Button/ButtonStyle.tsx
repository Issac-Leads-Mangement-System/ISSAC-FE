import { css } from "styled-components";
import { Theme } from "../../styled-components/Theme";

const ButtonTypes = {
  primary: {
    border: `1px solid ${Theme.Color.JungleGreen}`,
    borderRadius: "4px",
    background: `${Theme.Color.JungleGreen}`,
    color: `${Theme.Color.White}`,
    fontSize: "14px",
  },
  secondary: {
    border: `1px solid ${Theme.Color.Astral}`,
    borderRadius: "4px",
    background: "transparent",
    color: `${Theme.Color.Astral}`,
    fontSize: "14px",
  },
  tertiary: {
    border: `1px solid ${Theme.Color.Astral}`,
    borderRadius: "4px",
    background: `${Theme.Color.White}`,
    color: `${Theme.Color.Astral}`,
    fontSize: "14px",
  },
  default: {
    border: "1px solid rgba(52, 122, 180, 0.1)",
    borderRadius: "4px",
    background: "rgba(31, 100, 157, .1)",
    color: `${Theme.Color.Astral}`,
    fontSize: "14px",
  },
  error: {
    border: "none",
    borderRadius: "4px",
    background: "#ef5350",
    color: `${Theme.Color.White}`,
    fontSize: "12px",
  },
};

export const ButtonStyle = (props: any) => css`
  & {
    background: ${props.type
      ? ButtonTypes[props.type as keyof typeof ButtonTypes].background
      : ButtonTypes.primary.background};
    border: ${props.type
      ? ButtonTypes[props.type as keyof typeof ButtonTypes].border
      : ButtonTypes.primary.border};
    color: ${props.type
      ? ButtonTypes[props.type as keyof typeof ButtonTypes].color
      : ButtonTypes.primary.color};
    min-width: 84px;
    border-radius: ${props.type
      ? ButtonTypes[props.type as keyof typeof ButtonTypes].borderRadius
      : ButtonTypes.primary.borderRadius};
    font-weight: 400;
    padding: 6px 12px;
    font-size: ${ButtonTypes[props.type as keyof typeof ButtonTypes]
      ?.fontSize || "14px"};
    cursor: pointer;
    margin-top: ${props.marginTop ? props.marginTop.toString() : "0px"};
    margin-bottom: ${props.marginBottom
      ? props.marginBottom.toString()
      : "0px"};
    margin-left: ${props.marginLeft ? props.marginLeft.toString() : "5px"};
    margin-right: ${props.marginRight ? props.marginRight.toString() : "5px"};
    width: ${props.width ? props.width.toString() : "auto"};
    height: ${props.height ? props.height.toString() : "auto"};

    .MuiSvgIcon-root {
      margin-right: 10px;
    }
    &:hover {
      box-shadow: none;
    }
    &:disabled,
    &[disabled] {
      pointer-events: none;
      opacity: 0.6;
    }
  }
`;
