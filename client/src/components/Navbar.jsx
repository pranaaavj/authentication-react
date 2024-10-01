import { logout } from '../redux/slices/userSlice';
import { toggleTheme } from '../redux/slices/themeSlice';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaMoon,
  FaUserCircle,
  FaSun,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import { Button, Navbar, Dropdown, TextInput } from 'flowbite-react';

export const NavBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className='flex flex-col justify-between sticky top-0 z-10'>
      <Navbar
        fluid={true}
        className='flex-nowrap'>
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
            className='w-10 h-10 items-center focus:ring-0'
            color='gray'
            pill
            onClick={() => dispatch(toggleTheme())}>
            {theme === 'light' ? <FaSun /> : <FaMoon />}
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
          ) : null}

          {user && (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                user?.image ? (
                  <img
                    src={
                      user.image.startsWith('https://')
                        ? user.image
                        : `${import.meta.env.VITE_SERVER_URL}/uploads/${
                            user.image
                          }`
                    }
                    alt='Profile'
                    className='w-10 h-10 rounded-full object-cover border-2 border-gray-200 hover:border-blue-500 transition-colors duration-200'
                  />
                ) : (
                  <FaUserCircle className='text-3xl text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-200' />
                )
              }
              className='z-50 pr-7 pt-1'>
              <div className='px-4 py-3 text-sm text-gray-900 dark:text-white'>
                <div className='font-medium truncate mb-1'>
                  {user?.username}
                </div>
                <div className='text-gray-500 truncate dark:text-gray-400'>
                  {user?.email}
                </div>
              </div>
              <Dropdown.Divider />
              <Dropdown.Item
                as={Link}
                to='/dashboard?tab=profile'
                className='flex items-center'>
                <FaCog className='mr-2' />
                Dashboard
              </Dropdown.Item>
            </Dropdown>
          )}
        </div>
      </Navbar>
    </div>
  );
};
