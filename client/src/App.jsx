import MainLayout from './layouts/MainLayout';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AuthenticateRoute from './utils/AuthenticateRoute';
import { persistor, store } from './redux/store';
import { About, Home, SignIn, SignUp } from './pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

console.log('hi');

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <AuthenticateRoute>
            <Home />
          </AuthenticateRoute>
        ),
      },
      { path: '/about', element: <About /> },
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
]);

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
