import React from "react";
import { useAuth } from "security/AuthContext";
import { Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const ErrorPage = ({ errorType }) => {
  const { userRole } = useAuth();

  const getHomePath = () => {
    switch (userRole) {
      case "TEACHER":
        return "/teacher";
      case "ADMIN":
        return "/admin";
      case "STUDENT":
      default:
        return "/student";
    }
  };

  const getErrorMessage = () => {
    switch (errorType) {
      case 400:
        return "400 - Bad Request. The server could not understand the request.";
      case 401:
        return "401 - Unauthorized. You need to log in to access this page.";
      case 403:
        return "403 - Forbidden. You do not have permission to access this page.";
      case 404:
        return "404 - Page not found.";
      case 500:
        return "500 - Internal Server Error. A server error occurred.";
      case 502:
        return "502 - Bad Gateway. The server received an invalid response.";
      case 503:
        return "503 - Service Unavailable. The server is temporarily unavailable.";
      default:
        return "An unexpected error occurred.";
    }
  };  

  return (
    <Box sx={{ textAlign: "center", marginTop: 8 }}>
      <Typography variant="h3" color="error" gutterBottom>
        {getErrorMessage()}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to={getHomePath()}
        sx={{ marginTop: 2 }}
      >
        Return to home page
      </Button>
    </Box>
  );
};

export default ErrorPage;
