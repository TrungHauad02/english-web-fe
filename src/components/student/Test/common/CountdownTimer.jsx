import React, { useState, useEffect } from "react";
import { openDB, saveData, getData } from "./IndexDB";
import { toast } from "react-toastify";

const CountdownTimer = ({ duration, handleSubmit, dbName, storeName }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const initializeTimer = async () => {
    try {
      const db = await openDB(dbName, storeName);
      const data = await getData(db, storeName, storeName);

      if (data?.endTime) {
        const now = Math.floor(Date.now() / 1000);
        const remainingTime = data.endTime - now;

        if (remainingTime > 0) {
          setTimeLeft(remainingTime);
        } else {
          setTimeLeft(0);
          if (!hasSubmitted) {
            handleSubmit();
            setHasSubmitted(true);
            toast.info("Time's up! The assignment has been automatically submitted.");
          }
        }
      } else {
        const endTime = Math.floor(Date.now() / 1000) + duration * 60;
        await saveData(db, storeName, { id: storeName, endTime });
        setTimeLeft(duration * 60);
      }
    } catch (error) {
      console.error("Error initializing timer:", error);
    
    }
  };

  useEffect(() => {
    initializeTimer();
  }, [dbName, storeName, duration, handleSubmit, hasSubmitted]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;

        if (newTime <= 0) {
          clearInterval(timer);
          if (!hasSubmitted) {
            handleSubmit();
            setHasSubmitted(true);
            toast.info("Hết giờ! Bài tập đã được nộp tự động.");
          }
          return 0; 
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleSubmit, hasSubmitted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div aria-live="polite">
      {timeLeft === null
        ? "Loading..."
        : timeLeft > 0
        ? formatTime(timeLeft)
        : "00:00"}
    </div>
  );
};

export default CountdownTimer;
