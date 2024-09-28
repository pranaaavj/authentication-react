import { logout } from '../redux/slices/userSlice';
import { toggleTheme } from '../redux/slices/themeSlice';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaMoon, FaUserCircle, FaSun } from 'react-icons/fa';
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
          ) : (
            <Button
              gradientDuoTone='purpleToBlue'
              onClick={() => dispatch(logout())}>
              <span className='font-bold '>Logout</span>
            </Button>
          )}

          {user && (
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                user && user?.image ? (
                  <img
                    src={
                      user.image.startsWith('https://')
                        ? user.image
                        : `${import.meta.env.VITE_SERVER_URL}/uploads/${
                            user.image
                          }`
                    }
                    alt='Profile'
                    className='w-10 h-10 rounded-full object-cover object-c/enter border-gray-300'
                  />
                ) : (
                  <FaUserCircle className='text-2xl  text-gray-600 dark:text-gray-300' />
                )
              }>
              <Dropdown.Header className='no-underline p-0'>
                <span className='block text-sm'>
                  {' '}
                  Username: {user?.username}
                </span>
                <span className='block text-sm font-medium truncate'>
                  Email: {user?.email}
                </span>
              </Dropdown.Header>
              {user?.role == 'admin' && (
                <>
                  <Dropdown.Item className='p-0 m-0'>
                    <Link
                      to='/admin-dashboard'
                      className='no-underline'>
                      Dashboard
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Divider className='p-0' />
                </>
              )}
              <Dropdown.Item className='p-0'>
                <Link
                  to='/profile'
                  className='no-underline'>
                  Profile
                </Link>
              </Dropdown.Item>
            </Dropdown>
          )}
        </div>
      </Navbar>
    </div>
  );
};
