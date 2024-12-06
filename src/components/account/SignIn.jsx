import React, { useState } from "react";
import {Box, Button,TextField,Typography, IconButton, InputAdornment, Link,} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { handleSignIn } from "./common/HandleSignIn";
import { useAuth } from "../../security/AuthContext";
import useColor from "shared/color/Color";

const SignIn = ({ toggleForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Color2 } = useColor();

  const navigate = useNavigate();
  const authContext = useAuth();

  const handleSignInClick = async () => {
    try {
      await handleSignIn(email, password, authContext, navigate);
    } catch (error) {
      console.error("Sign-in error:", error);
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
      <TextField
        fullWidth
        variant="outlined"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@gmail.com"
        margin="normal"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSignInClick();
          }
      }}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSignInClick();
          }
      }}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        style={{ marginTop: 16, marginBottom: 16, backgroundColor: Color2 }}
        onClick={handleSignInClick}
      >
        Sign In
      </Button>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Link href="#" variant="body2" sx={{color: Color2}} onClick={() => toggleForm("signup")}>
          Sign up
        </Link>
        <Link href="#" variant="body2" sx={{color: "red"}} onClick={() => toggleForm("forgot")}>
          Forgot password?
        </Link>
      </Box>
    </Box>
  );
};

export default SignIn;
