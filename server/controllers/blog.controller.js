import Blog from '../models/blog.model.js';
/**
 * @route GET /api/blog/create-blog
 * @desc Create a new blog
 * @access Private
 */
export const createBlog = async (req, res) => {
  const { title, category, body } = req.body;
  const { userId } = req.user;
  const file = req?.file;
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
