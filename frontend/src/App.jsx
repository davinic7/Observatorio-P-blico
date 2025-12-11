import React from 'react';
import ObservatorioPage from './ObservatorioPage';
import { CssBaseline, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3A5DAE', // Official Catamarca Blue (Pantone 7455 C)
      dark: '#071D49', // Darker Blue (Pantone 2768 C)
      light: '#6F8ACE',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#E0E0E0', // Neutral Gray for accents
      dark: '#9E9E9E',
      light: '#F5F5F5',
      contrastText: '#101820', // Pantone Black 6 C
    },
    background: {
      default: '#F4F6F8', // Very light gray background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#101820', // Pantone Black 6 C
      secondary: '#546E7A',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, color: '#071D49' },
    h2: { fontWeight: 700, color: '#071D49' },
    h3: { fontWeight: 600, color: '#071D49' },
    h4: { fontWeight: 600, color: '#071D49' },
    h5: { fontWeight: 500, color: '#3A5DAE' },
    h6: { fontWeight: 500, color: '#071D49' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#071D49',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          borderRadius: 12,
          border: '1px solid rgba(0,0,0,0.04)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ObservatorioPage />
    </ThemeProvider>
  );
}

export default App;
