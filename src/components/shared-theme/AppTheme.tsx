import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface AppThemeProps {
  children: React.ReactNode;
  disableCustomTheme?: boolean;
}

const AppTheme: React.FC<AppThemeProps> = ({ children, disableCustomTheme = false }) => {
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#10b981', // emerald-600
      },
      secondary: {
        main: '#3b82f6', // blue-500
      },
      background: {
        default: '#f8fafc', // slate-50
        paper: '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '0.5rem',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '1rem',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppTheme; 