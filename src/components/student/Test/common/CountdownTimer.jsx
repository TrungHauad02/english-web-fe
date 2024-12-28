import React, { useState, useEffect } from "react";
import { openDB, saveData, getData, } from "./IndexDB";
import { toast } from "react-toastify";

const CountdownTimer = ({ duration, handleSubmit, dbName, storeName, isSubmitting }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  const calculateEndTime = (durationInMinutes) => Math.floor(Date.now() / 1000) + durationInMinutes * 60;

  const autoSubmit = () => {
    if (!isSubmitting) {
      handleSubmit();
      toast.info("Time's up! The assignment has been automatically submitted.");
    }
  };

  const saveEndTime = async (db, endTime) => {
    await saveData(db, storeName, { id: storeName, endTime });
    setTimeLeft(endTime - Math.floor(Date.now() / 1000));
  };

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
          autoSubmit();
        }
      } else {
        if (duration <= 0) {
          setTimeLeft(0);
          autoSubmit();
          return;
        }
        const endTime = calculateEndTime(duration);
        await saveEndTime(db, endTime);
      }
    } catch (error) {
      console.error("Error initializing timer:", error);
      const endTimeFallback = calculateEndTime(duration);
      try {
        const db = await openDB(dbName, storeName);
        await saveEndTime(db, endTimeFallback);
      } catch (saveError) {
        console.error("Error saving fallback timer data:", saveError);
      }
    }
  };

  useEffect(() => {
    initializeTimer();
  }, [dbName, storeName, duration, handleSubmit]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || isSubmitting) return;

    let submitted = false;
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;

        if (newTime <= 0 && !submitted) {
          clearInterval(timer);
          submitted = true;
          autoSubmit();
          return 0;
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitting]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div aria-live="polite">
      {timeLeft === null ? (
        <span>Loading...</span>
      ) : timeLeft > 0 ? (
        <span>{formatTime(timeLeft)}</span>
      ) : (
        <span>00:00</span>
      )}
    </div>
  );
};

export default CountdownTimer;
