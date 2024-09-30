export const validateBlog = (formData) => {
  const validation = {};

  //checking for empty fields
  if (!formData.title.trim()) {
    validation.title = 'Title cannot be empty';
  }

  if (!formData.body.trim()) {
    validation.body = 'Body cannot be empty';
  }

  if (!formData.category.trim()) {
    validation.category = 'Category cannot be empty';
  }

  // if any field empty, cancel submission
  return validation;
};
