import { createTheme, ThemeProvider } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
      contrastText: "#fff",
    },
  },
})

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"]
  }
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"]
  }
}
