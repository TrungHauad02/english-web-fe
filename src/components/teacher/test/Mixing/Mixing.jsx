import InformationTest from "../common/InformationTest";
import QuestionListTest from "../common/QuestionListTest";
import QuestionVocabulary from "../common/QuestionVocabulary";
import QuestionListening from "../common/QuestionListening";
import React, { useState, useEffect } from "react";
import QuestionReading from "../common/QuestionReading";
import QuestionWriting from "../common/QuestionWriting";
import QuestionSpeaking from "../common/QuestionSpeaking";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useLocation,useNavigate } from "react-router-dom";
import { getTest } from "api/test/TestApi";
import { getTestReading } from "api/test/TestReadingApi";
import { getTestListening } from "api/test/TestListeningApi";
import { getTestSpeaking } from "api/test/TestSpeakingApi";
import { getTestMixingQuestion } from "api/test/TestMixingQuestionApi";
import { getTestWriting } from "api/test/TestWritingApi";
import DeleteSubmitTestDialog from "../common/DeleteSubmitTestDialog";
function Mixing() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState("");
  const [questionData, setQuestionData] = useState();
  const [version,setVersion] = useState(0);

  useEffect(() => {
    if (!state || !state.id) {
      navigate("/teacher/test");
      return;
    }
    const fetchData = async () => {
      try {
        
        const data = await getTest(state.id);
        if (data) {
          setTest(data);
    
          
        } else {
          setTest(null); 
        }
      } catch (err) {
        setError("Failed to fetch test data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state?.id,version]);

 
  const [openDialogDeleteSubmitTest, setOpenDialogDeleteSubmitTest] = useState(false);
  const [dialogCallbacks, setDialogCallbacks] = useState(null);

  const confirmDeletion = () => {
    return new Promise((resolve) => {
      setOpenDialogDeleteSubmitTest(true);
  
      const onCloseDialog = (isConfirmed) => {
        setOpenDialogDeleteSubmitTest(false);
        resolve(isConfirmed);
      };
  
      setDialogCallbacks({ onCloseDialog });
    });
  };

  const BooleanDeleteSubmitTest = async () => {
    if (test.isSubmitTest) {
      const isConfirmed = await confirmDeletion(test); 
      if (!isConfirmed) {
        return false; 
      }
      test.isSubmitTest=false;
    }
    return true; 
  };
  
  
  const handleRowClick = async (question) => {
    try {
      let fetchedData;
      switch (question.type) {
        case "GRAMMAR":
          if(question.id==='')
            fetchedData = question;
          else
            fetchedData = await getTestMixingQuestion(question.id);
          break;
        case "VOCABULARY":
          if(question.id==='')
            fetchedData = question;
          else
            fetchedData = await getTestMixingQuestion(question.id);
          break;
        case "LISTENING":
          if(question.id==='')
            fetchedData = question;
          else
          {
            fetchedData = await getTestListening(question.id);
          }
           
          break;
        case "READING":
          if(question.id==='')
            fetchedData = question;
          else
            fetchedData = await getTestReading(question.id);
          break;
        case "SPEAKING":
          if(question.id==='')
            fetchedData = question;
          else
            fetchedData = await getTestSpeaking(question.id);
          break;
        case "WRITING":
          if(question.id==='')
            fetchedData = question;
          else
            fetchedData = await getTestWriting(question.id);
          break;
        default:
          fetchedData = null;
      }
      fetchedData.test = test;


      setQuestionData(fetchedData);
      setType(question.type);
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

  const renderQuestionComponent = () => {
    if (!questionData) return null; 
    switch (type) {
      case "VOCABULARY":
        return (
          <QuestionVocabulary key={`${questionData.id}-${version}`} question={questionData} handleQuestion = {handleRowClick} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest}
          setQuestionCurrent = { setQuestionData}
           />
        );
      case "GRAMMAR":
        return (
          <QuestionVocabulary key={`${questionData.id}-${version}`} question={questionData} handleQuestion = {handleRowClick} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest}
          setQuestionCurrent = { setQuestionData}/>
        );
      case "LISTENING":
        return <QuestionListening key={`${questionData.id}-${version}`} data={questionData} handleListening = {handleRowClick} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest}
        setQuestionCurrent = { setQuestionData}/>;
      case "READING":
        return <QuestionReading key={`${questionData.id}-${version}`} data={questionData} handleReading = {handleRowClick} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest}
        setQuestionCurrent = { setQuestionData} />;
      case "WRITING":
        return <QuestionWriting key={`${questionData.id}-${version}`} data={questionData}
        handleWriting = {handleRowClick} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest}
        setQuestionCurrent = { setQuestionData} />;
      case "SPEAKING":
        return (
          <QuestionSpeaking key={`${questionData.id}-${version}`} initialData={questionData}  handleSpeaking = {handleRowClick} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest} 
          setQuestionCurrent = { setQuestionData}/>
        );
      default:
        return null;
    }
  };
  

  return (
    <Box
      sx={{
        marginBottom: "2%",
        marginTop: "2%", 
        marginRight: "5%",marginLeft: "5%", 
      }}
    >
      <DeleteSubmitTestDialog
        open={openDialogDeleteSubmitTest}
        testDelete={test}
        dialogCallbacks={dialogCallbacks}
      />;
      <Box sx={{ display: "flex", marginBottom: "2%", alignItems: "stretch", }}>
        <Box sx={{ flex: 4, minHeight: 0 }}>
          <InformationTest data={test} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest}/>
        </Box>
        <Box sx={{ marginLeft: "2%", flex: 6, minHeight: 0 }}>
          <QuestionListTest   data={test} handleRowClick={handleRowClick} setQuestionCurrent = { setQuestionData} setVersion = { setVersion} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest} 
          questionCurrent ={questionData}
          />
        </Box>
      </Box>
      <Box  sx={{
        marginTop: "3rem", 
      }}>
      {renderQuestionComponent()}
      </Box>
    </Box>
  );
}

export default Mixing;
