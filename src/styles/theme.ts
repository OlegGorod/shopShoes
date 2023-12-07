export const theme = {
  palette: {
    error: {
      main: '#FE645E',
      dark: '#FE645E',
      light: '#FE645E',
      contrastText: '#FE645E',
    },
    text: {
      primary: '#000000',
      disabled: '#5C5C5C',
      secondary: '#5C5C5C',
    },
    primary: {
      main: '#fe645e',
      dark: '#fe645e',
      light: '#fe645e',
      contrastText: '#ffffff',
    },
    customColors: {
      main: '#fe645e',
      red: '#FE645E',
      lightRed: '#FFD7D6',
      lightGray: '#E8E8E8',
      background404: '#d6d9da',
    },
  },
  typography: {
    fontFamily: ['Work Sans', 'sans-serif'].join(','),
    button: {
      fontSize: '16px',
      textTransform: undefined,
    },
    caption: {
      fontSize: '12px',
    },
    h3: {
      fontSize: '45px',
      fontWeight: 500,
      '@media (max-width:850px)': {
        fontSize: '35px',
      },
      '@media (max-width:450px)': {
        fontSize: '30px',
      },
    },
    subtitle1: {
      fontSize: '20px',
      lineHeight: '30px',
      '@media (max-width:376px)': {
        fontSize: '15px',
      },
    },
    subtitle2: {
      color: '#5C5C5C',
      fontWeight: 300,
      fontSize: '15px',
    },
    body1: {
      color: '#494949',
      fontWeight: 300,
      fontSize: '16px',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1300,
      xl: 1536,
    },
  },
};
