import { Typography } from "@mui/material";

function HeaderTypography({children, variant = "h6", component = "h2", sx = {fontWeight: 'bold',fontSize: '1rem'}}) {
  return (
    <Typography 
        variant={variant}   
        component={component}
        sx={sx}>
        {children}
    </Typography>
  );
}

export default HeaderTypography;