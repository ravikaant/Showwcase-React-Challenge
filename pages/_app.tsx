import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import merge from 'lodash/merge'
import get from 'lodash/get'
import baseTheme from '../theme';
import { useCallback, useEffect, useState } from 'react';

const modes = [
  'light',
  'dark',
]

function MyApp({ Component, pageProps }: AppProps) {
  const ISSERVER = typeof window === "undefined";
  const [mode, setMode] = useState('');

  useEffect(() => {
    if(!ISSERVER) {
      setMode(localStorage.getItem('colorMode') ?? modes[0]);
    }
  }, [ISSERVER])

  const getTheme = useCallback(() => merge({}, baseTheme, {
    colors: get(baseTheme.colors.modes, mode, baseTheme.colors),
  }), [mode]);

  const theme = getTheme();
  const toggleColorMode = () => {
    const newMode = mode === modes[1] ? modes[0] : modes[1]
    setMode(newMode);
    if(!ISSERVER) {
      localStorage.setItem('colorMode', newMode);
    }
  }
  return <ThemeProvider theme={{ ...theme, toggleTheme: toggleColorMode }}>
    <Component {...pageProps} />
  </ThemeProvider>
}

export default MyApp
