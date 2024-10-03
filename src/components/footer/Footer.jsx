import { Stack, Typography } from "@mui/material";
import About from "./About";

function Footer() {
  return (
    <Stack
      direction="row"
      sx={{
        height: "40px",
        background: "#ffffff",
        padding: "0.5rem",
        paddingTop: "1rem",
        borderTop: "1px solid #ccc",
      }}
      justifyContent="space-between"
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          paddingLeft: "1.5rem",
        }}
      >
        STUDY ENGLISH WEB
      </Typography>
      <About />
    </Stack>
  );
}

export default Footer;
