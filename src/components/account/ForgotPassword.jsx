import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Link, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ForgotPassword = ({ toggleForm }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [fakeDatabase, setFakeDatabase] = useState({ email: 'web@gmail.com', password: '123456' });
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [timer, setTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    return () => clearTimeout(countdown);
  }, [timer]);

  const handleGetOtp = () => {
    if (email === fakeDatabase.email) {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString(); // Fake OTP generation
      setGeneratedOtp(newOtp);
      alert(`Your OTP is: ${newOtp}`);  // Hiện đỡ mã OTP, sau này sẽ xóa dòng này
      setStep(2);
      setTimer(60);
      console.log('Generated OTP:', newOtp);
    } else {
      alert('Email not found in database.');
    }
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp && timer > 0) {
      setStep(3);
    } else {
      alert('Invalid or expired OTP.');
    }
  };

  const handleResetPassword = () => {
    if (newPassword === rePassword) {
      setFakeDatabase({ ...fakeDatabase, password: newPassword });
      console.log('Password reset successfully:', newPassword);
      toggleForm('signin');
      alert('Password reset successfully')
    } else {
      alert('Passwords do not match.');
    }
  };

  const handleResendOtp = () => {
    handleGetOtp();
  };

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
        Forgot Password
      </Typography>

      {step === 1 && (
        <>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 16 }}
            onClick={handleGetOtp}
          >
            Get OTP
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <TextField
            fullWidth
            variant="outlined"
            label="OTP"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            margin="normal"
          />
          <Typography variant="body2" color="textSecondary" align="center">
            Time remaining: {timer} seconds
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 16 }}
            onClick={handleVerifyOtp}
            disabled={timer <= 0}
          >
            Verify OTP
          </Button>
          <Button
            fullWidth
            variant="text"
            color="primary"
            style={{ marginTop: 8 }}
            onClick={handleResendOtp}
          >
            Resend OTP
          </Button>
        </>
      )}

      {step === 3 && (
        <>
          <TextField
            fullWidth
            variant="outlined"
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
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
            placeholder="Re-enter Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 16 }}
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </>
      )}

      <Box mt={2} display="flex" justifyContent="center">
        <Link href="#" variant="body2" onClick={() => toggleForm('signin')}>
          Back to Sign In
        </Link>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
