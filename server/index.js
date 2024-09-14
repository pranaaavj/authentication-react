import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import connectDB from './config/database.js';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

(async function start() {
  const DB = process.env.MONGO_URI;
  const PORT = process.env.PORT || 3050;
  try {
    await connectDB(DB);
    app.listen(PORT, () =>
      console.log(`server listening at http://localhost:${PORT}/api`)
    );
  } catch (error) {
    console.log(`Error starting the server: ${error.message}`);
  }
})();
