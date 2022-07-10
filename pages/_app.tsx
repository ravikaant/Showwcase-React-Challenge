import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import merge from 'lodash/merge'
import get from 'lodash/get'
import baseTheme from '../theme';
import { useCallback, useEffect, useMemo, useState } from 'react';

const modes = [
  'light',
  'dark',
]

function MyApp({ Component, pageProps }: AppProps) {
  const ISSERVER = typeof window === "undefined";
  const [mode, setMode] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if(!ISSERVER) {
      setMode(localStorage.getItem('colorMode') ?? modes[0]);
    }
  }, [ISSERVER]);

  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener("resize", () => {
        if (window.innerWidth <= 655) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      });
      if (window.innerWidth <= 655) {
        setIsMobile(true);
      }
    }
    return () => {
      window.removeEventListener("resize", () => null);
    };
  }, []);

  useEffect(() => {
    const body = document.getElementsByTagName('body');
    if(body && body.length > 0) {
      body[0].style.overflowY = isMobile ? 'auto' : 'hidden';
    }
  }, [isMobile]);

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
  return <ThemeProvider theme={{ ...theme, toggleTheme: toggleColorMode, isMobile }}>
    <Component {...pageProps} />
  </ThemeProvider>
}

export default MyApp
