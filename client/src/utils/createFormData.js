export const createFormData = (input) => {
  const formData = new FormData();
  for (const key in input) {
    if (input[key] && key === 'image') formData.append(key, input[key]);
    else if (key !== 'image') formData.append(key, input[key]);
  }

  return formData;
};
