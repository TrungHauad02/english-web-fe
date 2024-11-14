import React, { useState, useEffect } from "react";
import QuestionListening from "./QuestionListeningTest";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getTest } from "api/test/TestApi";
import { getTestListening } from "api/test/TestListeningApi";
import InformationTest from "../common/InformationTest";
import QuestionListTest from "./QuestionListTestListening";

function ListeningTest() {
  const location = useLocation();
  const { state } = location;
  const [datatest, setdatatest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [version, setVersion] = useState(0);
  const [questionUpdate, setQuestionUpdate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTest(state.id);
        if (data) {
          setdatatest(data);
        } else {
          setdatatest(null);
        }
      } catch (err) {
        setError("Failed to fetch test data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state.id, version, questionUpdate]);
  
  const handleRowClick = async (question) => {
    setQuestionUpdate(question);
    try {
      let fetchedData;
      if (question.id === '') {
        fetchedData = question;
      } else {
        fetchedData = await getTestListening(question.id);
      }

      fetchedData.test = datatest;
      setQuestionData(fetchedData);
      setVersion((prevData) => (prevData || 0) + 1);
    } catch (err) {
      setError("Failed to fetch question data");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box
      sx={{
        marginRight: "5%",
        marginLeft: "5%",
        marginBottom: "2%",
        marginTop: "2%",
      }}
    >
      <Box sx={{ display: "flex", marginBottom: "2%", alignItems: "stretch" }}>
        <Box sx={{ flex: 4, minHeight: 0 }}>
          <InformationTest data={datatest} />
        </Box>
        <Box sx={{ marginLeft: "2%", flex: 6, minHeight: 0 }}>
          <QuestionListTest data={datatest} handleRowClick={handleRowClick} setQuestionUpdate={setQuestionUpdate} />
        </Box>
      </Box>
      {questionData && (
        <QuestionListening key={`${questionData.id}-${version}`} data={questionData} handleListening={handleRowClick} />
      )}
    </Box>
  );
}

export default ListeningTest;
