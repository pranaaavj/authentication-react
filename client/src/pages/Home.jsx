import { Card, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

// Dummy blog data for demonstration purposes
const blogs = [
  {
    id: 1,
    title: 'The Beauty of Minimalism in Design',
    description:
      'Minimalism is more than a design trend; it’s a way of life that promotes simplicity and clarity.',
    author: 'John Doe',
    date: 'September 20, 2024',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: 'How Writing Can Improve Your Mental Health',
    description:
      'Writing is a powerful tool for self-expression and mental well-being. Discover how it can help.',
    author: 'Jane Smith',
    date: 'September 18, 2024',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    title: 'Exploring Creative Writing Techniques',
    description:
      'From metaphors to similes, learn creative writing techniques to elevate your storytelling skills.',
    author: 'Sarah Connor',
    date: 'September 15, 2024',
    imageUrl: 'https://via.placeholder.com/150',
  },
];

const Home = () => {
  return (
    <div className='bg-gray-100 dark:bg-gray-900 min-h-screen '>
      {/* Hero Section */}
      <section className='flex flex-col items-center justify-center py-20 px-4 md:px-10 lg:px-20'>
        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center text-gray-900 dark:text-white mb-6'>
          Discover Inspiring Stories on Pen & Post
        </h1>
        <p className='text-lg sm:text-xl lg:text-2xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mb-8'>
          Dive into a world of captivating stories, insights, and creative
          expressions from writers all around the world.
        </p>
        <Button
          variant='contained'
          size='large'
          className='bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white font-bold'>
          Start Reading
        </Button>
      </section>

      {/* Blog Listing Section */}
      <section className='py-20 bg-white dark:bg-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
            Latest Blogs
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {blogs.map((blog) => (
              <Card
                key={blog.id}
                className='hover:shadow-lg transition-shadow duration-300'>
                {/* Blog Image */}
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className='w-full h-40 object-cover rounded-t-lg'
                />
                {/* Blog Content */}
                <div className='p-4'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                    {blog.title}
                  </h3>
                  <p className='text-sm text-gray-600 dark:text-gray-300 mb-4'>
                    {blog.description}
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400 mb-2'>
                    By {blog.author} on {blog.date}
                  </p>
                  <Link to={`/blog/${blog.id}`}>
                    <Button
                      size='sm'
                      className='bg-indigo-600 text-white'>
                      Read More
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export { Home };
