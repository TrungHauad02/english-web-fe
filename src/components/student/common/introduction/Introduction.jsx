import { Typography, Box } from "@mui/material";
import useColor from "shared/color/Color";

function Introduction({ title, subtitle, bodyText }) {
  const { Color1, Color2, Color3, Color4 } = useColor();

  return (
    <Box
      sx={{
        backgroundColor: Color1,
        padding: "2rem",
        borderRadius: "1rem",
        marginX: "5%",
        marginY: "2rem",
        textAlign: "center",
        boxShadow: `0px 4px 12px ${Color4}`,
      }}
    >
      <Typography variant="h4" component="h2" sx={{ color: Color2, fontWeight: "bold", marginBottom: "0.5rem" }}>
        {title}
      </Typography>
      <Typography variant="h6" component="p" sx={{ color: Color3, marginBottom: "1rem" }}>
        {subtitle}
      </Typography>
      <Typography variant="body1" component="p" sx={{ color: Color3 }}>
        {bodyText}
      </Typography>
    </Box>
  );
}

export default Introduction;
