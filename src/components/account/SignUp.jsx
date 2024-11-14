import React, { useState, useRef } from "react";
import { Box, Button, TextField, Typography, Link, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { handleSignUp, handleClickShowPassword } from "./common/HandleSignUp";

const SignUp = ({ toggleForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const emailInputRef = useRef(null);

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
        inputRef={emailInputRef}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => handleClickShowPassword(showPassword, setShowPassword)}>
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
        type={showPassword ? "text" : "password"}
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
        placeholder="Re-enter Password"
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => handleClickShowPassword(showPassword, setShowPassword)}>
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
        onClick={() => handleSignUp(name, email, password, rePassword, toggleForm, emailInputRef)}
      >
        Sign Up
      </Button>
      <Box mt={2} display="flex" justifyContent="center">
        Already have an account?{" "}
        <Link href="#" variant="body2" onClick={() => toggleForm("signin")}>
          Sign In
        </Link>
      </Box>
    </Box>
  );
};

export default SignUp;
