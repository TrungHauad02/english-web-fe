import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';

const SignUp = ({ toggleForm }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
      <TextField
        fullWidth
        variant="outlined"
        label="Name"
        placeholder="Your Name"
        margin="normal"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Email"
        type="email"
        placeholder="example@gmail.com"
        margin="normal"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="password"
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
        label="Re-Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="retype password"
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
      >
        Sign Up
      </Button>
      <Box mt={2} display="flex" justifyContent="center">
        Already have an account?
        <Link href="#" variant="body2" onClick={() => toggleForm('signin')}>
          Sign In
        </Link>
      </Box>
    </Box>
  );
};

export default SignUp;
