import { createTheme } from '@mui/material/styles';
import { createContext, useState, useMemo } from "react";

//our custome colors, and different shades of it 
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
      //these are colors for dark mode, so these colors should be light on the eye 
      main: {
        100: "#212529",
      },
      yellow: {
        100: "#FCDB3A",
        200: "#FCDB3A",
      },
      red: {
        100: "#ED2024",
        200: "#ED2018",
      },
      blue: {
        100: "#233044",
      },
    }
    :
    //same colors under light mode 
    {
      main: {
        100: "#f5f5f5",
      },
      yellow: {
        100: "#FCDB3A",
        200: "#FCDB3A",
      },
      red: {
        100: "#ED2024",
        200: "#ED2018",
      },
      blue: {
        100: "#233044",
      }
    }),
});

//dark and white palates/themes using our colors defined above 
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          // palette values for dark mode
          primary: {
            main: colors.main[100],
          },
          secondary: {
            main: '#d500f9',
          },
          info: {
            main: '#2196f3',
          },
          success: {
            main: '#6ec124',
          },
          background: {
            default: colors.main[100],
          },
        }
        : {
          // palette values for light mode
          primary: {
            main: colors.main[100],
          },
          secondary: {
            main: '#d500f9',
          },
          info: {
            main: '#2196f3',
          },
          success: {
            main: '#6ec124',
          },
          background: {
            default: colors.main[100],
          },
        }),
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => { },
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};