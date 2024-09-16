import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { InputField, SubmitButton } from '../components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validation, setValidation] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {
      email: '',
      password: '',
    };
    let valid = true;
    //checking for empty fields
    if (!formData.email.trim()) {
      newErrors.email = 'Email Cannot be empty';
      valid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password Cannot be empty';
      valid = false;
    }
    // if any field empty, cancel submission
    if (!valid) {
      setValidation(newErrors);
      setError(null);
      return;
    }
    // sending form data to create user
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:3000/api/auth/signin',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response.data);
      if (response?.data?.status == 'success') {
        navigate('/');
      }
      setFormData({
        email: '',
        password: '',
      });
    } catch (error) {
      console.log(error);
      setError(error?.response?.data);
    } finally {
      setLoading(false);
      setValidation({
        email: '',
        password: '',
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
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
          text='Sign up'
          className='uppercase'
          disabled={loading}
        />
      </Form>
      <div className='flex justify-center gap-2 mt-3 font-medium'>
        <p>Don&apos;t have an account ?</p>
        <Link to='/sign-up'>
          <span className='font-semibold text-blue-400'>Sign up</span>
        </Link>
      </div>
      <div className='mt-3'>
        {error ? (
          Array.isArray(error?.message) ? (
            error?.message.map((msg) => {
              return (
                <Alert
                  key={msg}
                  variant='danger'
                  className='text-center'>
                  {msg}
                </Alert>
              );
            })
          ) : (
            <Alert
              variant='danger'
              className='text-center'>
              {error.message}
            </Alert>
          )
        ) : null}
      </div>
    </div>
  );
};
