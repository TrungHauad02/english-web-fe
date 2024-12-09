import MainTitle from "../MainTitle";
import OneListeningTest from "./OneListeningTest";
import { Box, Typography, Button,CircularProgress } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTest } from "api/test/TestApi";
import { createSubmitTest } from "../../../../api/test/submitTest";
import { fetchUserInfo } from "../../../../api/user/userService";
import { createSubmitTestListeningAnswer } from "../../../../api/test/submitTestListeningAnswer";
import { commentListeningQuestion } from "../../../../api/test/commentTest";
import CountdownTimer from "../common/CountdownTimer";
import { openDB, saveData, getData, deleteData } from "../common/IndexDB";
import { styled } from "@mui/material/styles";
const DurationContainer = styled(Box)(({ theme }) => ({
  background: "#E0F7FA",
  borderRadius: "20px",
  fontSize: "14px",
  float: "right",
  padding: "1.5rem 3rem",
  border: "1px solid #000000",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
function TestListening() {
  const location = useLocation();
  const { state } = location;
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const title = test ? test.type : "";
  const data = test?.testListenings;
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
        const data = await getTest(state.id, "ACTIVE");
        if (data) {
          const updateDataTest = (data) => {
            let serialCounter = 1;
            data.testListenings = data.testListenings.map((item) => ({
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

          setTest(updatedData);
          setDuration(data.duration);
          setStoreName("MyStore" + data.id);
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
  }, [state.id]);

  useEffect(() => {
    if (test != null) {
      openDB("MyDatabase", "MyStore" + test.id)
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
          getData(db, "MyStore" + test.id, "duration")
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
  }, [test?.id]);

  useEffect(() => {
    if (test != null) {
      openDB("MyDatabase", storeName)
        .then((db) => {
          saveData(db, storeName, { id: storeName, answers });
        })
        .catch((error) => {
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
    const vietnamTime = new Date()
      .toLocaleString("en-CA", { timeZone: "Asia/Ho_Chi_Minh", hour12: false })
      .replace(", ", "T");
    let submitTest = {
      id: "",
      testId: test.id,
      userId: user.id,
      score: score,
      status: "ACTIVE",
      submitTime: vietnamTime,
      submitTestListeningAnswers: [],
    };

    try {
      const commentPromises = test.testListenings.flatMap((listening) =>
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
      deleteData("MyDatabase", "MyStore" + test.id);
      const state = {
        id: savedSubmitTest.id,
        testId: test.id,
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

    test?.testListenings.forEach((data) => {
      totalQuestions += data.questions.length;
    });

    const pointPerQuestion = 100 / totalQuestions;
    test?.testListenings.forEach((data) => {
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
        title={test.type}
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
              {test && (
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
                oneListening={data[indexVisible]}
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



export default TestListening;
