import React from 'react';
import { TextField, Button } from '@mui/material';
import useColor from "shared/color/Color";

const EmailStep = ({ email, setEmail, handleGetOtp }) => {
  const { Color2} = useColor(); 

  return (
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleGetOtp();
          }
      }}
      />
      <Button
        fullWidth
        variant="contained"
        style={{ marginTop: 16, background: Color2 }}
        onClick={handleGetOtp}
      >
        Get OTP
      </Button>
    </>
  );
};

export default EmailStep;
