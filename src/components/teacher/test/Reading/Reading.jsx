import React, { useState, useEffect } from "react";
import QuestionReading from "./QuestionReadingTest";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getTest } from "api/test/TestApi";
import { getTestReading } from "api/test/TestReadingApi";
import InformationTest from "../common/InformationTest";
import QuestionListTest from "./QuestionListTestReading";
import DeleteSubmitTestDialog from "../common/DeleteSubmitTestDialog";
function ReadingTest() {
  const location = useLocation();
  const { state } = location;
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [version, setVersion] = useState(0);
  const [submitTestIds,setSubmitTestIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTest(state.id);
        if (data) {
          setTest(data);
          setSubmitTestIds(data?.submitTestIds);
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
  }, [state.id, version]);


  //delete submit test 
  const [openDialogDeleteSubmitTest, setOpenDialogDeleteSubmitTest] = useState(false);


  const [dialogAction, setDialogAction] = React.useState(null);
  const handleDialogAction = (action) => {
    if (action === "cancel") {
      setDialogAction("cancel"); 
    } else if (action === "confirm") {
      setDialogAction("confirm");
    }
    setVersion((prevData) => (prevData || 0) + 1);
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
    if (submitTestIds?.length > 0) {
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
    try {
      let fetchedData;
      if (question.id === '') {
        fetchedData = question;
      } else {
        fetchedData = await getTestReading(question.id);
      }

      fetchedData.test = test;
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
      <Box sx={{ display: "flex", marginBottom: "2%", alignItems: "stretch",marginRight: "5%",
  marginLeft: "5%", }}>
        <Box sx={{ flex: 4, minHeight: 0 }}>
          <InformationTest data={test} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest} />
        </Box>
        <Box sx={{ marginLeft: "2%", flex: 6, minHeight: 0 }}>
        <QuestionListTest   data={test} handleRowClick={handleRowClick} setQuestionCurrent = { setQuestionData} setVersion = { setVersion} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest} 
          questionCurrent ={questionData}
          />
        </Box>
      </Box>
      {questionData &&  (
        <QuestionReading key={`${questionData.id}-${version}`} data={questionData} handleReading={handleRowClick} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest} />
      )}
    </Box>


  );
}

export default ReadingTest;
