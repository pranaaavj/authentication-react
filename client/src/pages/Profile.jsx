import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { setUser } from '../redux/slices/userSlice';
import { createFormData } from '../utils';
import { useUpdateUserMutation } from '../api/userApi';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorMessages, InputField } from '../components';
import { useEffect, useRef, useState } from 'react';

const emptyForm = {
  username: '',
  email: '',
  password: '',
  image: '',
};

export const Profile = () => {
  const fileRef = useRef();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [imageUrl, setImageUrl] = useState('');
  const [userInput, setUserInput] = useState(emptyForm);
  const [updateUser, { isError, error }] = useUpdateUserMutation();

  useEffect(() => {
    setUserInput({
      username: user.username,
      email: user.email,
      image: user.image,
    });
  }, [user]);

  const handleChange = ({ target: { name, value, files } }) => {
    if (files) {
      setUserInput((prevInput) => ({ ...prevInput, [name]: files[0] }));
      setImageUrl(() => URL.createObjectURL(files[0]));
    } else setUserInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSave = async () => {
    const formData = createFormData(userInput);
    const updatedUser = { formData, userId: user?.id };
    const response = await updateUser(updatedUser);

    if (response?.data?.success) {
      dispatch(setUser(response?.data?.data));
    }
    setEditMode(false);
  };

  return (
    <div className='flex justify-center items-center'>
      <Card className='w-full max-w-lg p-6 bg-white shadow-lg rounded-lg'>
        <div className='flex flex-col items-center'>
          <div className='mb-2 flex flex-col items-center justify-center'>
            <img
              src={
                imageUrl
                  ? imageUrl
                  : user?.image.startsWith('https://')
                  ? user.image
                  : `${import.meta.env.VITE_SERVER_URL}/uploads/${user.image}`
              }
              alt='Profile'
              className='w-24 h-24 rounded-full object-cover border border-gray-300'
            />
            {editMode && (
              <Button
                onClick={() => fileRef.current.click()}
                variant='link'
                className='no-underline'>
                Change Photo
              </Button>
            )}
            <input
              name='image'
              type='file'
              ref={fileRef}
              onChange={handleChange}
              className='hidden'
            />
          </div>

          <Card.Body className='text-center'>
            <h2 className='text-2xl font-semibold mb-2'>Profile</h2>
            <p className='text-gray-500'>Manage your personal information</p>

            <div className='mt-4 w-full'>
              <InputField
                controlId='username'
                label='Username'
                type='text'
                name='username'
                value={userInput.username}
                onChange={handleChange}
                disabled={!editMode} // Disable input if not in edit mode
              />

              <InputField
                controlId='email'
                label='Email'
                type='email'
                name='email'
                value={userInput.email}
                onChange={handleChange}
                disabled={!editMode} // Disable input if not in edit mode
              />
            </div>
          </Card.Body>

          <div className='mt-4'>
            {editMode ? (
              <Button
                variant='success'
                onClick={handleSave}>
                Save Changes
              </Button>
            ) : (
              <Button
                variant='primary'
                onClick={() => setEditMode(!editMode)}>
                Edit Profile
              </Button>
            )}
            <Link to='/create-post'>
              <Button className='mx-2'>Create post</Button>
            </Link>
          </div>
          <div className='mt-4'>
            {isError && (
              <ErrorMessages
                error={error?.data?.message || 'Something went wrong'}
              />
            )}
          </div>
          <Card.Footer className='w-full text-center mt-6 bg-transparent'>
            <Link
              to='/'
              className='no-underline'>
              Go to Home Page
            </Link>
          </Card.Footer>
        </div>
      </Card>
    </div>
  );
};
