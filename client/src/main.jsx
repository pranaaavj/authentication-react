import './index.css';
import App from './App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import { ChakraProvider } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider>
      <ChakraProvider
        toastOptions={{ defaultOptions: { position: 'top-right' } }}>
        <App />
      </ChakraProvider>
    </NextUIProvider>
  </StrictMode>
);
