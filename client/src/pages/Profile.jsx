import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { setUser } from '../redux/slices/userSlice';
import { InputField } from '../components';
import { createFormData } from '../utils';
import { useUpdateUserMutation } from '../api/userApi';
import { useSelector, useDispatch } from 'react-redux';
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
  const [userInput, setUserInput] = useState(emptyForm);
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    setUserInput({
      username: user.username,
      email: user.email,
      image: user.image,
    });
  }, [user]);

  const handleChange = ({ target: { name, value, files } }) => {
    if (files) setUserInput({ ...userInput, [name]: files[0] });
    else setUserInput({ ...userInput, [name]: value });
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
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <Card className='w-full max-w-lg p-6 bg-white shadow-lg rounded-lg'>
        <div className='flex flex-col items-center'>
          <div className='mb-2 flex flex-col items-center justify-center'>
            <img
              src={`${import.meta.env.VITE_SERVER_URL}/uploads/${user.image}`}
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
          </div>
          <Card.Footer className='w-full text-center mt-6'>
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
