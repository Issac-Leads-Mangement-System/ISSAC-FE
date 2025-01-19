import { css } from "styled-components";

export const LeftMenuStyle = () => css`
  &.issac-container {
    background-color: #38454a;
    width: 250px;
    min-height: 100vh; 
  }
  .issac-logo-leftbar {
    width: 150px;
    margin: auto;
    margin-top: 10px;
  }

  .issac-container-child {
    display: inline-block;
  }
  .issac-img-leftbar {
    width: 150px;
  }

  .issac-left-menu {
    width: 250px;
    min-height: 100vh; 
    display: inline-block;
  }
  .list-items:hover {
    background-color: #5151515;
    color:rgb(216, 214, 214);
  }

  .MuiListItemButton-root:hover {
    background: #515151;
    color:rgb(216, 214, 214);
  }
  .t-active {
    background: #515151;
    color:rgb(216, 214, 214);
  }
  .MuiListItem-root.Mui-selected {
    background-color: #515151;
    color:rgb(216, 214, 214);
  }
`;
