import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { auth } from '../../config/firebaseConfig';
import { setUser } from '../redux/slices/userSlice';
import { validateSignIn } from '../utils';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { InputField, SubmitButton, ErrorMessages } from '../components';
import { useSignInMutation, useGoogleSignUpMutation } from '../api/authApi';

const emptyForm = { email: '', password: '' };

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const { accessToken } = useSelector((state) => state.user);
  const [googleSignUp] = useGoogleSignUpMutation();
  const [formData, setFormData] = useState(emptyForm);
  const [validation, setValidation] = useState(emptyForm);
  const [signIn, { isLoading, isError, error }] = useSignInMutation();

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
    setValidation(emptyForm);
  }, [formData, accessToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate user data
    const newValidation = validateSignIn(formData);
    if (Object.keys(newValidation).length) {
      setValidation(newValidation);
      return;
    }

    // Sending form data to create user
    const response = await signIn(formData);
    if (response?.data?.success) {
      dispatch(setUser(response?.data?.data));
      navigate('/');
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await signInWithPopup(auth, provider);

    const { email, displayName, photoURL } = result.user;
    const user = {
      email,
      username: displayName,
      photoURL,
    };
    console.log(result.user);
    const response = await googleSignUp(user);
    if (response?.data?.success) {
      dispatch(setUser(response?.data?.data));
      navigate('/');
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-md '>
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
          text={isLoading ? 'Loading...' : 'Sign In'}
          className='uppercase'
          disabled={isLoading}
        />
        <SubmitButton
          variant='danger'
          text={isLoading ? 'Loading...' : 'Sign In With Google'}
          className='uppercase mt-3'
          type='reset'
          onClick={handleGoogleSignIn}
        />
      </Form>
      <div className='flex justify-center gap-2 mt-3 font-medium'>
        <p>Don&apos;t have an account ?</p>
        <Link to='/sign-up'>
          <span className='font-semibold text-blue-400'>Sign up</span>
        </Link>
      </div>
      <div className='mt-3'>
        {isError && <ErrorMessages error={error?.data?.message} />}
      </div>
    </div>
  );
};
