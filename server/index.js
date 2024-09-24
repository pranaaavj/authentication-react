import 'dotenv/config';
import 'express-async-errors';
import path from 'path';
import cors from './config/corsConfig.js';
import router from './routes/index.js';
import express from 'express';
import connectDB from './config/database.js';
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors);
app.use(cookieParser());
app.use(
  '/api/uploads',
  express.static(path.join(import.meta.dirname, 'uploads'))
);

// Routes
app.use('/api', router);

// Global error handler
app.use(errorHandler);

// Server start function
(async function start() {
  const DB = process.env.MONGO_URI;
  const PORT = process.env.PORT || 3050;
  try {
    await connectDB(DB); //Connect database
    app.listen(PORT, () =>
      console.log(`server listening at http://localhost:${PORT}/api`)
    );
  } catch (error) {
    console.log(`Error starting the server: ${error.message}`);
  }
})();
