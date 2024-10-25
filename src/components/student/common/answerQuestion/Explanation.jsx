import { Card, CardContent, Typography } from "@mui/material";

function Explanation({ explanation, sx }) {
  return (
    <Card sx={sx}>
      <CardContent>
        <Typography variant="h6">Explain:</Typography>
        <Typography variant="body">{explanation}</Typography>
      </CardContent>
    </Card>
  );
}

export default Explanation;
