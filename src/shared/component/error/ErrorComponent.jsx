import React from "react";
import { Typography, Box, Button, Backdrop } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function ErrorComponent({ errorMessage, onClose }) {
  return (
    <Backdrop open={true} sx={{ zIndex: 1000 }} onClick={onClose}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        bgcolor="white"
        padding="2rem"
        borderRadius="8px"
        boxShadow={3}
        position="fixed"
        top="50%"
        left="50%"
        sx={{ transform: "translate(-50%, -50%)", zIndex: 1300 }}
      >
        <ErrorOutlineIcon color="error" style={{ fontSize: 80 }} />
        <Typography variant="h4" color="error" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {errorMessage ||
            "An unexpected error occurred. Please try again later."}
        </Typography>
        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Backdrop>
  );
}
