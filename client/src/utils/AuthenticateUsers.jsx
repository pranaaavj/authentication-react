import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthenticateUsers = () => {
  const { accessToken } = useSelector((state) => state.user);

  return accessToken ? <Outlet /> : <Navigate to='/sign-in' />;
};
