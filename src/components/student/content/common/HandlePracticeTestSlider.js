import { useNavigate } from "react-router-dom";

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
  
  export const handleTestClick = (test, navigate) => {
    let path = "/student/tests/mixing"; 
    navigate(path, { state: { id: test.id } });
  };