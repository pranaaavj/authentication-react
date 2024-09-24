import { logout } from '../redux/slices/userSlice';
import { useGetUserQuery } from '../api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export const Home = () => {
  const { user } = useSelector((state) => state.user);
  const { data } = useGetUserQuery(user.id);

  useEffect(() => {});

  const dispatch = useDispatch();
  function handleClick() {
    dispatch(logout());
  }

  async function handleGetUser() {
    console.log(data);
  }

  return (
    <div>
      <img
        src={`${import.meta.env.VITE_SERVER_URL}/uploads/${user.image}`}
        alt=''
        className='w-10 h-auto'
      />
      Welcome home {user.name} <button onClick={handleClick}>Log out</button>
      <button
        onClick={handleGetUser}
        className=''>
        Get user
      </button>
    </div>
  );
};
