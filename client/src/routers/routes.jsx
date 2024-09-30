import MainLayout from '../layouts/MainLayout';
import { AuthenticateUsers } from '../utils';
import {
  Home,
  Profile,
  SignIn,
  SignUp,
  AdminDashboard,
  EditUser,
  AddUser,
  DashUsers,
} from '../pages';
import { AuthenticateAdmins } from '../utils/AuthenticateAdmins';
import { NotFound } from '../pages/NotFound';

export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
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
              {
                path: 'add-user',
                element: <AddUser />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/tryout',
    element: <DashUsers />,
  },
];
