import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './PracticeTestSlider.css';

const slides = [
  {
    title: 'Environment',
    description: 'Description about environment, asd asdasd asdsd',
    imgSrc: './environment.png',
  },
  {
    title: 'Science',
    description: 'Description about science, aksdjh asd asdasd asdsd',
    imgSrc: './environment.png',
  },
  {
    title: 'History',
    description: 'Description about history, aksdjh asd asdasd asdsd',
    imgSrc: './environment.png',
  },
  {
    title: 'Mathematics',
    description: 'Description about mathematics, asd asdasd asdsd',
    imgSrc: './environment.png',
  },
  {
    title: 'Geography',
    description: 'Description about geography,  asd asdasd asdsdcá',
    imgSrc: './environment.png',
  },
];

const PracticeTestSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 3) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <Box className="slider-container">
      <Typography variant="h4" className="slider-title">
        Some practice test you can try
      </Typography>
      <Box className="slider" style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}>
        {slides.map((slide, index) => (
          <Box key={index} className="slide">
            <Box className="card-container">
              <img src={slide.imgSrc} alt={slide.title} className="card-image" />
              <Box className="card-content">
                <Typography variant="h6">{slide.title}</Typography>
                <Typography>{slide.description}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Button className="prev-button" onClick={handlePrev} disabled={currentSlide === 0}>
        &#10094;
      </Button>
      <Button className="next-button" onClick={handleNext} disabled={currentSlide >= slides.length - 3}>
        &#10095;
      </Button>
    </Box>
  );
};

export default PracticeTestSlider;
