import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';

const ForgotPassword = ({ toggleForm }) => {
  const [step, setStep] = useState(1); // Bước đầu tiên là nhập email
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleGetOtp = () => {
    setStep(2); // Chuyển sang bước nhập OTP
  };

  const handleResetPassword = () => {
    // Logic xử lý đặt lại mật khẩu ở đây
    console.log('OTP:', otp, 'New Password:', newPassword);
    // Sau khi đặt lại mật khẩu thành công, chuyển về màn hình đăng nhập
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
        Forgot Password
      </Typography>

      {step === 1 && (
        <>
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
          <TextField
            fullWidth
            variant="outlined"
            label="New Password"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
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
