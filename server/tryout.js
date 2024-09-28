function throwError() {
  throw new Error('hello vishnu');
}

class CustomError extends Error {
  constructor(message) {
    super(message);
  }
}



throw new CustomError('hello vishnu');
