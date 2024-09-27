import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

export const InputField = ({
  controlId,
  label,
  type,
  placeholder,
  name,
  value = '',
  onChange,
  text,
  isInvalid = false,
  validationMessage = '',
  disabled = false,
  className = '',
}) => {
  return (
    <Form.Group
      className={`mb-3 ${className}`}
      controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
        disabled={disabled}
      />
      {text && <Form.Text>{text}</Form.Text>}
      <Form.Control.Feedback type='invalid'>
        {validationMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

InputField.propTypes = {
  controlId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string,
  isInvalid: PropTypes.bool,
  validationMessage: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
