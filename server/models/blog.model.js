import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.webp',
  },
});

export default mongoose.model('Blog', BlogSchema);
