import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import MainTitle from "../../MainTitle";
import HistoryTestSpeakingContent from "./HistoryTestSpeakingContent";
import React, { useState, useEffect } from "react";
import ScoreGrid from "./ScoreGrid";
import { useLocation, useNavigate } from "react-router-dom";
import { getTest } from "api/test/TestApi";
import { getSubmitTest } from "api/test/submitTest";

const DurationContainer = styled(Paper)(({ theme }) => ({
  background: "#FFF4CC",
  borderRadius: "20px",
  fontSize: "14px",
  float: "right",
  marginRight: "5%",
  padding: theme.spacing(2),
}));

function HistoryTestSpeaking() {
  const [indexVisible, setIndexVisible] = useState(0);
  const location = useLocation();
  const { state } = location;
  const [test, setTest] = useState(null);
  const [historyTest, setHistoryTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [focusSerial, setFocusSerial] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const testResult =  await getTest(state.testId,"ACTIVE");
        const historyTestResult = await getSubmitTest(state.id);

        if (testResult) {
          const updateDataTest = (data) => {
            let serialCounter = 1; 
            data.testSpeakings = data.testSpeakings.map((item) => ({
              ...item,
              questions: item.questions.map((question) =>
                question.serial !== undefined
                  ? { ...question, serial: serialCounter++ }
                  : question
              ),
            }));
            return data;
          };
  
          const updatedData = updateDataTest(testResult);
     
          setTest(updatedData);
        }
        if (historyTestResult) {
          setHistoryTest(historyTestResult);
        }
      } catch (err) {
        setError("Failed to fetch test data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state.id, state.testId]);


  function startsWithHttp(url) {

    return url.startsWith('http');
  }

  const score = historyTest?.score;
  const title = test?.type || "";

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
          (submitSpeaking) => submitSpeaking.testSpeakingQuestionId === question.id
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
    return <div>Loading...</div>;
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
