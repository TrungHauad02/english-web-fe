import { Box, Typography,CircularProgress } from "@mui/material";
import MainTitle from "../../MainTitle";
import HistoryTestSpeakingContent from "./HistoryTestSpeakingContent";
import React, { useState, useEffect } from "react";
import ScoreGrid from "./ScoreGrid";
import { useLocation, useNavigate } from "react-router-dom";
import { getHistoryTest } from "../common/getHistoryTest";
import useColor from "shared/color/Color";
function HistoryTestSpeaking() {
  const location = useLocation();
  const { state } = location;
  const [test, setTest] = useState(null);
  const [historyTest, setHistoryTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [focusSerial, setFocusSerial] = useState(null);
  const navigate = useNavigate();
  const color = useColor();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getHistoryTest(state, navigate);
        if (result) {
          const { test, submitTest } = result;
  
          if (test) {
            const updateDataTest = (data) => {
              let serialCounter = 1;
              return {
                ...data,
                testSpeakings: data.testSpeakings.map((item) => ({
                  ...item,
                  questions: item.questions.map((question) => ({
                    ...question,
                    serial: question.serial !== undefined ? serialCounter++ : question.serial,
                  })),
                })),
              };
            };
  
            const updatedData = updateDataTest(test);
            setTest(updatedData); 
          }
  
          if (submitTest) {
            setHistoryTest(submitTest); 
          }
        }
      } catch (err) {
        setError("Failed to fetch test data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state, state?.id, state?.testId]);

  function startsWithHttp(url) {
    return url.startsWith("http");
  }

  const handleTestAgain = () => {
    const state = {
      id: test.id,
    };
    navigate("/student/test/speaking", { state });
  };
  const evaluateSpeakingTestResults = () => {
    return test?.testSpeakings?.flatMap((testSpeaking) => {
      return testSpeaking.questions.map((question) => {
        const submit = historyTest?.submitTestSpeakings?.find(
          (submitSpeaking) =>
            submitSpeaking.testSpeakingQuestionId === question.id
        );
        return startsWithHttp(submit?.content) ? 1 : -1;
      });
    });
  };

  const handleItemClick = (serial) => {
    setFocusSerial(serial);
  };

  const getListSerialQuestion = () => {
    const serials = [];
    test?.testSpeakings?.forEach((testSpeaking) =>
      testSpeaking.questions.forEach((question) => {
        serials.push(question.serial);
      })
    );
    return serials;
  };

  if (loading) {
    return <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      zIndex: 1000,
    }}
  >
    <CircularProgress sx={{color: color.Color2}} />
  </Box>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box>
      <MainTitle
        title="Speaking"
        bg="https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media"
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginRight: "5%",
          marginLeft: "5%",
          marginTop: "2%",
        }}
      >
        <Box sx={{ flex: 0.8, paddingRight: "1rem" }}>
          {test && historyTest ? (
            <HistoryTestSpeakingContent
              testSpeakingList={test?.testSpeakings}
              submitTestSpeakingList={historyTest?.submitTestSpeakings}
              focusedSerial={focusSerial}
            />
          ) : (
            <Typography>No data available</Typography>
          )}
        </Box>

        <Box sx={{ flex: 0.2 }}>
          <ScoreGrid
            score={historyTest?.score}
            gridData={evaluateSpeakingTestResults()}
            serials={getListSerialQuestion()}
            onItemClick={handleItemClick}
            handleTestAgain={handleTestAgain}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default HistoryTestSpeaking;
