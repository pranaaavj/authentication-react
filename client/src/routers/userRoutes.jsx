import MainLayout from '../layouts/MainLayout';
import { AuthenticateUsers } from '../utils';
import { Home, Profile, SignIn, SignUp, AdminDashboard } from '../pages';

export const userRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        element: <AuthenticateUsers />,
        children: [
          { index: true, element: <Home /> },
          { path: '/profile', element: <Profile /> },
          { path: '/admin-dashboard', element: <AdminDashboard /> },
        ],
      },
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
];
