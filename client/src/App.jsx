import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routers';

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={null}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}
