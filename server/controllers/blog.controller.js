import Blog from '../models/blog.model.js';
/**
 * @route POST /api/blog/create-blog
 * @desc Create a new blog
 * @access Private
 */
export const createBlog = async (req, res) => {
  const { title, category, body } = req.body;
  const { userId } = req.user;
  const file = req?.file;
  uploadFile(file);
  const newBlog = new Blog({
    userId,
    title,
    category,
    body,
    image: file && file.filename,
  });
  await newBlog.save();

  res.status(201).json({
    success: true,
    message: 'Blog created successfully',
    data: newBlog,
  });
};
/**
 * @route GET /api/blog/all-posts
 * @desc Return all the posts
 * @access Private
 */
export const getAllPosts = (req, res) => {
  const { userId } = req.query;
  console.log(userId);
  console.log('hello');
  res.send();
};
