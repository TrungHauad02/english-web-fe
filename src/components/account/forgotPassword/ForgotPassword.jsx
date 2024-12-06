import React, { useState, useEffect } from 'react';
import { Box, Typography, Link } from '@mui/material';
import EmailStep from './common/EmailStep';
import OtpStep from './common/OtpStep';
import ResetPasswordStep from './common/ResetPasswordStep';
import useColor from "shared/color/Color";
import DotLoader from "shared/component/loader/DotLoader";
import { handleGetOtp, handleVerifyOtp, handleResetPassword, handleClickShowPassword} from './common/HandleForgotPassword';

const ForgotPassword = ({ toggleForm }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [timer, setTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { Color2} = useColor();

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    return () => clearTimeout(countdown);
  }, [timer]);

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
        <EmailStep
          email={email}
          setEmail={setEmail}
          handleGetOtp={() => handleGetOtp(email, setStep, setTimer, setIsLoading)}
        />
      )}

      {step === 2 && (
        <OtpStep
          otp={otp}
          setOtp={setOtp}
          timer={timer}
          handleVerifyOtp={() => handleVerifyOtp(email, otp, timer, setStep)}
          handleResendOtp={() => handleGetOtp(email, setStep, setTimer)}
        />
      )}

      {step === 3 && (
        <ResetPasswordStep
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          rePassword={rePassword}
          setRePassword={setRePassword}
          showPassword={showPassword}
          handleClickShowPassword={() => handleClickShowPassword(showPassword, setShowPassword)}
          handleResetPassword={() => handleResetPassword(email, newPassword, rePassword, toggleForm)}
        />
      )}

      <Box mt={2} display="flex" justifyContent="center">
        <Link href="#" sx={{color: Color2}} variant="body2" onClick={() => toggleForm('signin')}>
          Back to Sign In
        </Link>
      </Box>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1300,
          }}
        >
          <DotLoader dotSize="1rem" />
        </div>
      )}
    </Box>
  );
};

export default ForgotPassword;
