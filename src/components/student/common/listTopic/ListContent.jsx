import {
  Stack,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid2,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useColor from "shared/color/Color";

function ListContent({ list }) {
  const color = useColor();
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`${id}`);
  };
  return (
    <Stack spacing={4} sx={{ paddingX: "5%" }}>
      <Grid2 container spacing={4} justifyContent="center">
        {list.map((content) => (
          <Grid2
            key={content.id}
            xs={12}
            sm={6}
            md={6}
            lg={6}
            size={6}
            onClick={() => handleClick(content.id)}
            sx={{
              overflow: "visible",
              cursor: "pointer",
              transition: "all 0.5s",
              ":hover": {
                transform: "scale(1.05)",
                boxShadow: `0 0 10px 5px ${color.Color2_1}`,
              },
            }}
          >
            <Card sx={{ display: "flex", height: "250px" }}>
              <CardMedia
                component="img"
                sx={{ width: 250, objectFit: "cover" }}
                image={content.image}
                alt={content.title}
              />
              <CardContent
                sx={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingBottom: "1rem",
                  height: "200px",
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ marginBottom: "0.5rem" }}
                >
                  {content.title}
                </Typography>
                <Typography variant="body2" sx={{ paddingBottom: "1rem" }}>
                  {content.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
}

export default ListContent;
