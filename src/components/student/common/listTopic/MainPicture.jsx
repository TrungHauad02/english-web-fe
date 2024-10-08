import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import TruckLoader from "./truck/TruckLoader";

function MainPicture({ src, title }) {
  const [showLoader, setShowLoader] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMouseEnter = () => {
    setShowLoader(true);
    setTimeout(() => {
      setIsAnimating(true);
    }, 50);
  };

  const handleMouseLeave = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setShowLoader(false);
    }, 3000);
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ position: "relative", height: "100%", width: "100%" }}
    >
      <img
        src={src}
        alt="main"
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
      />
      {showLoader && (
        <div
          style={{
            position: "absolute",
            bottom: "25%",
            left: isAnimating ? "200px" : "-200px",
            transition: "left 3s ease-in-out",
            width: "100%",
          }}
        >
          <TruckLoader />
        </div>
      )}
      <Typography
        variant="h4"
        component="h2"
        sx={{
          position: "absolute",
          fontWeight: "bold",
          textTransform: "capitalize",
          bottom: "0",
          left: "0",
          color: "#fff",
          background: "linear-gradient(90deg, #6ec3f78f 0%, #6EC2F7 80%)",
          paddingY: "1rem",
          paddingX: "4rem",
          borderRadius: "0 1rem 0 0",
          transition: "all 2.5s",
          ":hover": {
            paddingX: "8rem",
            color: "#000",
          },
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {title}
      </Typography>
    </Stack>
  );
}

export default MainPicture;
