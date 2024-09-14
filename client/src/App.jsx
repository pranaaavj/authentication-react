import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { About, Home, SignIn, SignUp } from './pages';
import MainLayout from './layouts/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
