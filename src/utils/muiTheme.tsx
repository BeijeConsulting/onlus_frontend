import { createTheme } from "@mui/material/styles"
// import NotoSansJP from "../assets/fonts/Noto_sans_jp"

import store from "../redux/store"

import { color } from "./type"

const PALETTE: Array<color> = store.getState().generalDuck.palette
console.log("palette", PALETTE)

declare module "@mui/material/styles" {
  interface Palette {
    primary: Palette["primary"]
    secondary: Palette["secondary"]
    success: Palette["success"]
    // textPrimary: Palette["info"]
    // textSecondary: Palette["secondary"]
    // textTertiary: Palette["success"]
  }
  interface PaletteOptions {
    primary?: PaletteOptions["primary"]
    secondary?: PaletteOptions["secondary"]
    success?: PaletteOptions["success"]
    // textPrimary?: PaletteOptions["info"]
    // textSecondary?: PaletteOptions["secondary"]
    // textTertiary?: PaletteOptions["success"]
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: PALETTE[0].bgColor,
      contrastText: PALETTE[0].textColor,
    },
    secondary: {
      main: PALETTE[1].bgColor,
      contrastText: PALETTE[1].textColor,
    },
    success: {
      main: PALETTE[2].bgColor,
      contrastText: PALETTE[2].textColor,
    },
    // textPrimary: {
    //   main: PALETTE[0].textColor,
    // },
    // textSecondary: {
    //   main: PALETTE[1].textColor,
    // },
    // textTertiary: {
    //   main: PALETTE[2].textColor,
    // },
  },

  typography: {
    fontFamily: "Noto Sans JP",
    h1: {
      fontSize: "24px",
      fontWeight: "500",
      "@media (min-width:768px)": {
        fontSize: "36px",
      },
      "@media (min-width:992px)": {
        fontSize: "48px",
      },
    },
    h2: {
      fontSize: "20px",
      fontWeight: "500",
      "@media (min-width:768px)": {
        fontSize: "32px",
      },
      "@media (min-width:992px)": {
        fontSize: "44px",
      },
    },
    h3: {
      fontSize: "20px",
      fontWeight: "500",
      "@media (min-width:768px)": {
        fontSize: "22px",
      },
      "@media (min-width:992px)": {
        fontSize: "24px",
      },
    },
    h4: {
      fontSize: "18px",
      fontWeight: "600",
    },
    h5: {
      fontSize: "18px",
      fontWeight: "400",
      "@media (min-width:768px)": {
        fontSize: "20px",
      },
      "@media (min-width:992px)": {
        fontSize: "22px",
      },
    },
    h6: {
      fontSize: "18px",
      fontWeight: "400",
      "@media (min-width:768px)": {
        fontSize: "20px",
      },
      "@media (min-width:992px)": {
        fontSize: "22px",
      },
    },
    subtitle1: {
      fontSize: "16px",
      fontWeight: "600",
    },
    body1: {
      fontSize: "16px",
      fontWeight: "400",
    },
    body2: {
      fontSize: "14px",
      fontWeight: "400",
      color: "rgba(0,0,0,0.6)",
    },
    button: {
      fontSize: "16px",
      textTransform: "uppercase",
    },
    caption: {
      fontSize: "14px",
      textDecoration: "underline",
      color: "rgba(0,0,0,0.6)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Noto Sans JP';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Noto Sans JP'), local('NotoSansJP-Regular'), url("../assets/fonts/Noto_sans_jp/NotoSansJP-Regular-Alphabetic.woff2") format('otf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
})
