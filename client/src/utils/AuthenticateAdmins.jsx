import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthenticateAdmins = () => {
  const { user, accessToken } = useSelector((state) => state.user);

  return accessToken && user.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to='/sign-in' />
  );
};
