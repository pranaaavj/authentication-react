import MainLayout from '../layouts/MainLayout';
import { AdminDashboard, Home, Profile, SignIn, SignUp } from '../pages';
import { AuthenticateAdmins } from '../utils/AuthenticateAdmins';

export const adminRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        element: <AuthenticateAdmins />,
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
