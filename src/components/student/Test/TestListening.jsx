import MainTitle from "./MainTitle";
import OneListeningTest from "./OneListeningTest";
import { Box, Typography, Button } from "@mui/material";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTest } from "api/test/TestApi";
import { createSubmitTest } from "../../../api/test/submitTest";
import { fetchUserInfo } from "../../../api/user/userService";
import { createSubmitTestListeningAnswer } from "../../../api/test/submitTestListeningAnswer";
import { commentListeningQuestion } from "../../../api/test/commentTest";
import CountdownTimer from "./common/CountdownTimer";
import { openDB, saveData, getData, deleteData } from './common/IndexDB';
import { styled } from "@mui/material/styles";
const DurationContainer = styled(Box)(({ theme }) => ({
  background: "#E0F7FA",
  borderRadius: "20px",
  fontSize: "14px",
  float:'right',
  padding: "1.5rem 3rem",
  border: '1px solid #000000',
  display: 'flex',
  justifyContent: 'center', 
  alignItems: 'center',
}));
function TestListening() {
  const location = useLocation();
  const { state } = location;
  const [datatest, setdatatest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const title = datatest ? datatest.type : "";
  const [status, setStatus] = useState("Testting");
  const data = datatest?.testListenings;
  const [indexVisible, setIndexVisible] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const [duration, setDuration] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [storeName, setStoreName] = useState(null);
  const audioRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTest(state.id);
        if (data) {
          setdatatest(data);
          setDuration(data.duration);
          setStoreName( "MyStore" + data.id);
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
  }, [state.id]);

  useEffect(() => {
    if (datatest != null) {
      openDB("MyDatabase", "MyStore" + datatest.id)
        .then((db) => {
          getData(db, "MyStore" + storeName)
            .then((data) => {
              if (data?.answers) {
                setAnswers(data.answers); 
                setDuration(data.duration);
                
              } 
            })
            .catch((error) => {
              console.error("Error fetching answers:", error);
            });
            getData(db, "MyStore" + datatest.id, "duration")
            .then((data) => {
              if (data?.duration) {
                setDuration(data.duration); 
                console.log(data);
                
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
        saveData(db, storeName, { id: storeName,  answers });
      }).catch((error) => {
        console.error("Error saving answers to the database:", error);
      });
    } 
  }, [answers]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const onAudioEnd = () => {
    if (data.length > indexVisible + 1) {
      setIndexVisible(indexVisible + 1);
    }
  };
  const handleSubmit = async () => {
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
      submitTestListeningAnswers: [],
    };

    try {
      const commentPromises = datatest.testListenings.flatMap((listening) =>
        listening.questions.map(async (question) => {
          const userAnswerId = answers[question.id];

          if (!userAnswerId) {
            submitTest.submitTestListeningAnswers.push({
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
              const commentResponse = await commentListeningQuestion({
                questionContent: question.content,
                listeningTranscript: listening.transcript,
                answers: question.answers.map((ans) => ans.content),
                userAnswer: userAnswer.content,
              });

              const comment =
                commentResponse && commentResponse.comment
                  ? commentResponse.comment
                  : "No comment available";

              submitTest.submitTestListeningAnswers.push({
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
      const saveAnswerPromises = submitTest.submitTestListeningAnswers.map(
        (answer) => {
          answer.submitTestId = savedSubmitTest.id;
          return createSubmitTestListeningAnswer(answer).catch((error) => {
            console.error("Error saving answer:", error);
          });
        }
      );

      await Promise.all(saveAnswerPromises);
      deleteData('MyDatabase', 'MyStore'+datatest.id);
      const state = {
        id: savedSubmitTest.id,
        testId: datatest.id,
      };
      navigate("/student/history-test/listening", { state });
    } catch (error) {
      console.error("Error creating submitTest:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateScore = () => {
    let totalQuestions = 0;
    let score = 0;

    datatest?.testListenings.forEach((data) => {
      totalQuestions += data.questions.length;
    });

    const pointPerQuestion = 100 / totalQuestions;
    datatest?.testListenings.forEach((data) => {
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
  <MainTitle
    title={datatest.type}
    bg="https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media"
  />
  <Box sx={{ marginLeft: "5%", marginRight: "5%" }}>

    <Box
      sx={{
        display: "flex",
        justifyContent: "right", 
        alignItems: "center",
    
      }}
    >
      <DurationContainer>
        <Typography align="center">Time remaining:</Typography>
        <Typography align="center" sx={{ marginLeft: "1rem" }}>
          {datatest && (
            <CountdownTimer
              duration={duration}
              handleSubmit={handleSubmit}
              dbName={"MyDatabase"}
              storeName={storeName}
            />
          )}
        </Typography>
      </DurationContainer>
    </Box>

    <Box
      sx={{
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            mx: 2,
            background: "#E0F7FA",
            padding: "0.5rem 2rem",
            textAlign: "center",
            fontSize: "1rem",
            fontFamily: "Roboto",
            fontWeight: "500",
          }}
        >
          {indexVisible + 1}/{data.length}
        </Typography>
      </Box>
    </Box>

  
    <Box
      sx={{
        display: "flex",
        marginBottom: "1rem",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            border: "1px solid black",
            borderRadius: "1rem",
            padding: "0.5rem",
            width: "100%",
          }}
        >
          <OneListeningTest
            onelistening={data[indexVisible]}
            audioRef={audioRef}
            title={title}
            onAudioEnd={onAudioEnd}
            answers={answers}
            setAnswers={setAnswers}
          />
        </Box>
      </Box>
    </Box>

    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        sx={{
          border: "0.0001rem solid black",
          borderRadius: "1rem",
          background: "#00796B",
          color: "white",
          textAlign: "center",
          marginBottom: "2%",
          padding: "1rem 2rem",
        }}
        onClick={handleSubmit}
      >
        SUBMIT
      </Button>
    </Box>
  </Box>
</Box>

  );
}

function IntroduceTest({ setStatus, datatest }) {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
          width: "80vh",
          textAlign: "center",
          border: "0.2rem solid",
          padding: "20px",
          borderRadius: "2rem",
          backgroundColor: "#f9f9f9",
          margin: "5%",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {datatest.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Duration: {datatest.duration} minutes
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ACCD0A",
            "&:hover": { backgroundColor: "#8CAB0A" },
          }}
          onClick={() => setStatus("Testing")}
        >
          Start {datatest.question}
        </Button>
      </Box>
    </Box>
  );
}

function TestingListening({ audioRef, datatest, title, duration}) {
 

  return (
    <>
      
    </>
  );
}

export default TestListening;
