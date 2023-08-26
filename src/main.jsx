import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

const breakpoints = {
  base: '0px',
  xs: '420px',
  sm: '520px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

const theme = extendTheme({
  colors: {
    lxPurple: '#584BAC',
    lxRed: '#CE1567',
    lxBlack: '#292929',
    lxLightPurple: '#F8EFFF',
  },
  breakpoints,
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
