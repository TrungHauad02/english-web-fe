import React, { useState } from "react";
import { styled, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const ImageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100px",
  display: "flex",
  justifyContent: "center",
  position: "relative", 
  marginTop: "1rem",
  marginBottom: "1rem",
}));

export default function ImageWithLoading({ imageSrc }) {
  const [loading, setLoading] = useState(true);

  return (
    <ImageContainer>
      {loading && (
        <CircularProgress
          size={24} 
          style={{
            position: "absolute",
          }}
        />
      )}
      <img
        src={imageSrc}
        alt=""
        style={{
          maxWidth: "100%",
          maxHeight: "100px",
          objectFit: "contain",
          display: loading ? "none" : "block",
        }}
        onLoad={() => setLoading(false)}
      />
    </ImageContainer>
  );
}
