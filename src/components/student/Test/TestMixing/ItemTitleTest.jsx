import { Box,Typography } from "@mui/material";

function ItemTitleTest({ title }) {
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #00796B 0%, #00B8A2 100%)",
        textAlign: "center",

        padding: "1rem 2rem",
        fontSize: "24px",
        borderRadius: "2rem 2rem 0 0",
        textTransform: "uppercase",
        color: "#FFFFFF",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",

    
      }}
    >
      {title}
    </Box>
  );
}

export default ItemTitleTest;
