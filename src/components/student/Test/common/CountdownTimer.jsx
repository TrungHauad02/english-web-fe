import React, { useState, useEffect } from "react";
import { openDB, saveData, getData } from "./IndexDB";
import { duration } from "@mui/material";
import { Typography } from "@mui/material";
const CountdownTimer = ({ duration, handleSubmit, dbName, storeName }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const initializeTimer = async () => {
      try {
        const db = await openDB(dbName, storeName);
        const data = await getData(db, storeName, storeName);

        if (data?.endTime) {
          const now = Math.floor(Date.now() / 1000);
          const remainingTime = data.endTime - now;
          const duration = remainingTime;
          saveData(db, storeName, { id: storeName, duration });
          if (remainingTime > 0) {
            setTimeLeft(remainingTime);
          } else {
            setTimeLeft(0);
            handleSubmit();
          }
        } else {
          const endTime = Math.floor(Date.now() / 1000) + duration;
          saveData(db, storeName, { id: storeName, endTime });
          setTimeLeft(duration);
        }
      } catch (error) {
        console.error("Error initializing timer:", error);
      }
    };

    initializeTimer();
  }, [dbName, storeName, duration, handleSubmit]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;

        if (newTime <= 0) {
          clearInterval(timer);
          handleSubmit();
          setHasSubmitted(true);
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleSubmit]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
  <>
   {timeLeft === null
        ? "Loading..."
        : timeLeft > 0
        ? formatTime(timeLeft)
        : "Time's up!"}
  </>
     
  
  );
};

export default CountdownTimer;
