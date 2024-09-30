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
  NotFound,
  CreatePost,
} from '../pages';
import { AuthenticateAdmins } from '../utils/AuthenticateAdmins';

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
          { path: '/create-post', element: <CreatePost /> },
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
