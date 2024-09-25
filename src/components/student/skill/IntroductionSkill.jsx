import { Box, CardMedia, Grid2, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export default function IntroductionSkill() {
  const introduction =
    "Welcome to the Skills section! Here, you'll find resources and exercises designed to enhance your English language proficiency across various skills, including listening, speaking, reading, and writing. Our interactive tools and engaging content will help you practice and develop your abilities, allowing you to communicate effectively and confidently in English. Dive in and start your learning journey today!";

  const images = ["/environment.png", "/bg_grammar.png", "/bg_reading.png"];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  return (
    <Grid2
      container
      direction={"row"}
      spacing={2}
      sx={{ marginX: "5%", marginY: "2rem" }}
    >
      <Grid2 size={6}>
        <Typography variant="h6" component={"p"}>
          {introduction}
        </Typography>
      </Grid2>
      <Grid2
        size={6}
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%", position: "relative" }}
      >
        <Grid2 item>
          <Box sx={{ textAlign: "center", width: "auto" }}>
            <IconButton
              sx={{
                position: "absolute",
                top: "40%",
                left: "25%",
                zIndex: 1,
                color: "#B8AF92",
              }}
              onClick={handlePrev}
            >
              <ChevronLeft sx={{ fontSize: 40 }} />
            </IconButton>

            <CardMedia
              sx={{ height: "200px", width: "200px", margin: "auto" }}
              image={images[currentImageIndex]}
              title="environment"
            />

            <IconButton
              sx={{
                position: "absolute",
                top: "40%",
                right: "25%",
                zIndex: 1,
                color: "#B8AF92",
              }}
              onClick={handleNext}
            >
              <ChevronRight sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
