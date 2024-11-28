import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { getListTest } from "api/test/listTestApi";
import {
  handleNext,
  handlePrev,
  handleTestClick,
} from "./common/HandlePracticeTestSlider";
import "./PracticeTestSlider.css";
import { useAuth } from "security/AuthContext";

const PracticeTestSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth(); // Lấy trạng thái đăng nhập
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlides = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const data = await getListTest(1, "MIXING");
        const formattedSlides = data.content.map((item, index) => ({
          id: item.id,
          type: item.type,
          title: item.title,
          Duration: item.duration || "Duration Unknown",
          imgSrc:
            index % 2 === 0
              ? "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Ftest1.jpg?alt=media"
              : "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Ftest2.jpg?alt=media",
        }));
        setSlides(formattedSlides);
      } catch (error) {
        console.error("Error fetching slides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, [isAuthenticated]);

  return (
    <Box className="slider-container">
      <Typography variant="h4" className="slider-title">
        Some tests you can try
      </Typography>

      {/* Hiển thị ảnh nếu chưa đăng nhập */}
      {!isAuthenticated && (
        <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Flogin_first.png?alt=media"
            alt="Login First"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
      )}

      {/* Hiển thị slider nếu đã đăng nhập */}
      {isAuthenticated && (
        <>
          <Box
            className="slider"
            style={{
              transform: `translateX(-${currentSlide * (100 / 3)}%)`,
            }}
          >
            {slides.map((slide) => (
              <Box
                key={slide.id}
                className="slide"
                onClick={() => handleTestClick(slide, navigate)}
                style={{ cursor: "pointer" }}
              >
                <Box className="card-container">
                  <img
                    src={slide.imgSrc}
                    alt={slide.title}
                    className="card-image"
                  />
                  <Box className="card-content">
                    <Typography variant="h6">{slide.title}</Typography>
                    <Typography>Duration: {slide.Duration}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Button
            className="prev-button"
            onClick={() => handlePrev(currentSlide, setCurrentSlide)}
            disabled={currentSlide === 0}
          >
            &#10094;
          </Button>
          <Button
            className="next-button"
            onClick={() =>
              handleNext(currentSlide, setCurrentSlide, slides.length)
            }
            disabled={currentSlide >= slides.length - 3}
          >
            &#10095;
          </Button>
        </>
      )}
    </Box>
  );
};

export default PracticeTestSlider;
