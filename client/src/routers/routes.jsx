import MainLayout from '../layouts/MainLayout';
import { AuthenticateUsers } from '../utils';
import {
  Home,
  Profile,
  SignIn,
  SignUp,
  AdminDashboard,
  EditUser,
} from '../pages';
import { AuthenticateAdmins } from '../utils/AuthenticateAdmins';

export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        element: <AuthenticateUsers />,
        children: [
          { index: true, element: <Home /> },
          { path: '/profile', element: <Profile /> },
          {
            path: '/admin-dashboard',
            element: <AuthenticateAdmins />,
            children: [
              {
                index: true,
                element: <AdminDashboard />,
              },
              {
                path: 'edit-user/:id',
                element: <EditUser />,
              },
            ],
          },
        ],
      },

      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
];
