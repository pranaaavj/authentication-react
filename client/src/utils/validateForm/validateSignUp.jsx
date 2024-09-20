export const validateSignUp = (formData) => {
  const validation = {};

  //checking for empty fields
  if (!formData.email.trim()) {
    validation.email = 'Email Cannot be empty';
  }

  if (!formData.password.trim()) {
    validation.password = 'Password Cannot be empty';
  }

  if (!formData.username.trim()) {
    validation.username = 'Username Cannot be empty';
  }

  // if any field empty, cancel submission
  return validation;
};
