import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,CircularProgress
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MainTitle from "../MainTitle";
import BtnPreviousNextContentTest from "../common/BtnPreviousNextContentTest";
import useColor from "shared/color/Color";
import { getTest } from "api/test/TestApi";
import { createSubmitTest } from "../../../../api/test/submitTest";
import { createSubmitTestWriting } from "../../../../api/test/submitTestWriting";
import ContentTestWriting from "./ContentTestWriting";
import { useLocation, useNavigate } from "react-router-dom";
import CountdownTimer from "../common/CountdownTimer";
import { openDB, saveData, getData, deleteData } from '../common/IndexDB';
import { scoreTestWriting } from "api/feature/scoreTestWriting/scoreTestWriting";
import ErrorMessage from "../common/ErrorMessage";
const DurationContainer = styled(Box)(({ theme }) => ({
  background: "#E0F7FA",
  borderRadius: "20px",
  fontSize: "14px",
  float:'right',
  padding: "1.5rem 3rem",
  marginRight: theme.spacing(2),
  border: '1px solid #000000',
  display: 'flex',
  justifyContent: 'center', 
  alignItems: 'center',
}));

function TestWriting() {
  const [indexVisible, setIndexVisible] = useState(0);
  const [answers, setAnswers] = useState({});
  const [duration, setDuration] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [test, setTest] = useState(null);
  const [storeName, setStoreName] = useState(null);
  const color = useColor();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!state || !state.id) {
      navigate("/student/tests");
      return;
    }
    const fetchData = async () => {
      try {
        const data = await getTest(state.id,"ACTIVE");
        if (data) {
          
          const updateDataTest = (data) => {
            let serialCounter = 1; 
            data.testWritings = data.testWritings.map((item) =>
              item.serial !== undefined
                ? { ...item, serial: serialCounter++ }
                : item
            );
        
            return data;
          };
          const updatedData = updateDataTest(data);
          setTest(updatedData);
          setDuration(data.duration); 
          setStoreName("MyStore" + data.id)
        } else {
          setTest(null);
        }
      } catch (err) {

      } finally {
        setLoading(false);
 
      }
    };
  
    fetchData();
  }, [state?.id]);
  
  
  useEffect(() => {
    if (test != null) {
      openDB("MyDatabase", "MyStore" + test.id)
        .then((db) => {
          getData(db, "MyStore" + test.id,storeName)
            .then((data) => {
              if (data?.answers) {
                console.log(data?.answers);
                
                setAnswers(data.answers);           
              } else {
                console.log("No answers found in IndexedDB");
                setAnswers({}); 
              }
            })
            .catch((error) => {
              console.error("Error fetching answers:", error);
            });
        })
        .catch((error) => {
          console.error("Error accessing IndexedDB:", error);
        });
    }

  }, [test?.id]);
  
  useEffect(() => {
    if (test != null) {
      openDB("MyDatabase", storeName).then((db) => {
        saveData(db, "MyStore" + test.id, { id: storeName, answers });
      }).catch((error) => {
        console.error("Error saving answers to the database:", error);
      });
    }
  }, [answers]);
  

  const handleBtnSubmit = async () => {
    setIsSubmitting(true);
 
    try {
      const userId = sessionStorage.getItem('userId');
      const vietnamTime = new Date().toLocaleString("en-CA", { timeZone: "Asia/Ho_Chi_Minh", hour12: false }).replace(", ", "T");
  
      let submitTest = {
        id: "",
        testId: test.id,
        userId: userId,
        score: 0,
        status: "ACTIVE",
        submitTime: vietnamTime,
        submitTestWritings: [],
      };
      let scoreTest = 0;
  
      let pointPerQuestion = 100 / test?.testWritings?.length;

      let comment = "No comment available. You haven't completed this question yet";
      let content = "No content available. You haven't completed this question yet";
  
      for (let writing of test?.testWritings) {
        let score = 0;
    
        if (answers[writing.id]?.essay !== null && answers[writing.id]?.essay !== '' && answers[writing.id]?.essay !== undefined) {
         
          let dataScore = await scoreTestWriting(answers[writing.id]?.essay, writing.content, pointPerQuestion);
          console.log(dataScore);
          
          score = dataScore.score.split("/")[0];
          comment = dataScore.comment;
          scoreTest = scoreTest + +score;
          content = answers[writing.id]?.essay;
  
        }
        submitTest.submitTestWritings.push({
          id: "",
          submitTestId: "",
          testWritingId: writing.id,
          content: content,
          comment: comment,
          score: parseFloat(score),
          status: "ACTIVE",
        });
      }
      submitTest.score = scoreTest;
      const createdSubmitTest = await createSubmitTest(submitTest);

      submitTest.id = createdSubmitTest.id;
      if (submitTest?.submitTestWritings?.length > 0) {
     
        for (let i = 0; i < submitTest.submitTestWritings.length; i++) {
          submitTest.submitTestWritings[i].submitTestId = createdSubmitTest.id;
        }
      
        await Promise.all(
          submitTest.submitTestWritings.map(async (writing) => {
            await createSubmitTestWriting(writing);
          })
        );
      } else {
        console.warn("No submitTestWritings available to process.");
      }

      
      const state = {
        id: createdSubmitTest.id,
        testId: test.id,
      };
      deleteData('MyDatabase', 'MyStore'+test.id);
      navigate("/student/history-test/writing", { state });
    
  
    } catch (error) {
      console.error("Error creating submitTest:", error);
    } finally {
      
      
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{color: color.Color2}} />
      </Box>
    );
  }
  
  return (
    <Box>
      {isSubmitting && (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          zIndex: 1000,
        }}
      >
        <CircularProgress sx={{color: color.Color2}} />
      </Box>
    )}
      <MainTitle
        title="Writing"
        bg={
          "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media"
        }
      />
      {test?.testWritings?.length > 0 ? (
      <>
        <DurationContainer sx={{ marginRight: "5%", fontWeight: "bold" }}>
          <Typography align="center">Time remaining:</Typography>
          <Typography align="center" sx={{ marginLeft: "1rem" }}>
            <CountdownTimer
              duration={duration}
              handleSubmit={handleBtnSubmit}
              dbName={"MyDatabase"}
              storeName={storeName}
              isSubmitting={isSubmitting}
            />
          </Typography>
        </DurationContainer>

        <Box sx={{ marginLeft: "5%", marginRight: "5%", marginBottom: "1rem" }}>
          <BtnPreviousNextContentTest
            indexVisible={indexVisible}
            setIndexVisible={setIndexVisible}
            sumContent={test.testWritings.length}
          />
          <ContentTestWriting
            test={test.testWritings[indexVisible]}
            handleBtnSubmit={handleBtnSubmit}
            answers={answers}
            setAnswers={setAnswers}
          />
        </Box>
      </>
    ) : (
        <ErrorMessage message={"The teacher has not added the test information yet"}/>
    )}
  </Box>
      
  );
}

export default TestWriting;