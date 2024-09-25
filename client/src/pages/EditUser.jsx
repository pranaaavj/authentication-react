import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InputField, SubmitButton, ErrorMessages } from '../components';
import { createFormData } from '../utils';
import { useUpdateUserMutation } from '../api/adminApi';
import { useGetUserQuery } from '../api/userApi';

const emptyForm = { username: '', email: '', password: '', image: '' };

export const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: { data: { user = [] } = {} } = {}, refetch } =
    useGetUserQuery(id);
  const [userInput, setUserInput] = useState(emptyForm);
  const [updateUser, { isLoading, isError, data, error, isSuccess }] =
    useUpdateUserMutation();
  // Redirecting if user authenticated
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/admin-dashboard');
      }, 1000);
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (user) {
      setUserInput({
        username: user.username,
        email: user.email,
        image: user.image,
      });
    }
    refetch();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = createFormData(userInput);
    // Sending form data to create user
    await updateUser({ formData, id });
  };

  const handleChange = ({ target: { name, value, files } }) => {
    if (files) setUserInput({ ...userInput, [name]: files[0] });
    else setUserInput({ ...userInput, [name]: value });
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner
          animation='border'
          role='status'
        />
      </div>
    );
  }

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-md'>
      <h1 className='text-4xl font-semibold text-center mt-2'>EDIT</h1>
      <Form
        className='w-96 flex flex-col mx-auto align-middle mt-8'
        onSubmit={handleSubmit}>
        <InputField
          controlId='username'
          label='Username'
          type='text'
          name='username'
          value={userInput.username}
          onChange={handleChange}
        />
        <InputField
          controlId='email'
          label='Email'
          type='email'
          name='email'
          value={userInput.email}
          onChange={handleChange}
        />
        <InputField
          controlId='image'
          label='Profile Picture'
          type='file'
          name='image'
          onChange={handleChange}
          text={
            userInput.image && `${userInput.image?.name} Uploaded Successfully`
          }
        />
        <SubmitButton
          variant='secondary'
          type='submit'
          text='Update user'
          className='uppercase'
          disabled={isLoading}
        />
      </Form>
      <div className='flex justify-center gap-2 mt-3 font-medium'>
        <Link to='/admin-dashboard'>
          <span className='font-semibold text-blue-400'>Go Back</span>
        </Link>
      </div>
      <div className='mt-3'>
        {isError && (
          <ErrorMessages
            error={error?.data?.message || 'Something went wrong'}
          />
        )}
        {isSuccess && (
          <Alert
            variant='success'
            className='text-center'>
            {data?.message || 'Sign up Successful'}
          </Alert>
        )}
      </div>
    </div>
  );
};
