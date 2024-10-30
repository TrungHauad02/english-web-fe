import React from 'react';
import { TextField, Button } from '@mui/material';

const EmailStep = ({ email, setEmail, handleGetOtp }) => (
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
);

export default EmailStep;
