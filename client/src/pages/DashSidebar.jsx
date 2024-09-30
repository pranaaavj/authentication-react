import { useEffect, useState } from 'react';
import { logout } from '../redux/slices/userSlice';
import { Sidebar } from 'flowbite-react';
import { FaUserAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

export const DashSidebar = () => {
  const dispatch = useDispatch();
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
    <Sidebar className='min-h-screen hidden lg:block '>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='p-0'>
          <Sidebar.Item
            active={tab == 'profile'}
            href='/admin-dashboard?tab=profile'
            className='no-underline'
            icon={FaUserAlt}>
            Profile
          </Sidebar.Item>
          <Sidebar.Item
            className='no-underline'
            icon={FaUserAlt}
            onClick={() => dispatch(logout())}>
            Sign Out
          </Sidebar.Item>
          <Sidebar.Item
            active={tab === 'users'}
            className='no-underline'
            href='/admin-dashboard?tab=users'
            icon={FaUserAlt}>
            Users
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
