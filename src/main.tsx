import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// TODO: 운영체제별 폰트 어떻게 처리할 것인지 확인
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#fdfdfd',
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
