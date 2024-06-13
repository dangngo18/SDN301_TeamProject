
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
  
  
