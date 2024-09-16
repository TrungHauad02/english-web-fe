import { Stack, Typography } from "@mui/material";

function MainPicture({ src, title }) {
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
      <Typography
        variant="h4"
        component="h2"
        sx={{
          position: "absolute",
          fontWeight: "bold",
          textTransform: "capitalize",
          bottom: "0",
          left: "0",
          color: "#000",
          background:
            "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 100%)",
          paddingY: "1rem",
          paddingX: "1.5rem",
          borderRadius: "0.5rem",
        }}
      >
        {title}
      </Typography>
    </Stack>
  );
}

export default MainPicture;
