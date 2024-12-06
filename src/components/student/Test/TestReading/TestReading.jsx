import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import MainTitle from "../MainTitle";
import OneReadingTest from "./OneReadingTest";
import React, { useState, useEffect } from "react";
import BtnPreviousNextContentTest from "../common/BtnPreviousNextContentTest";
import { useLocation, useNavigate } from "react-router-dom";
import { getTest } from "api/test/TestApi";
import { createSubmitTest } from "../../../../api/test/submitTest";
import { fetchUserInfo } from "../../../../api/user/userService";
import { createSubmitTestReadingAnswer } from "../../../../api/test/submitTestReadingAnswer";
import {
  commentReadingQuestion,
} from "../../../../api/test/commentTest";
import CountdownTimer from "../common/CountdownTimer";
import { openDB, saveData, getData, deleteData } from '../common/IndexDB';


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


function TestReading() {
  const [indexVisible, setIndexVisible] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const [renderKey, setRenderKey] = useState(0);
  const location = useLocation();
  const { state } = location;
  const [datatest, setdatatest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const title = datatest ? datatest.type : "";
  const [storeName, setStoreName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTest(state.id,"ACTIVE");
        if (data) {
       
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
  
          const updatedData = updateDataTest(data);
     
          setdatatest(updatedData);
        



          setDuration(data.duration); 
          setStoreName("MyStore" + data.id)
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
  }, [state?.id]);
  
  useEffect(() => {
    if (datatest != null) {
      openDB("MyDatabase", "MyStore" + datatest.id)
        .then((db) => {
          getData(db, "MyStore" + datatest.id,storeName)
            .then((data) => {
              if (data?.answers) {
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

  }, [datatest?.id]);
  
  useEffect(() => {
    if (datatest != null) {
      openDB("MyDatabase", storeName).then((db) => {
        saveData(db, "MyStore" + datatest.id, { id: storeName, answers });
      }).catch((error) => {
        console.error("Error saving answers to the database:", error);
      });
    }
  }, [answers]);
  
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
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>{error}</Typography>
      </Box>
    );
  }

  const handlebtnSubmit = async () => {
    setIsSubmitting(true);
    const score = calculateScore();
    let user = await fetchUserInfo();
    const vietnamTime = new Date().toLocaleString("en-CA", { timeZone: "Asia/Ho_Chi_Minh", hour12: false }).replace(", ", "T");
    let submitTest = {
      id: "",
      testId: datatest.id,
      userId: user.id,
      score: score,
      status: "ACTIVE",
      submitTime: vietnamTime,
      submitTestReadingAnswers: [],
    };

    try {
      const commentPromises = datatest.testReadings.flatMap((reading) =>
        reading.questions.map(async (question) => {
          const userAnswerId = answers[question.id];

          if (!userAnswerId) {
            submitTest.submitTestReadingAnswers.push({
              id: "",
              submitTestId: "",
              questionId: question.id,
              answerId: "",
              comment: "User did not answer the question",
              status: "ACTIVE",
            });
            return;
          }

          const userAnswer = question.answers.find(
            (answer) => answer.id === userAnswerId
          );

          if (userAnswer) {
            try {
              const commentResponse = await commentReadingQuestion({
                questionContent: question.content,
                readingContent: reading.content,
                answers: question.answers.map((ans) => ans.content),
                userAnswer: userAnswer.content,
              });

              const comment =
                commentResponse && commentResponse.comment
                  ? commentResponse.comment
                  : "No comment available";

              submitTest.submitTestReadingAnswers.push({
                id: "",
                submitTestId: "",
                questionId: question.id,
                answerId: userAnswer.id,
                comment: comment,
                status: "ACTIVE",
              });
            } catch (error) {
              console.error("Error fetching comment for question:", error);
            }
          }
        })
      );

      await Promise.all(commentPromises);

      const savedSubmitTest = await createSubmitTest(submitTest);
      const saveAnswerPromises = submitTest.submitTestReadingAnswers.map(
        (answer) => {
          answer.submitTestId = savedSubmitTest.id;
          return createSubmitTestReadingAnswer(answer).catch((error) => {
            console.error("Error saving answer:", error);
          });
        }
      );

      await Promise.all(saveAnswerPromises);

      const state = {
        id: savedSubmitTest.id,
        testId: datatest.id,
      };
      deleteData('MyDatabase', 'MyStore'+datatest.id);
      navigate("/student/history-test/reading", { state });
    } catch (error) {
      console.error("Error creating submitTest:", error);
    } finally {
      
      setIsSubmitting(false);
    }
  };

  const calculateScore = () => {
    let totalQuestions = 0;
    let score = 0;

    datatest.testReadings.forEach((data) => {
      totalQuestions += data.questions.length;
    });

    const pointPerQuestion = 100 / totalQuestions;
    datatest.testReadings.forEach((data) => {
      data.questions.forEach((question) => {
        const correctAnswer = question.answers.find(
          (answer) => answer.isCorrect
        );
        if (correctAnswer && answers[question.id] === correctAnswer.id) {
          score += pointPerQuestion;
        }
      });
    });

    return Math.round(score * 100) / 100;
  };

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
          <CircularProgress />
        </Box>
      )}
      <MainTitle
        title="Reading"
        bg={
          "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media"
        }
      />
      <DurationContainer sx={{ marginRight: "5%" ,fontWeight: 'bold'  }} elevation={1}>
        <Typography align="center" >
        Time remaining: 
        </Typography>
        <Typography align="center" sx={{marginLeft:'1rem'}} >
        {
      datatest && 
      <CountdownTimer
      duration={duration}
      handleSubmit={handlebtnSubmit}
      dbName={"MyDatabase"}
      storeName={storeName}
    />
     }
        </Typography>
      </DurationContainer>
      <BtnPreviousNextContentTest
        indexVisible={indexVisible}
        setIndexVisible={setIndexVisible}
        sumcontent={datatest.testReadings.length}
      />
      <Box
        sx={{
          marginRight: "5%",
          marginLeft: "5%",
          display: "flex",
          marginTop: "2%",
        }}
      >
        <OneReadingTest
          key={renderKey}
          onereading={datatest.testReadings[indexVisible]}
          handlebtnSubmit={handlebtnSubmit}
          title={title}
          answers={answers}
          setAnswers={setAnswers}
        />
      </Box>
    </Box>
  );
}

export default TestReading;
