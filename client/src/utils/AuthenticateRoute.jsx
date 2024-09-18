import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthenticateRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return isAuthenticated ? <Navigate to='/' /> : <Navigate to='/signin' />;
};

export default AuthenticateRoute;
