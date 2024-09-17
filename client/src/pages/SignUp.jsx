import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import ErrorMessages from '../components/ErrorMessages';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../api/auth';
import { useEffect, useState } from 'react';
import { InputField, SubmitButton } from '../components';

export const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [validation, setValidation] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [signUp, { isLoading, isSuccess, isError, error, data }] =
    useSignUpMutation();

  useEffect(() => {
    setValidation({
      username: '',
      email: '',
      password: '',
    });
  }, [formData]);

  // Redirecting if user authenticated
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/sign-in');
      }, 1000);
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {
      username: '',
      email: '',
      password: '',
    };
    let valid = true;
    // Checking for empty fields
    if (!formData.email.trim()) {
      newErrors.email = 'Email Cannot be empty';
      valid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password Cannot be empty';
      valid = false;
    }
    if (!formData.username.trim()) {
      newErrors.username = 'Username Cannot be empty';
      valid = false;
    }
    // If any field empty, cancel submission
    if (!valid) {
      setValidation(newErrors);
      return;
    }
    // Sending form data to create user
    signUp(formData);
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
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
      <h1 className='text-4xl font-semibold text-center mt-2'>SIGN UP</h1>
      <Form
        className='w-96 flex flex-col mx-auto align-middle mt-8'
        onSubmit={handleSubmit}>
        <InputField
          controlId='username'
          label='Username'
          type='text'
          name='username'
          placeholder='Enter username'
          value={formData.username}
          onChange={handleChange}
          validationMessage={validation.username}
          isInvalid={!!validation.username}
        />
        <InputField
          controlId='email'
          label='Email'
          type='email'
          name='email'
          placeholder='Enter email address'
          value={formData.email}
          onChange={handleChange}
          text="We'll never share your email with anyone else."
          validationMessage={validation.email}
          isInvalid={!!validation.email}
        />
        <InputField
          controlId='password'
          label='Password'
          type='password'
          name='password'
          placeholder='Enter password'
          value={formData.password}
          onChange={handleChange}
          validationMessage={validation.password}
          isInvalid={!!validation.password}
        />
        <SubmitButton
          variant='secondary'
          type='submit'
          text='Sign up'
          className='uppercase'
          disabled={isLoading}
        />
      </Form>
      <div className='flex justify-center gap-2 mt-3 font-medium'>
        <p>Already have an account ?</p>
        <Link to='/sign-in'>
          <span className='font-semibold text-blue-400'>Sign in</span>
        </Link>
      </div>
      <div className='mt-3'>
        {isError && (
          <ErrorMessages error={error.data.message || 'Something went wrong'} />
        )}
        {isSuccess && (
          <Alert
            variant='success'
            className='text-center'>
            {data.message || 'Sign up Successful'}
          </Alert>
        )}
      </div>
    </div>
  );
};
