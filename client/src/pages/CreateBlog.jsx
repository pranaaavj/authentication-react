import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Image } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { validateBlog } from '../utils';
import { useCustomToast } from '../hooks';
import { Button, Input } from '@chakra-ui/react';
import { ErrorMessages } from '../components';
import { createFormData } from '../utils/createFormData';
import { useCreateBlogMutation } from '../api/blogApi';
import { useEffect, useRef, useState } from 'react';

const emptyBlog = {
  title: '',
  category: '',
  image: '',
  body: '',
};

export const CreateBlog = () => {
  const fileRef = useRef(null);
  const toast = useCustomToast();
  const [blogInput, setBlogInput] = useState(emptyBlog);
  const [imagePreview, setImagePreview] = useState('');
  const [validation, setValidation] = useState(emptyBlog);
  const [createBlog, { isError, isSuccess, error }] = useCreateBlogMutation();

  useEffect(() => {
    if (isSuccess) {
      toast('Blog posted successfully', 'green');
    }
    setValidation(emptyBlog);
  }, [isSuccess, blogInput]);

  const handleBlogInput = ({ target: { name, value, files } }) => {
    if (files) {
      setBlogInput((prevInput) => ({ ...prevInput, [name]: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else setBlogInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newValidation = validateBlog(blogInput);
    if (Object.keys(newValidation).length) {
      setValidation(newValidation);
      return;
    }

    const blogData = createFormData(blogInput);
    await createBlog(blogData);
  };
  console.log(validation);
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
            hidden
          />
          <Button
            minWidth='200px'
            onClick={() => fileRef.current.click()}>
            Choose an image
          </Button>
        </div>
        <div className='flex justify-center'>
          {imagePreview && (
            <Image
              src={imagePreview}
              objectFit={'cover'}
              boxSize={'300px'}
              alt='image preview'
            />
          )}
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
          Post Blog
        </Button>
      </form>
      <div className='text-center mt-3'>
        {isError && <ErrorMessages error={error?.data?.message} />}
        {Object.keys(validation).length > 0 &&
          Object.keys(validation).map((key) => (
            <ErrorMessages
              key={key}
              error={validation[key]}
            />
          ))}
      </div>
    </div>
  );
};
