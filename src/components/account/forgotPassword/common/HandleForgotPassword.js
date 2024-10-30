export const handleGetOtp = (
    email,
    setGeneratedOtp,
    setStep,
    setTimer,
    fakeDatabase
  ) => {
    if (email === fakeDatabase.email) {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString(); // Fake OTP generation
      setGeneratedOtp(newOtp);
      alert(`Your OTP is: ${newOtp}`); // Display OTP temporarily, to be removed later
      setStep(2);
      setTimer(60);
      console.log('Generated OTP:', newOtp);
    } else {
      alert('Email not found in database.');
    }
  };
  
  export const handleVerifyOtp = (otp, generatedOtp, timer, setStep) => {
    if (otp === generatedOtp && timer > 0) {
      setStep(3);
    } else {
      alert('Invalid or expired OTP.');
    }
  };
  
  export const handleResetPassword = (
    newPassword,
    rePassword,
    setFakeDatabase,
    fakeDatabase,
    toggleForm
  ) => {
    if (newPassword === rePassword) {
      setFakeDatabase({ ...fakeDatabase, password: newPassword });
      console.log('Password reset successfully:', newPassword);
      toggleForm('signin');
      alert('Password reset successfully');
    } else {
      alert('Passwords do not match.');
    }
  };
  
  export const handleClickShowPassword = (showPassword, setShowPassword) => {
    setShowPassword(!showPassword);
  };
  