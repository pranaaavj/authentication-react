import { Outlet } from 'react-router-dom';
import { NavBar } from '../components';

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
