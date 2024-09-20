import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import ErrorMessages from '../components/ErrorMessages';
import { validateSignUp } from '../utils';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../api/auth';
import { useEffect, useState } from 'react';
import { InputField, SubmitButton } from '../components';

export const SignUp = () => {
  const navigate = useNavigate();
  const emptyForm = { username: '', email: '', password: '' };
  const [formData, setFormData] = useState(emptyForm);
  const [validation, setValidation] = useState(emptyForm);
  const [signUp, { isLoading, isSuccess, isError, error, data }] =
    useSignUpMutation();

  // Redirecting if user authenticated
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/sign-in');
      }, 1000);
    }
    setValidation(emptyForm);
  }, [isSuccess, formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newValidation = validateSignUp(formData);
    if (Object.keys(newValidation).length) {
      setValidation(newValidation);
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
