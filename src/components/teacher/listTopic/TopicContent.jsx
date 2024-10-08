import { Button, CardMedia, Grid2, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TopicContent({ topic, path }) {
  const navigate = useNavigate();
  function handleDetailsClick() {
    navigate(`/teacher/${path}/${topic.id}`);
  }
  return (
    <Grid2 container alignItems={"center"}>
      <Grid2 size={2} textAlign={"center"}>
        <Typography variant="body" fontSize={"1.5rem"}>
          {topic.serial}
        </Typography>
      </Grid2>
      <Grid2 size={3} textAlign={"center"}>
        <Typography variant="body" fontSize={"1.5rem"}>
          {topic.title}
        </Typography>
      </Grid2>
      <Grid2
        size={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <CardMedia
          component="img"
          image={topic.image}
          sx={{ width: "100px", height: "100px" }}
        />
      </Grid2>
      <Grid2 size={2} textAlign={"center"}>
        <Typography
          variant="body"
          fontSize={"1rem"}
          textTransform={"capitalize"}
          sx={{
            color: "#000",
            backgroundColor: topic.status === "active" ? "#05FF00" : "#FFF500",
            padding: "0.5rem 1rem",
            borderRadius: "1rem",
          }}
        >
          {topic.status}
        </Typography>
      </Grid2>
      <Grid2 size={2} textAlign={"center"}>
        <Button
          variant="contained"
          sx={{
            color: "#fff",
            backgroundColor: "#000",
            fontSize: "1rem",
            padding: "0.5rem 1rem",
          }}
          onClick={handleDetailsClick}
        >
          Details
        </Button>
      </Grid2>
    </Grid2>
  );
}
