import { Card, CardContent, Typography } from "@mui/material";

function Explaination({ explaination, sx }) {
  return (
    <Card sx={sx}>
      <CardContent>
        <Typography variant="h6">Explain:</Typography>
        <Typography variant="body">{explaination}</Typography>
      </CardContent>
    </Card>
  );
}

export default Explaination;
