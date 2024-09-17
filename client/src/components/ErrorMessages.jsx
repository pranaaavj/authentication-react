import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

const ErrorMessages = ({ error }) => {
  if (!error) return null;

  return Array.isArray(error) ? (
    error.map((message) => (
      <Alert
        key={message}
        variant='danger'
        className='text-center'>
        {message}
      </Alert>
    ))
  ) : (
    <Alert
      variant='danger'
      className='text-center'>
      {error}
    </Alert>
  );
};
ErrorMessages.propTypes = {
  error: PropTypes.any,
};

export default ErrorMessages;
