import React from 'react';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { PageContainer, PlayerContainer, NavContainer } from './containers';
import { StateProvider } from './state';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

export function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <StateProvider>
        <NavContainer />
        <PageContainer />
        <PlayerContainer />
      </StateProvider>
    </ThemeProvider>
  );
}