export const validateForm = (formData) => {
  const errors = {};

  if (!/^\d{12}$/.test(formData.aadhaarNumber)) {
    errors.aadhaarNumber = "Aadhaar must be 12 digits.";
  }

  if (!/^\d{10}$/.test(formData.panNumber)) {
    errors.panNumber = "PAN must be 10 digits.";
  }

  if (!/^\d{10}$/.test(formData.phoneNumber)) {
    errors.phoneNumber = "Phone number must be 10 digits.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Invalid email address.";
  }

  if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
};