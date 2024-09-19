import React from 'react';
import Box from '@mui/material/Box'; 
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

const images = ["/banner1.png", "/banner2.jpg"];
const icon = "/icon.png";

const ImageSlider = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Box sx={{ width: "100%", margin: "auto", padding: "0", position: "relative" }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image}
            alt={`Slide ${index}`}
            sx={{
              width: "100%",     
              maxHeight: "40rem", 
              objectFit: "cover" 
            }}
          />
        ))}
      </Slider>
      <Box
        sx={{
          position: "absolute",
          bottom: '4px',
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          padding: "1.5rem",
          borderRadius: "0.5rem 0 0 0",
          display: "flex",
          flexDirection: "column", 
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center", 
            marginBottom: "0.5rem", 
          }}
        >
          <Box
            component="img"
            src={icon}
            alt="Icon"
            sx={{
              width: "3rem",
              height: "3rem",
              marginRight: "0.5rem",
            }}
          />
          <Box
            sx={{
              fontWeight: "bold",
              fontFamily: "Roboto",
              fontSize: "1.5rem"
            }}
          >
            IMPROVE YOUR ENGLISH SKILL WITH US
          </Box>
        </Box>
        <Box
        sx={{
            fontWeight: "bold",
            fontFamily: "Roboto",
            fontSize: "1rem"
          }}
          >
        Learn English online and improve your skills through our high-quality courses and resources, <br/>quality courses and resources
        </Box>
      </Box>
    </Box>
  );
};

export default ImageSlider;
