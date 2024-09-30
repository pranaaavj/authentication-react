import { Button, Input } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { useRef } from 'react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const CreatePost = () => {
  const [blogInput, setBlogInput] = useState({
    title: '',
    category: '',
    image: '',
    body: '',
  });
  const fileRef = useRef(null);

  const handleBlogInput = ({ target: { name, value, files } }) => {
    if (files)
      setBlogInput((prevInput) => ({ ...prevInput, [name]: files[0] }));
    else setBlogInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(blogInput);
  };

  return (
    <div className='min-h-screen max-w-3xl mx-auto px-4'>
      <h1 className='text-center text-3xl my-7 font-semibold dark:text-white'>
        Create Post
      </h1>
      <form className='flex flex-col gap-4 mt-10'>
        <div className='flex flex-col gap-4 sm:flex-row justify-center items-center'>
          <Input
            size='md'
            variant='filled'
            placeholder='Title'
            value={blogInput.title}
            onChange={handleBlogInput}
            name='title'
          />
          <Select
            size='md'
            variant='filled'
            width={['100%', '100%', '70%', '70%']}
            maxWidth='600px'
            name='category'
            value={blogInput.category}
            onChange={handleBlogInput}>
            <option value='javascript'>Javascript</option>
            <option value='react'>React</option>
            <option value='expressjs'>ExpressJS</option>
            <option value='mongodb'>MongoDB</option>
          </Select>
        </div>
        <div className='flex flex-col sm:flex-row gap-4 border border-dotted p-3 border-black'>
          <Input
            size='md'
            variant='filled'
            placeholder="I'm here brother"
            type='file'
            name='image'
            ref={fileRef}
            onChange={handleBlogInput}
            accept='image/* '
          />
          <Button
            minWidth='200px'
            onClick={() => fileRef.current.click()}>
            Choose an image
          </Button>
        </div>
        <ReactQuill
          theme='snow'
          placeholder='Write Something..'
          className='h-72 mb-12 dark:text-white'
          onChange={(value) =>
            setBlogInput((prevInput) => ({ ...prevInput, body: value }))
          }
        />
        <Button
          width='150px'
          display='flex'
          margin='auto'
          onClick={handleSubmit}>
          Submit Blog
        </Button>
      </form>
    </div>
  );
};
