import { createTheme, ThemeProvider } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    info: {
      main: "#000",
      contrastText: "rgba(0,0,0,0.8)",
    },
    primary: {
      main: "#B12009",
      contrastText: "#fff",
    },
    secondary: {
      main: "#CFC36F",
      contrastText: "#262E36",
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    info: Palette["info"];
    secondary: Palette["secondary"];
    primary: Palette["primary"];
  }
  interface PaletteOptions {
    info?: PaletteOptions["info"];
    secondary?: PaletteOptions["secondary"];
    primary?: PaletteOptions["primary"];
  }
}
