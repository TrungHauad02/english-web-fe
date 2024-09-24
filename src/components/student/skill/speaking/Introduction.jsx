import { Card, CardContent, Grid2, Typography } from "@mui/material";

function Introduction({ content }) {
  return (
    <Grid2
      container
      justifyContent={"space-between"}
      sx={{ marginX: "5%", marginY: "2rem" }}
    >
      <Grid2 item size={9} alignContent={"center"}>
        <Typography
          variant="body"
          sx={{ fontSize: "1.5rem", lineHeight: "2rem" }}
        >
          {content}
        </Typography>
      </Grid2>
      <Grid2
        container
        size={3}
        paddingLeft={"5rem"}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <img src="/headphone.png" alt="listening" width="200px" />
        <Card sx={{ backgroundColor: "#DDF179" }}>
          <CardContent>
            <Typography textAlign={"center"} fontWeight={"bold"}>
              Time to put in your headphone and stay focus
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}

export default Introduction;
