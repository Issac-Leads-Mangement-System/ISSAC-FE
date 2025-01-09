import { createTheme } from "@mui/material/styles";
import { heIL } from '@mui/material/locale';

export const Color = {
  MainColor: "#ff2f5b",
  AppBackground: "#f7f7f7",
  LightBlue: "#99BCD9",
  DodgerBlue: "#0499FF",
  LinkWaterGrey: "#D8DBE5",
  SapphireBlue: "#0C2E6E",
  WaikawaGrey: "#6279aa",
  LightPurple: "#5779FF",
  VeryLightBlue: "#F3F6F9",
  DarkBlue: "#0B2559",
  White: "#ffffff",
  MediumGrey: "#e1e2e4",
  Black: "#010205",
  Orange: "#F92D01",
  Green: "#00CB14",
  Astral: "#347ab4",
  BostonBlueLight: "#3c8bcb",
  Fiord: "#465666",
  JungleGreen: "#2bb89b",
  Mercury: "#e1e1e1",
  Lynch: "#73879c",
  Blumine: "#1b5483",
  BlackSqueeze: "#ebf2f7",
  Porcelain: "#eef0f2",
  YellowOrange: "#FFAC4B",
  Silver: "#BCBCBC",
  Zest: "#E4842B",
  Horizon: "#5B84A6",
  DarkBlack: "#000000",
  WhiteGray: "#F9FAFB",
  LightGray: "#ACB9C6",
  Primary: "#13aa52",
  Secondary: "#273742",
  Tertiary: "#116149",
  Error: "#F92D01",
};

const Size = {
  bigSize: "3rem",
  largeSize: "2rem",
  mediumSize: "1.5rem",
  normalSize: "1rem",
  smallSize: "0.8rem",
};
// const Theme = createTheme(
//   {
//     palette: {
//       primary: { main: '#1976d2' },
//     },
//   },
//   zhCN,
// );
export const Theme: any = createTheme({
  typography: {
    fontFamily: [
      "Montserrat",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: "medium",
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "medium",
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },

}
// , heIL
);
