import { createTheme } from "@mui/material/styles";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: "white",
          "&.Mui-selected": {
            color: "black",
          },
        },
      },
    },
  },
});

export default theme;
