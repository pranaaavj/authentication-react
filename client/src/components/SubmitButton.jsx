import Button from 'react-bootstrap/esm/Button';
import PropTypes from 'prop-types';

export const SubmitButton = ({
  variant = 'primary',
  type = '',
  text = '',
  disabled = false,
  className = '',
  onClick = () => {},
}) => {
  const baseStyle = 'font-medium';

  return (
    <Button
      disabled={disabled}
      variant={variant}
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${className}`}>
      {text}
    </Button>
  );
};

SubmitButton.propTypes = {
  variant: PropTypes.string.isRequired,
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
