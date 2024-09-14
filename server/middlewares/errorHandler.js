const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode,
    message: err.message,
  };
  res.status(customError.statusCode).json(customError.message);
};

export default errorHandler;
