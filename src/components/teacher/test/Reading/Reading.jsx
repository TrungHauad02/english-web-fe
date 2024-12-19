import React, { useState, useEffect } from "react";
import QuestionReading from "./QuestionReadingTest";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useLocation,useNavigate } from "react-router-dom";
import { getTest } from "api/test/TestApi";
import { getTestReading } from "api/test/TestReadingApi";
import InformationTest from "../common/InformationTest";
import QuestionListTest from "./QuestionListTestReading";
import DeleteSubmitTestDialog from "../common/DeleteSubmitTestDialog";
function ReadingTest() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [version, setVersion] = useState(0);

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
  }, [state?.id, version]);


  //delete submit test 
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
        marginRight: "5%",
        marginLeft: "5%", 
        marginBottom: "2%",
        marginTop: "2%",
      }}
    >
       <DeleteSubmitTestDialog
        open={openDialogDeleteSubmitTest}
        testDelete={test}
        dialogCallbacks={dialogCallbacks}
      />
      <Box sx={{ display: "flex", marginBottom: "2%", alignItems: "stretch",}}>
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
        <QuestionReading key={`${questionData.id}-${version}`} data={questionData} handleReading={handleRowClick} BooleanDeleteSubmitTest = {BooleanDeleteSubmitTest} 
        setQuestionCurrent = { setQuestionData}/>
      )}
    </Box>


  );
}

export default ReadingTest;
