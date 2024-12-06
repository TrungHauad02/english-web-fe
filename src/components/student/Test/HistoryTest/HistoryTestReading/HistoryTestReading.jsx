import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import MainTitle from "../../MainTitle";
import HistoryOneReading from "./HistoryOneReading";
import React, { useState, useEffect } from "react";
import BtnPreviousNextContentTest from "../../common/BtnPreviousNextContentTest";
import { useLocation } from "react-router-dom";
import { getTest } from "api/test/TestApi";
import { getSubmitTest } from "api/test/submitTest";
import { useNavigate } from "react-router-dom";
const DurationContainer = styled(Paper)(({ theme }) => ({
  background: "#FFF4CC",
  borderRadius: "20px",
  fontSize: "14px",
  float: "right",
  marginRight: "5%",
  padding: theme.spacing(2),
}));

function HistoryTestReading() {
  const [indexVisible, setIndexVisible] = useState(0);
  const location = useLocation();
  const { state } = location;
  const [test, setTest] = useState(null);
  const [historyTest, setHistoryTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const testResult =  await getTest(state.testId,"ACTIVE");
        const historyTestResult = await getSubmitTest(state.id);

        if (testResult) {
          const updateDataTest = (data) => {
            let serialCounter = 1; 
            data.testReadings = data.testReadings.map((item) => ({
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const score = historyTest?.score;
  const title = test?.type || "";

  const handleTestAgain = () => {
    const state = {
      id: test.id,
    };
    navigate("/student/test/reading", { state });
  };

  return (
    <Box>
      <MainTitle
        title="Reading"
        bg="https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media"
      />
      <DurationContainer
        sx={{
          marginRight: "5%",
          textAlign: "center",
          backgroundColor: "#E0F7FA",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #E0C080",
        }}
        elevation={2}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
            color: "#5A5A5A",
          }}
        >
          Score: {score}
        </Typography>
      </DurationContainer>

      <BtnPreviousNextContentTest
        indexVisible={indexVisible}
        setIndexVisible={setIndexVisible}
        sumcontent={test?.testReadings?.length || 0}
      />
      <Box
        sx={{
          marginRight: "5%",
          marginLeft: "5%",
          display: "flex",
          marginTop: "2%",
        }}
      >
        {test && historyTest ? (
          <HistoryOneReading
            onereading={test.testReadings[indexVisible]}
            title={title}
            dataSubmitTest={historyTest.submitTestReadingAnswers}
            handleTestAgain={handleTestAgain}
          />
        ) : (
          <Typography>No data available</Typography>
        )}
      </Box>
    </Box>
  );
}

export default HistoryTestReading;
