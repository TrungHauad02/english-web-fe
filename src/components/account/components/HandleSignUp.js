export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  
  export const handleClickShowPassword = (showPassword, setShowPassword) => {
    setShowPassword(!showPassword);
  };
  
  export const handleSignUp = (
    name,
    email,
    password,
    rePassword,
    setError,
    setFakeDatabase,
    fakeDatabase,
    toggleForm,
    emailInputRef
  ) => {
    if (!name || !email || !password || !rePassword) {
      setError('Please fill in all fields.');
      return;
    }
  
    if (!validateEmail(email)) {
      setError('Invalid email format. Please enter a valid email address.');
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
      return;
    }
  
    const emailExists = fakeDatabase.some((user) => user.email === email);
    if (emailExists) {
      setError('Email already exists. Please use a different email.');
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
      return;
    }
  
    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.'
      );
      return;
    }
  
    if (password !== rePassword) {
      setError('Passwords do not match.');
      return;
    }
  
    setError('');
    const newUser = { email, password };
    setFakeDatabase([...fakeDatabase, newUser]);
    toggleForm('signin');
  };
  