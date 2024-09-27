import { logout } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { FaMoon, FaUserCircle } from 'react-icons/fa';
import { Button, Navbar, Dropdown, TextInput } from 'flowbite-react';

export const NavBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  return (
    <div className='flex flex-col justify-between mx-2 sticky top-0'>
      <Navbar
        fluid={true}
        rounded={true}
        className='flex-nowrap'>
        {/* Logo */}
        <div className='flex items-center gap-4'>
          <Link
            to='/'
            className='no-underline font-bold text-gray-950 whitespace-nowrap text-md sm:text-lg dark:text-white'>
            <span className='px-2 py-2 bg-gradient-to-r from-orange-400 via-pink-500 to-red-600 rounded-lg text-white'>
              Pen & Post
            </span>
          </Link>

          <form className='hidden md:flex md:w-4/6 items-center mx-4'>
            <TextInput
              type='text'
              icon={AiOutlineSearch}
              placeholder='Search...'
              className='w-full'
            />
          </form>

          <Button
            className='md:hidden w-12 h-10 items-center focus:outline-none focus:ring-0'
            pill
            color='gray'>
            <AiOutlineSearch />
          </Button>
        </div>

        <div className='flex gap-4'>
          <Button
            className='w-10 h-10 items-center focus:ring-0 hidden sm:inline'
            color='gray'
            pill>
            <FaMoon />
          </Button>

          {location.pathname === '/sign-in' ? (
            <Link
              to='/sign-up'
              className='text-white no-underline'>
              <Button gradientDuoTone='purpleToBlue'>Sign Up</Button>
            </Link>
          ) : location.pathname === '/sign-up' ? (
            <Link
              to='/sign-in'
              className='text-white no-underline'>
              <Button gradientDuoTone='purpleToBlue'>Sign In</Button>
            </Link>
          ) : (
            <Button gradientDuoTone='purpleToBlue'>
              <span
                onClick={() => dispatch(logout())}
                className='font-bold '>
                Logout
              </span>
            </Button>
          )}

          {user && (
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <FaUserCircle className='text-2xl  text-gray-600 dark:text-gray-300' />
              }
              className='ml-auto '>
              <Dropdown.Header className='no-underline'>
                <span className='block text-sm'>{user.username}</span>
                <span className='block text-sm font-medium truncate'>
                  {user.email}
                </span>
              </Dropdown.Header>
              {user.role == 'admin' && (
                <Dropdown.Item>
                  <Link to='/admin-dashboard'>Dashboard</Link>
                </Dropdown.Item>
              )}
              <Dropdown.Item>
                <Link to='/profile'>Profile</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item></Dropdown.Item>
            </Dropdown>
          )}
        </div>
      </Navbar>
    </div>
  );
};
