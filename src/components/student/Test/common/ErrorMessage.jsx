import React from "react";
import { Box, Typography } from "@mui/material";

const ErrorMessage = ({ message }) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        color: "red",
        padding: "1rem",
        borderRadius: "8px",
        margin: "1rem 5%",
        textAlign: "center",
      }}
    >
      <Typography variant="h6">{message}</Typography>
    </Box>
  );
};

export default ErrorMessage;
