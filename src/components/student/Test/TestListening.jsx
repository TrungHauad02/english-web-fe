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

function TestListening() {
  const location = useLocation();
  const { state } = location;
  const [datatest, setdatatest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const title = datatest ? datatest.type : "";
  const [status, setStatus] = useState("Begin");

  const audioRef = useRef(null);
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
  }, [state.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box>
      <MainTitle
        title={datatest.type}
        bg="https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media"
      />
      {status === "Begin" ? (
        <IntroduceTest setStatus={setStatus} datatest={datatest} />
      ) : (
        <TestingListening
          audioRef={audioRef}
          datatest={datatest}
          title={title}
          duration={datatest.duration}
        />
      )}
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
          Bài test 1
        </Typography>
        <Typography variant="body1" gutterBottom>
          Thời gian làm bài: {datatest.duration} phút
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ACCD0A",
            "&:hover": { backgroundColor: "#8CAB0A" },
          }}
          onClick={() => setStatus("Testing")}
        >
          Bắt đầu {datatest.question}
        </Button>
      </Box>
    </Box>
  );
}

function TestingListening({ audioRef, datatest, title, duration }) {
  const data = datatest.testListenings;
  const [indexVisible, setIndexVisible] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onAudioEnd = () => {
    if (data.length > indexVisible + 1) {
      setIndexVisible(indexVisible + 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const score = calculateScore();
    let user = await fetchUserInfo();

    let submitTest = {
      id: "",
      testId: datatest.id,
      userId: user.id,
      score: score,
      status: "ACTIVE",
      submitTime: new Date().toISOString(),
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
    <>
      <Box
        sx={{
          background: "#FFF4CC",
          borderRadius: "1rem",
          fontSize: "1rem",
          float: "right",
          marginRight: "5%",
          width: "10%",
          padding: "0.5rem 1rem",
        }}
      >
        <CountdownTimer duration={duration} />
      </Box>
      <Box
        sx={{
          marginTop: "5%",
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          display: "flex",
          justifyContent: "center",
          marginLeft: "5%",
          marginRight: "5%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            mt: 5,
            marginLeft: "5%",
            width: "45%",
            justifyContent: "center",
          }}
        >
          <Box
            variant="body1"
            sx={{
              mx: 2,
              background: "#FFF4CC",
              padding: "0.5rem 2rem",
              textAlign: "center",
              alignContent: "center",
              fontSize: "1rem",
              fontFamily: "Roboto",
              fontWeight: "500",
            }}
          >
            {indexVisible + 1}/{data.length}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          marginLeft: "5%",
          marginRight: "5%",
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
            background: "#FFD984",
            color: "black",
            textAlign: "center",
            marginBottom: "2%",
            padding: "1rem 2rem",
          }}
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      </Box>
    </>
  );
}

function CountdownTimer({ duration }) {
  const [timeLeft, setTimeLeft] = useState(() => duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Typography align="center">
      <strong>Time remaining:</strong>
      <br />
      {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
    </Typography>
  );
}

export default TestListening;
