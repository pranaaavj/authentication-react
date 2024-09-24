// Global error handler
const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Something went wrong',
  };

  // Handling mongoose duplicate value errors
  if (err.code || err.code === 11000) {
    console.log(customError);
    customError.message = `This ${Object.keys(
      err?.keyValue
    )} already exists, Please log in or enter another value`;
    customError.statusCode = 409;
  }

  // Handling mongoose validation error
  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors).map((err) => err.message);
    customError.statusCode = 400;
  }

  // Handling JWT validation
  if (err.name === 'JsonWebTokenError') {
    customError.message = `Invalid Token, Please login again`;
    customError.statusCode = 401;
  }

  // Handling Token Expiration
  if (err.name === 'TokenExpiredError') {
    customError.message = 'Your token has expired. Please log in again.';
    customError.statusCode = 401;
  }

  res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
    data: null,
  });
};

export default errorHandler;
