// Global error handler
const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Something went wrong',
  };

  // Handling mongoose duplicate value errors
  if (err.code || err.code === 11000) {
    customError.message = `The value for field ${Object.keys(
      err.keyValue
    )} already exists, Please enter another value`;
    customError.statusCode = 409;
  }

  // Handling mongoose validation error
  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors).map((err) => err.message);
    customError.statusCode = 400;
  }

  res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
    statusCode: customError.statusCode,
  });
};

export default errorHandler;
