import InformationTest from "../common/InformationTest";
import QuestionListTest from "../common/QuestionListTest";
import QuestionVocabulary from "../common/QuestionVocabulary";
import QuestionGrammar from "../common/QuestionGrammar";
import QuestionListening from "../common/QuestionListening";
import React, { useState, useEffect } from "react";
import QuestionReading from "../common/QuestionReading";
import QuestionWriting from "../common/QuestionWriting";
import QuestionSpeaking from "../common/QuestionSpeaking";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getTest } from "api/test/TestApi";
import { getTestReading } from "api/test/TestReadingApi";
import { getTestListening } from "api/test/TestListeningApi";
import { getTestSpeaking } from "api/test/TestSpeakingApi";
import { getTestMixingQuestion } from "api/test/TestMixingQuestionApi";
import { getTestWriting } from "api/test/TestWritingApi";

function Mixing() {
  const location = useLocation();
  const { state } = location;
  const [datatest, setdatatest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  }, [state.id, questionUpdate]);

  const [type, setType] = useState("");
  const [dataitemtest, setdataitemtest] = useState();
  const [questionData, setQuestionData] = useState(); // State to hold the question data

  const handleRowClick = async (question) => {
    setType(question.type);
    console.log(question);

    if (question.new) {
      setQuestionUpdate(question);
    }
    setdataitemtest(question);
    try {
      let fetchedData;
      switch (question.type) {
        case "GRAMMAR":
          fetchedData = await getTestMixingQuestion(question.id);
          break;
        case "VOCABULARY":
          fetchedData = await getTestMixingQuestion(question.id);
          break;
        case "LISTENING":
          fetchedData = await getTestListening(question.id);
          break;
        case "READING":
          fetchedData = await getTestReading(question.id);
          break;
        case "SPEAKING":
          fetchedData = await getTestSpeaking(question.id);
          break;
        case "WRITING":
          fetchedData = await getTestWriting(question.id);
          break;
        default:
          fetchedData = null;
      }
      console.log(fetchedData);

      setQuestionData(fetchedData);
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

  const renderQuestionComponent = () => {
    if (!questionData) return null; 

    switch (type) {
      case "VOCABULARY":
        return (
          <QuestionVocabulary key={questionData.id} question={questionData} />
        );
      case "GRAMMAR":
        return (
          <QuestionGrammar key={questionData.id} question={questionData} />
        );
      case "LISTENING":
        return <QuestionListening key={questionData.id} data={questionData} />;
      case "READING":
        return <QuestionReading key={questionData.id} data={questionData} />;
      case "WRITING":
        return <QuestionWriting key={questionData.id} data={questionData} />;
      case "SPEAKING":
        return (
          <QuestionSpeaking key={questionData.id} initialData={questionData} />
        );
      default:
        return null;
    }
  };

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
          <QuestionListTest data={datatest} handleRowClick={handleRowClick} setQuestionUpdate = { setQuestionUpdate} />
        </Box>
      </Box>
      {renderQuestionComponent()}
    </Box>
  );
}

export default Mixing;
