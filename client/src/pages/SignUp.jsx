import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../api/authApi';
import { useEffect, useState } from 'react';
import { InputField, SubmitButton, ErrorMessages } from '../components';
import { validateSignUp, createFormData } from '../utils';

const emptyForm = { username: '', email: '', password: '', image: '' };

export const SignUp = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState(emptyForm);
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
  }, [isSuccess, userInput, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newValidation = validateSignUp(userInput);
    if (Object.keys(newValidation).length) {
      setValidation(newValidation);
      return;
    }
    const formData = createFormData(userInput);

    // Sending form data to create user
    signUp(formData);
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
          value={userInput.username}
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
          value={userInput.email}
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
          value={userInput.password}
          onChange={handleChange}
          validationMessage={validation.password}
          isInvalid={!!validation.password}
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
          validationMessage={validation.image}
          isInvalid={!!validation.image}
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
