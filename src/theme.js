import { createTheme } from '@mui/material/styles';
import { createContext, useState, useMemo } from "react";
import { useSelector } from 'react-redux';

//our custome colors, and different shades of it, use figma to better get a picture 
//here you define the colors you want to use under a dark or light theme with hex colros 
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
      //main[900] (used for overall background of the site) is set to greyish to 
      //indicate a "dark" theme and used by the overall background of the site 
      main: {
        100: "#fdfdfd",
        200: "#fbfbfb",
        300: "#f9f9f9",
        400: "#f7f7f7",
        500: "#f5f5f5",
        600: "#c4c4c4",
        700: "#939393",
        800: "#626262",
        900: "#323639"
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
    //same colors under light mode, i.e main[900] now is white to indicate light background 
    {
      main: {
        100: "#f5f5f5",
        400: "#939393",
        900: "#f5f5f5"
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
        100: "#f5f5f5",
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
        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => { },
});

export const useMode = () => {
    const md = useSelector((state) => state.appState.value)
    const [mode, setMode] = useState(md);

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