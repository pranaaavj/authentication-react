import { logout } from '../redux/slices/userSlice';
import { useEffect } from 'react';
import { useGetHomeMutation } from '../api/authApi';
import { useDispatch, useSelector } from 'react-redux';

export const Home = () => {
  const [getHome, { data, isSuccess }] = useGetHomeMutation();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    async function fetchData() {
      getHome();
    }
    fetchData();
  }, [getHome]);

  if (isSuccess) console.log(data);

  const dispatch = useDispatch();
  function handleClick() {
    dispatch(logout());
  }
  return (
    <div>
      Welcome home {user.name} <button onClick={handleClick}>Log out</button>
    </div>
  );
};
