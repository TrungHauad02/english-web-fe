import React, { useState, useEffect } from "react";
import QuestionWriting from "./QuestionWritingTest";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getTest } from "api/test/TestApi";
import { getTestWriting } from "api/test/TestWritingApi";
import InformationTest from "../common/InformationTest";
import QuestionListTest from "./QuestionListTestWriting";
import DeleteSubmitTestDialog from "../common/DeleteSubmitTestDialog";

function WritingTest() {
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
      if (question.id === '') {
        fetchedData = question;
      } else {
        fetchedData = await getTestWriting(question.id);
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
      <Box sx={{ display: "flex", marginBottom: "2%", alignItems: "stretch",    marginRight: "5%",marginLeft: "5%", }}>
        <Box sx={{ flex: 4, minHeight: 0 }}>
          <InformationTest data={datatest}  BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest}/>
        </Box>
        <Box sx={{ marginLeft: "2%", flex: 6, minHeight: 0 }}>
          <QuestionListTest data={datatest} handleRowClick={handleRowClick} setQuestionUpdate={setQuestionUpdate} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest} />
        </Box>
      </Box>
      {questionData && (
        <QuestionWriting key={`${questionData.id}-${version}`} data={questionData} handleWriting={handleRowClick} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest} />
      )}
    </Box>
  );
}

export default WritingTest;
