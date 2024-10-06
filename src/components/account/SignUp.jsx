import React, { useState, useRef } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';

const SignUp = ({ toggleForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');

  // Fake database to store users
  const [fakeDatabase, setFakeDatabase] = useState([
    { email: 'existinguser@gmail.com', password: 'Password@123' }
  ]);

  // Ref for email input
  const emailInputRef = useRef(null);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSignUp = () => {
    // Check if all fields are filled
    if (!name || !email || !password || !rePassword) {
      setError('Please fill in all fields.');
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setError('Invalid email format. Please enter a valid email address.');
      setEmail('');
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
      return;
    }

    // Check if email already exists in the fake database
    const emailExists = fakeDatabase.some((user) => user.email === email);
    if (emailExists) {
      setError('Email already exists. Please use a different email.');
      setEmail('');
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
      return;
    }

    // Check if password meets requirements
    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.'
      );
      return;
    }

    // Check if passwords match
    if (password !== rePassword) {
      setError('Passwords do not match.');
      return;
    }

    // Clear errors
    setError('');

    // Add new user to the fake database
    const newUser = { email, password };
    setFakeDatabase([...fakeDatabase, newUser]);
    console.log('User signed up successfully:', newUser);

    // Navigate to sign-in page
    toggleForm('signin');
  };

  return (
    <Box
      width="100%"
      padding={4}
      border="1px solid #e0e0e0"
      borderRadius="8px"
      boxShadow="2px 2px 10px rgba(0, 0, 0, 0.1)"
      bgcolor="white"
    >
      <Typography variant="h5" align="center" mb={2}>
        Sign Up
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        fullWidth
        variant="outlined"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        margin="normal"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@gmail.com"
        margin="normal"
        inputRef={emailInputRef} // Attach ref to email input field
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Re-enter Password"
        type={showPassword ? 'text' : 'password'}
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
        placeholder="Re-enter Password"
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        style={{ marginTop: 16, marginBottom: 16 }}
        onClick={handleSignUp}
      >
        Sign Up
      </Button>
      <Box mt={2} display="flex" justifyContent="center">
        Already have an account?{' '}
        <Link href="#" variant="body2" onClick={() => toggleForm('signin')}>
          Sign In
        </Link>
      </Box>
    </Box>
  );
};

export default SignUp;
