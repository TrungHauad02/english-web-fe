import { CardMedia, Stack, Typography } from "@mui/material";
import useColor from "shared/color/Color";

function MainPicture({ src, title }) {
  const {Color1, Color2} = useColor();
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ position: "relative", height: "100%", width: "100%" }}
    >
      <CardMedia
        image={src}
        alt="main"
        sx={{ width: "100%", height: "300px", objectFit: "cover" }}
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
          color: "#fff",
          background: `linear-gradient(90deg, ${Color1} 0%, ${Color2} 80%)`,
          paddingY: "1rem",
          paddingX: "4rem",
          borderRadius: "0 1rem 0 0",
          transition: "all 2.5s",
          ":hover": {
            paddingX: "8rem",
            color: "#000",
          },
        }}
      >
        {title}
      </Typography>
    </Stack>
  );
}

export default MainPicture;
