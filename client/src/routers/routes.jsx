import MainLayout from '../layouts/MainLayout';
import { AuthenticateUsers, AuthenticateAdmins } from '../utils';
import {
  Home,
  Profile,
  SignIn,
  SignUp,
  EditUser,
  AddUser,
  DashUsers,
  NotFound,
  CreateBlog,
  DashBoard,
  UserPosts,
} from '../pages';

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
            path: '/blog',
            children: [
              {
                path: 'create-post',
                element: <CreateBlog />,
              },
            ],
          },
          {
            path: '/dashboard',
            element: <DashBoard />,
            children: [
              {
                path: 'admin',
                element: <AuthenticateAdmins />,
                children: [
                  {
                    index: true,
                    element: <DashUsers />,
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
    ],
  },
  {
    path: '/tryout',
    element: <DashUsers />,
  },
];
