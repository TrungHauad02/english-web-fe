import { Typography } from "@mui/material";

function HeaderTypography({
  children,
  variant = "h6",
  component = "p",
  sx = { fontWeight: "bold", fontSize: "1.3rem" },
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
