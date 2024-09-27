import { Button } from 'flowbite-react';

export const Footer = () => {
  return (
    <footer className='bg-gray-900 py-10 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h3 className='text-lg font-semibold mb-4'>Pen & Post</h3>
        <p className='text-sm text-gray-300 mb-6'>
          Unleash your creativity, share your stories, and connect with
          like-minded individuals.
        </p>
        <Button
          variant='contained'
          size='large'
          className='bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold'>
          Join Now
        </Button>

        <p className='mt-6 text-xs text-gray-400'>
          © 2024 Pen & Post. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
