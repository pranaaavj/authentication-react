import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthenticateRoute = () => {
  const { accessToken } = useSelector((state) => state.user);

  return !accessToken ? <Navigate to='/sign-in' /> : <Outlet />;
};

export default AuthenticateRoute;
