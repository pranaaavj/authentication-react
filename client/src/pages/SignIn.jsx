import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import ErrorMessages from '../components/ErrorMessages';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../api/auth';
import { useEffect, useState } from 'react';
import { InputField, SubmitButton } from '../components';

export const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validation, setValidation] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();

  useEffect(() => {
    setError(null);
    setValidation({
      email: '',
      password: '',
    });
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newValidation = {
      email: '',
      password: '',
    };
    let valid = true;
    //checking for empty fields
    if (!formData.email.trim()) {
      newValidation.email = 'Email Cannot be empty';
      valid = false;
    }
    if (!formData.password.trim()) {
      newValidation.password = 'Password Cannot be empty';
      valid = false;
    }
    // if any field empty, cancel submission
    if (!valid) {
      setValidation(newValidation);
      return;
    }
    // sending form data to create user
    try {
      const response = await signIn(formData).unwrap();
      console.log(response);
      if (response?.success) {
        navigate('/');
      }
      setFormData({
        email: '',
        password: '',
      });
    } catch (error) {
      setError(
        error?.data?.message || 'Something went wrong, Please try again'
      );
    }
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
      <h1 className='text-4xl font-semibold text-center mt-2'>SIGN IN</h1>
      <Form
        className='w-96 flex flex-col mx-auto align-middle mt-8'
        onSubmit={handleSubmit}>
        <InputField
          controlId='email'
          label='Email'
          type='email'
          name='email'
          placeholder='Enter email address'
          value={formData.email}
          onChange={handleChange}
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
          text='Sign in'
          className='uppercase'
          disabled={isLoading}
        />
      </Form>
      <div className='flex justify-center gap-2 mt-3 font-medium'>
        <p>Don&apos;t have an account ?</p>
        <Link to='/sign-up'>
          <span className='font-semibold text-blue-400'>Sign up</span>
        </Link>
      </div>
      <div className='mt-3'>
        <ErrorMessages error={error} />
      </div>
    </div>
  );
};
