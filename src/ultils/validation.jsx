
// src/validators.js

export const validatePhoneNumber = (phoneNumber) => {
  const re = /^0\d{9}$/;
  if (!phoneNumber) {
    return "Phone number is required";
  }
  if (!re.test(phoneNumber)) {
    return "Phone number is not valid. It should be a 10-digit number starting with 0";
  }
  return null;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "Email is required";
  }
  if (!re.test(email)) {
    return "Email is not valid";
  }
}

export const checkOTP = (otp) => {
  const re = /^\d{6}$/;
  if (!otp) {
    return "OTP is required";
  }
  if (!re.test(otp)) {
    return "OTP is not valid. It should be a 6-digit number";
  }
}

export const validatePassword = (password) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!password) {
    return "Password is required";
  }
  if (!re.test(password)) {
    return "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one digit";
  }
}
