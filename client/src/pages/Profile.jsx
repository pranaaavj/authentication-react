import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { InputField } from '../components';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const emptyForm = { username: '', email: '', password: '' };
  const [formData, setFormData] = useState(emptyForm);
  const [editMode, setEditMode] = useState(false); // Added for toggling edit mode

  useEffect(() => {
    setFormData({
      username: user.username,
      email: user.email,
    });
  }, [user]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log('Saving changes...', formData);
    setEditMode(false);
  };

  const handleChangePhoto = () => {};

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <Card className='w-full max-w-lg p-6 bg-white shadow-lg rounded-lg'>
        <div className='flex flex-col items-center'>
          <div className='mb-2 flex flex-col items-center justify-center'>
            <img
              src={user.profilePhoto}
              alt='Profile'
              className='w-24 h-24 rounded-full object-cover border border-gray-300'
            />
            {editMode && (
              <Button
                variant='link'
                className='no-underline'
                onClick={handleChangePhoto}>
                Change Photo
              </Button>
            )}
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
                value={formData.username}
                onChange={handleChange}
                disabled={!editMode} // Disable input if not in edit mode
              />

              <InputField
                controlId='email'
                label='Email'
                type='email'
                name='email'
                value={formData.email}
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
