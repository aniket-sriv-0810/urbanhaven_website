export const validateForm = (newUser) => {
    let errors = {};
    let isValid = true;
  
    if (!newUser.name) {
      errors.name = "Name is required!";
      isValid = false;
    }
    
    if (!newUser.username) {
      errors.username = "Username is required!";
      isValid = false;
    }
  
    if (newUser.phone && !/^[0-9]{10}$/.test(newUser.phone)) {
      errors.phone = "Phone number must be a 10-digit number.";
      isValid = false;
    }
  
    if (!newUser.email) {
      errors.email = "Email is required!";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      errors.email = "Invalid email format.";
      isValid = false;
    }
  
    if (!newUser.password) {
      errors.password = "Password is required!";
      isValid = false;
    } else if (newUser.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }
  
    return { isValid, errors };
  };
  