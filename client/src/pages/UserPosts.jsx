import { useSelector } from 'react-redux';
import { useGetAllBlogsQuery } from '../api/blogApi';

export const UserPosts = () => {
  const { user } = useSelector((state) => state.user);
  const { data, error } = useGetAllBlogsQuery(user?.id);
  console.log(data);
  if (error) {
    console.log(error);
  }
  return <div>yo</div>;
};
