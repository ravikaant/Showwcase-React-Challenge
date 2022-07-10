const colors = {
  text: '#000',
  background: '#fff',
  primary: '#00f',
  secondary: '#00a',
  highlight: '#ededff',
  accent: '#c0f',
  gray: '#eee',
  lightgray: '#fafafa',
  midgray: '#ccc',
  overlay: 'rgba(0,0,0,0.4)',
  modes: {
    dark: {
      text: '#fff',
      background: '#000',
      primary: '#0cf',
      secondary: '#f0e',
      gray: '#222',
      lightgray: '#111',
      highlight: '#001119',
      overlay: 'rgba(255,255,255,0.4)'
    },
  },
}
const breakpoints = ['655px'];

const theme = {
  breakpoints,
  initialColorModeName: 'light',
  colors,
  fonts: {
    body: 'system-ui, sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 18, 24, 32, 48, 64, 72],
  lineHeights: {
    body: 1.75,
    heading: 1.25,
  },
}
export default theme;
