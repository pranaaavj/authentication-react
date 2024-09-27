import { Outlet } from 'react-router-dom';
import { NavBar, Footer } from '../components';

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <main className='min-h-screen'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
