import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Divider, IconButton, InputAdornment, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ toggleForm, onLogin }) => { // Đảm bảo onLogin được truyền vào
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = () => {
    // Kiểm tra thông tin đăng nhập
    if (email === 'web@gmail.com' && password === '123') {
      localStorage.setItem('isSignIn', 'true');
      navigate('/student');
      window.location.reload();
      
    }
    if (email === 'admin@gmail.com' && password === '123') {
      localStorage.setItem('isSignIn', 'true');
      navigate('/admin/teacher');
      window.location.reload();
    } else {
      setError('Incorrect email or password');
    }
  };

  return (
    <Box
      width="100%"
      padding={4}
      border="1px solid #e0e0e0"
      borderRadius="8px"
      boxShadow="2px 2px 10px rgba(0, 0, 0, 0.1)"
      bgcolor="white"
      mb={2}
    >
      <Typography variant="h5" align="center" mb={2}>
        Sign In
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        fullWidth
        variant="outlined"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@gmail.com"
        margin="normal"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
      <Button
        fullWidth
        variant="contained"
        color="primary"
        style={{ marginTop: 16, marginBottom: 16 }}
        onClick={handleSignIn}
      >
        Sign In
      </Button>
      <Divider>
        <Typography variant="caption">Or</Typography>
      </Divider>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        color="error"
        style={{ marginTop: 16 }}
      >
        Sign in with Google
      </Button>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Link href="#" variant="body2" onClick={() => toggleForm('signup')}>
          Sign up
        </Link>
        <Link href="#" variant="body2" onClick={() => toggleForm('forgot')}>
          Forgot password?
        </Link>
      </Box>
    </Box>
  );
};

export default SignIn;