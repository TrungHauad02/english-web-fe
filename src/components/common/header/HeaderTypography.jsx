import { Typography } from "@mui/material";

function HeaderTypography({
  children,
  variant = "h6",
  component = "h2",
  sx = { fontWeight: "bold", fontSize: "1rem" },
  onClick,
}) {
  return (
    <Typography
      variant={variant}
      component={component}
      sx={sx}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {children}
    </Typography>
  );
}

export default HeaderTypography;
