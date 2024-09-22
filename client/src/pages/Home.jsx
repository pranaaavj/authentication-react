import { logout } from '../redux/slices/userSlice';
import { useEffect } from 'react';
import { useGetUserMutation } from '../api/authApi';
import { useDispatch, useSelector } from 'react-redux';

export const Home = () => {
  const [getUser, { data, isSuccess }] = useGetUserMutation();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    getUser();
  }, [getUser]);

  console.log(user.image);
  if (isSuccess) console.log(data);

  const dispatch = useDispatch();
  function handleClick() {
    dispatch(logout());
  }
  return (
    <div>
      <img
        src={`${import.meta.env.VITE_SERVER_URL}/uploads/${user.image}`}
        alt=''
        className='w-10 h-auto'
      />
      Welcome home {user.name} <button onClick={handleClick}>Log out</button>
    </div>
  );
};
