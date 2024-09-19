import { useDispatch } from 'react-redux';
import { useGetHomeMutation } from '../api/auth';
import { logout } from '../redux/slices/userSlice';
import { useEffect } from 'react';

export const Home = () => {
  const [getHome, { data, isSuccess }] = useGetHomeMutation();

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
      Welcome home <button onClick={handleClick}>Log out</button>
    </div>
  );
};
