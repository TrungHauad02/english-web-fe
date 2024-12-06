import InformationTest from "../common/InformationTest";
import QuestionListTest from "../common/QuestionListTest";
import QuestionVocabulary from "../common/QuestionVocabulary";
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
import DeleteSubmitTestDialog from "../common/DeleteSubmitTestDialog";
function Mixing() {
  const location = useLocation();
  const { state } = location;
  const [datatest, setdatatest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionUpdate, setQuestionUpdate] = useState();
  const [type, setType] = useState("");
  const [questionData, setQuestionData] = useState();
  const [version,setVersion] = useState(0);
  
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
  }, [state.id, questionUpdate,version]);

  //delete submit test 
  const [openDialogDeleteSubmitTest, setOpenDialogDeleteSubmitTest] = useState(false);
  const [submitTestIds, setSubmitTestIds] = useState([]);

  const [dialogAction, setDialogAction] = React.useState(null);
  const handleDialogAction = (action) => {
    if (action === "cancel") {
      setDialogAction("cancel"); 
    } else if (action === "confirm") {
      setDialogAction("confirm");
    }
    setOpenDialogDeleteSubmitTest(false);
  };
  
  const waitForDialogAction = (getDialogAction, resetDialogAction) => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const action = getDialogAction();
        if (action) {
          clearInterval(interval); 
          resolve(action); 
          resetDialogAction(); 
        }
      }, 100);
    });
  };
  const BooleanDeleteSubmitTest = async () => {
    if (datatest?.submitTestsId?.length > 0) {
      setSubmitTestIds(datatest.submitTestsId);
      setOpenDialogDeleteSubmitTest(true);
  
      const dialogResult = await waitForDialogAction(
        () => dialogAction,
        () => setDialogAction(null)
      );
  
      if (dialogResult === "cancel") {
     
        return false; 
      }
  
      console.log("User confirmed the action.");
      return true; 
    }
  
    console.log("No submitTestsId found.");
    return true; 
  };
  


  const handleRowClick = async (question) => {
    setQuestionUpdate(question);
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
      fetchedData.test = datatest;


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
          <QuestionVocabulary key={`${questionData.id}-${version}`} question={questionData} handleQuestion = {handleRowClick} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest} />
        );
      case "GRAMMAR":
        return (
          <QuestionVocabulary key={`${questionData.id}-${version}`} question={questionData} handleQuestion = {handleRowClick} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest}/>
        );
      case "LISTENING":
        return <QuestionListening key={`${questionData.id}-${version}`} data={questionData} handleListening = {handleRowClick} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest}/>;
      case "READING":
        return <QuestionReading key={`${questionData.id}-${version}`} data={questionData} handleReading = {handleRowClick} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest} />;
      case "WRITING":
        return <QuestionWriting key={`${questionData.id}-${version}`} data={questionData}
        handleWriting = {handleRowClick} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest} />;
      case "SPEAKING":
        return (
          <QuestionSpeaking key={`${questionData.id}-${version}`} initialData={questionData}  handleSpeaking = {handleRowClick} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest}/>
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
      }}
    >
      <DeleteSubmitTestDialog
        open={openDialogDeleteSubmitTest}
        onClose={handleDialogAction} 
        submitTestIds={submitTestIds}
        content={`Are you sure you want to delete ${submitTestIds?.length || 0} history users of this test?`}
      />
      <Box sx={{ display: "flex", marginBottom: "2%", alignItems: "stretch", marginRight: "5%",
        marginLeft: "5%", }}>
        <Box sx={{ flex: 4, minHeight: 0 }}>
          <InformationTest data={datatest} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest}/>
        </Box>
        <Box sx={{ marginLeft: "2%", flex: 6, minHeight: 0 }}>
          <QuestionListTest data={datatest} handleRowClick={handleRowClick} setQuestionUpdate = { setQuestionUpdate} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest} />
        </Box>
      </Box>
      {renderQuestionComponent()}
    </Box>
  );
}

export default Mixing;
