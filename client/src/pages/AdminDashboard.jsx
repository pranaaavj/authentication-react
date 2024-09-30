import { useLocation } from 'react-router-dom';
import { DashSidebar } from './DashSidebar';
import { DashUsers } from './DashUsers';
import { useEffect, useState } from 'react';
import { Profile } from './Profile';

export const AdminDashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const URLParams = new URLSearchParams(location.search);
    const tabFromURL = URLParams.get('tab');

    if (tabFromURL) {
      setTab(tabFromURL);
    }
  }, [location.search]);

  return (
    <div className='flex min-h-screen'>
      <div className='w-0 lg:w-1/5 '>
        <DashSidebar />
      </div>
      <div className='flex-1'>
        {tab === 'users' && <DashUsers />}
        {tab === 'profile' && (
          <div className='flex justify-center items-center min-h-screen'>
            <div className='w-full max-w-md min-w-sm'>
              <Profile />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
