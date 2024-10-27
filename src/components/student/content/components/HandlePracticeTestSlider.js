export const handleNext = (currentSlide, setCurrentSlide, slideCount) => {
    if (currentSlide < slideCount - 3) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  export const handlePrev = (currentSlide, setCurrentSlide) => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  