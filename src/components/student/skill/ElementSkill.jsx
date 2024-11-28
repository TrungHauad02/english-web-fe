import { Card, CardMedia, Grid2, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ElementSkill({ skill, isLeft }) {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/student/${skill.path}`);
  };
  return (
    <Grid2 container direction={isLeft ? "row" : "row-reverse"} spacing={12}>
      <Grid2 item size={6}>
        <Card sx={{ position: "relative" }} onClick={handleOnClick}>
          <CardMedia
            image={skill.img}
            title={skill.name}
            sx={{ height: "200px", width: "100%" }}
          />
          <Typography
            variant="h5"
            sx={{ position: "absolute", top: "0", left: "0", margin: "2rem" }}
            textTransform={"uppercase"}
            fontWeight={"bold"}
          >
            {skill.name}
          </Typography>
        </Card>
      </Grid2>
      <Grid2 item size={6} alignContent={"center"}>
        <Typography>{skill.description}</Typography>
      </Grid2>
    </Grid2>
  );
}
