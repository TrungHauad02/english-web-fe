import React from "react";
import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";

// Tạo animation bounce
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

export default function DotLoader({ dotSize = "0.75rem" }) {
  return (
    <Box display="flex" flexDirection="row" gap={2}>
      <Box
        sx={{
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          backgroundColor: "blue",
          animation: `${bounce} 0.8s infinite`,
        }}
      />
      <Box
        sx={{
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          backgroundColor: "blue",
          animation: `${bounce} 0.8s infinite`,
          animationDelay: "-0.4s",
        }}
      />
      <Box
        sx={{
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          backgroundColor: "blue",
          animation: `${bounce} 0.8s infinite`,
          animationDelay: "-0.6s",
        }}
      />
    </Box>
  );
}
