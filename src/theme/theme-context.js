import * as React from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { defaultTheme } from './theme';

/**
 * Theme provider
 */
function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(defaultTheme);

  const themeValue = {
    // Theme object has to be spread here so that it properties can be accessed directly.
    ...theme,

    // In addition to the theme object pass down `setTheme` so its possible to update
    // the theme.
    setTheme
  }

  return (
    <MuiThemeProvider theme={themeValue}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export { ThemeProvider };
