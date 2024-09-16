import Button from 'react-bootstrap/esm/Button';
import PropTypes from 'prop-types';

export const SubmitButton = ({
  variant,
  type,
  text,
  disabled = false,
  className = '',
}) => {
  const baseStyle = 'font-medium';

  return (
    <Button
      disabled={disabled}
      variant={variant}
      type={type}
      className={`${baseStyle} ${className}`}>
      {text}
    </Button>
  );
};

SubmitButton.propTypes = {
  variant: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
