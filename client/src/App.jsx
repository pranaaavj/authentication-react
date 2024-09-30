import { routes } from './routers';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from './components/ThemeProvider.jsx';
import { persistor, store } from './redux/store';
import {
  ThemeProvider as MUIProvider,
  createTheme,
} from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(routes);

const theme = createTheme({
  palette: {
    mode: 'dark', // Or 'light', depending on your preference
  },
  typography: {
    body1: {
      fontSize: '1rem',
    },
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={null}>
        <ThemeProvider>
          <MUIProvider theme={theme}>
            <RouterProvider router={router} />
          </MUIProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
