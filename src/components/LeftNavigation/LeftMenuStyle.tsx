import { css } from "styled-components";

export const LeftMenuStyle = () => css`
  &.issac-container {
    background-color: #000000d4;
    width: 220px;
    height: 100vh;
  }
  .issac-logo-leftbar {
    width: 150px;
    margin: auto;
    margin-top: 10px;
    margin: 15px;
  }

  .issac-container-child {
    display: inline-block;
  }
  .issac-img-leftbar {
    width: 150px;
  }

  .issac-left-menu {
    width: 220px;
    height: 100vh;
    display: inline-block;
  }
  .list-items:hover {
    background-color: #5151515;
  }

  .MuiListItemButton-root:hover {
    background: #515151;
  }
  .t-active {
    background: #515151;
  }
  .MuiListItem-root.Mui-selected {
    background-color: #515151;
  }
`;
