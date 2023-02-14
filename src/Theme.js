import { createMuiTheme} from '@mui/material/styles/createTheme';

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3456fd',
	  dark: '#3656f5',
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
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#3456fd',
	  dark: '#3656f5',
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
  },
});

