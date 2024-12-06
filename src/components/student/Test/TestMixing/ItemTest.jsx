import React, { useState, useCallback, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import ItemTitleTest from "./ItemTitleTest";
import Vocabulary from "./Vocabulary";
import Grammar from "./Grammar";
import Reading from "./Reading";
import Listening from "./Listening";
import Writing from "./Writing";
import Speaking from "./Speaking";
import SerialGrid from "./SerialGrid/SerialGrid";
import { createSubmitTest } from "api/test/submitTest";
import { fetchUserInfo } from "api/user/userService";
import { uploadFile } from "api/feature/uploadFile/uploadFileService";
import { createSubmitTestReadingAnswer } from "api/test/submitTestReadingAnswer";
import { createSubmitTestMixingAnswer } from "api/test/submitTestMixingAnswer";
import { createSubmitTestListeningAnswer } from "api/test/submitTestListeningAnswer";
import { createSubmitTestSpeaking } from "api/test/submitTestSpeaking";
import { createSubmitTestWriting } from "api/test/submitTestWriting";
import {
  commentMixingQuestion,
  commentReadingQuestion,
  commentListeningQuestion,
} from "../../../../api/test/commentTest";
import { scoreTestWriting } from "api/feature/scoreTestWriting/scoreTestWriting";
import { getSpeechToText } from "api/feature/stt/SpeechToTextService";
import { useNavigate } from "react-router-dom";
import { openDB, saveData, getData, deleteData } from "../common/IndexDB";

const ItemTest = ({ title, datatest, setStatus, setSubmitTest }) => {
  const storeName = "MyStore" + datatest.id;
  const navigate = useNavigate();
  const DataTestMixing = [
    {
      title: "Vocabulary",
      questions:
        datatest?.testMixingQuestions.filter(
          (question) => question.type === "VOCABULARY"
        ) || [],
      testId: datatest.id,
    },
    {
      title: "Grammar",
      questions:
        datatest?.testMixingQuestions.filter(
          (question) => question.type === "GRAMMAR"
        ) || [],
      testId: datatest.id,
    },
    {
      title: "Reading",
      dataitem: datatest?.testReadings || [],
    },
    {
      title: "Listening",
      dataitem: datatest?.testListenings || [],
    },
    {
      title: "Speaking",
      dataitem: datatest?.testSpeakings || [],
    },
    {
      title: "Writing",
      dataitem: datatest?.testWritings || [],
    },
  ];

  const updateSerialsByOrder = () => {
    let currentSerial = 1;

    const order = [
      "Vocabulary",
      "Grammar",
      "Reading",
      "Listening",
      "Speaking",
      "Writing",
    ];

    order.forEach((title) => {
      const data = DataTestMixing.find((item) => item.title === title);

      if (!data) return;

      if (title === "Vocabulary" || title === "Grammar") {
        data.questions.forEach((question) => {
          if (question.serial !== undefined) {
            question.serial = currentSerial++;
          }
        });
      } else if (
        title === "Reading" ||
        title === "Listening" ||
        title === "Speaking"
      ) {
        data.dataitem.forEach((item) => {
          item.questions.forEach((question) => {
            if (question.serial !== undefined) {
              question.serial = currentSerial++;
            }
          });
        });
      } else if (title === "Writing") {
        data.dataitem.forEach((item) => {
          if (item.serial !== undefined) {
            item.serial = currentSerial++;
          }
        });
      }
    });
  };

  const [answers, setAnswers] = useState({});
  useEffect(() => {
    if (datatest != null) {
      updateSerialsByOrder();
      openDB("MyDatabase", "MyStore" + datatest.id)
        .then((db) => {
          getData(db, "MyStore" + datatest.id, storeName)
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
      openDB("MyDatabase", storeName)
        .then((db) => {
          saveData(db, "MyStore" + datatest.id, { id: storeName, answers });
        })
        .catch((error) => {
          console.error("Error saving answers to the database:", error);
        });
    }
  }, [answers]);

  const getListSerialTest = () => {
    const TitleAndSerials = {
      title: [],
      serials: [],
    };
    DataTestMixing.forEach((data) => {
      if (data.title === "Vocabulary" || data.title === "Grammar") {
        TitleAndSerials.title.push(data.title);
        const serialsForCurrentTitle = [];

        data.questions.forEach((question) => {
          serialsForCurrentTitle.push(question.serial);
        });

        TitleAndSerials.serials.push(serialsForCurrentTitle);
      } else if (
        data.title === "Reading" ||
        data.title === "Listening" ||
        data.title === "Speaking"
      ) {
        TitleAndSerials.title.push(data.title);
        const serialsForCurrentTitle = [];
        data.dataitem.forEach((item) => {
          item.questions.forEach((question) => {
            serialsForCurrentTitle.push(question.serial);
          });
        });

        TitleAndSerials.serials.push(serialsForCurrentTitle);
      } else if (data.title === "Writing") {
        TitleAndSerials.title.push(data.title);
        const serialsForCurrentTitle = [];
        data.dataitem.forEach((item) => {
          serialsForCurrentTitle.push(item.serial);
        });
        TitleAndSerials.serials.push(serialsForCurrentTitle);
      }
    });
    return TitleAndSerials;
  };

  const [focusId, setfocusId] = useState();
  const [activeTab, setActiveTab] = useState(0);
  const TitleAndSerials = getListSerialTest();

  const onItemClick = useCallback(
    (serial) => {
      for (let index = 0; index < TitleAndSerials.title.length; index++) {
        const serials = TitleAndSerials.serials[index];
        console.log(TitleAndSerials);

        if (serials && serials.includes(serial)) {
          setfocusId(serial);
          setActiveTab(index);
          break;
        }
      }
    },
    [TitleAndSerials]
  );
  const [score, setScore] = useState(0);

  const generateGridData = () => {
    return DataTestMixing.flatMap((data) => {
      if (data.title === "Vocabulary" || data.title === "Grammar") {
        return (data.questions || []).map((question) => {
          if (!question || !question.answers) {
            console.log(data.title, "tan", question.id);

            console.warn("Question or answers array is undefined");
            return -1;
          }

          const correctAnswer = question.answers.find(
            (answer) => answer.isCorrect
          );
          const selectedAnswer = answers[question.id];

          if (selectedAnswer === undefined) {
            return -1;
          }
          return correctAnswer && selectedAnswer === correctAnswer.id ? 1 : 0;
        });
      } else if (data.title === "Reading" || data.title === "Listening") {
        return (data.dataitem || []).flatMap((item) => {
          if (!item || !item.questions) {
            console.warn("Item or questions array is undefined");
            return -1;
          }

          return item.questions.map((question) => {
            if (!question || !question.answers) {
              console.warn("Question or answers array is undefined");
              return -1;
            }

            const correctAnswer = question.answers.find(
              (answer) => answer.isCorrect
            );
            const selectedAnswer = answers[question.id];

            if (selectedAnswer === undefined) {
              return -1;
            }
            return correctAnswer && selectedAnswer === correctAnswer.id ? 1 : 0;
          });
        });
      } else if (data.title === "Speaking") {
        return (data.dataitem || []).flatMap((item) => {
          if (!item || !item.questions) {
            console.warn("Item or questions array is undefined");
            return -1;
          }

          return item.questions.map((question) => {
            const selectedAnswer = answers[question.id];

            if (selectedAnswer === undefined) {
              return -1;
            }
            return 1; // Chỉ trả về 1 vì không có correctAnswer để so sánh
          });
        });
      } else if (data.title === "Writing") {
        return (data.dataitem || []).flatMap((item) => {
          const selectedAnswer = answers[item.id];

          if (selectedAnswer === undefined || selectedAnswer.essay === "") {
            return -1;
          }
          return 1;
        });
      } else {
        return [];
      }
    });
  };

  const [gridData, setGridData] = useState(generateGridData());

  useEffect(() => {
    setGridData(generateGridData());
  }, [answers]);

  const [renderKey, setRenderKey] = useState(0);

  const submitTest = async () => {};

  const getDataSubmitTest = async () => {
    let scoreTest = calculateScore();
    let scorePerQuestionSpeaking = 0;
    if (datatest?.testSpeakings?.length > 0) {
      const totalQuestions = datatest.testSpeakings.reduce(
        (sum, speaking) => sum + (speaking.questions?.length || 0),
        0
      );
      scorePerQuestionSpeaking =
        totalQuestions > 0 ? 100 / 6 / totalQuestions : 0;
    }
    let scorePerQuestionWriting = 0;
    if (datatest?.testWritings?.length > 0) {
      scorePerQuestionWriting = 100 / 6 / datatest.testWritings.length;
    }

    const vietnamTime = new Date()
      .toLocaleString("en-CA", { timeZone: "Asia/Ho_Chi_Minh", hour12: false })
      .replace(", ", "T");
    let submitTest = {
      id: "",
      testId: datatest.id,
      userId: "",
      score: "",
      submitTime: vietnamTime,
      status: "ACTIVE",
      submitTestListeningAnswers: [],
      submitTestReadingAnswers: [],
      submitTestWritings: [],
      submitTestSpeakings: [],
      submitTestMixingAnswers: [],
    };

    for (const data of DataTestMixing) {
      if (data.title === "Vocabulary" || data.title === "Grammar") {
        for (const question of data.questions) {
          if (!question || !question.answers) {
            console.warn("Question or answers array is undefined");
            continue;
          }

          const selectedAnswer = answers[question.id];
          let comment =
            "No comment available. You haven't completed this question yet.";
          if (selectedAnswer !== undefined) {
            const answersContentList = question.answers.map(
              (answer) => answer.content
            );
            const userAnswerContent =
              question.answers?.find((answer) => answer.id === selectedAnswer)
                ?.content || "";
            try {
              const request = {
                questionContent: question.content,
                answers: answersContentList,
                userAnswer: userAnswerContent,
              };
              const response = await commentMixingQuestion(request);
              comment = response.comment;
            } catch (error) {
              console.error(
                "Failed to get comment for mixing question:",
                error
              );
            }
          }
          let submitTestMixingAnswer = {
            id: "",
            submitTestId: "",
            questionId: question.id,
            answerId: selectedAnswer !== undefined ? selectedAnswer : "",
            comment: comment,
            status: "ACTIVE",
          };

          submitTest.submitTestMixingAnswers.push(submitTestMixingAnswer);
        }
      } else if (data.title === "Reading" || data.title === "Listening") {
        for (const item of data.dataitem) {
          if (!item || !item.questions) {
            console.warn("Item or questions array is undefined");
            continue;
          }

          for (const question of item.questions) {
            if (!question || !question.answers) {
              console.warn("Question or answers array is undefined");
              continue;
            }

            const selectedAnswer = answers[question.id];
            let submitAnswer = {
              id: "",
              submitTestId: "",
              questionId: question.id,
              answerId: selectedAnswer !== undefined ? selectedAnswer : "",
              comment:
                "No comment available. You haven't completed this question yet.",
              status: "ACTIVE",
            };

            if (selectedAnswer !== undefined) {
              const answersContentList = question.answers.map(
                (answer) => answer.content
              );
              const userAnswerContent =
                question.answers?.find((answer) => answer.id === selectedAnswer)
                  ?.content || "";

              try {
                const request = {
                  questionContent: question.content,
                  answers: answersContentList,
                  userAnswer: userAnswerContent,
                };

                if (data.title === "Reading") {
                  request.readingContent = item.content;
                  const response = await commentReadingQuestion(request);
                  submitAnswer.comment = response.comment;
                } else if (data.title === "Listening") {
                  request.listeningTranscript = item.transcript;
                  const response = await commentListeningQuestion(request);
                  submitAnswer.comment = response.comment;
                }
              } catch (error) {
                console.error(
                  `Failed to get comment for ${data.title.toLowerCase()} question:`,
                  error
                );
              }
            }

            if (data.title === "Reading") {
              submitTest.submitTestReadingAnswers.push(submitAnswer);
            } else if (data.title === "Listening") {
              submitTest.submitTestListeningAnswers.push(submitAnswer);
            }
          }
        }
      } else if (data.title === "Speaking") {
        for (const item of data.dataitem) {
          if (!item || !item.questions) {
            console.warn("Item or questions array is undefined");
            continue;
          }

          for (const question of item.questions) {
            const audiobase64 = answers[question.id];

            let content =
              "No audio available. You haven't completed this question yet.";
            let transcript =
              "No transcipt available. You haven't completed this question yet.";
            let comment =
              "No comment available. You haven't completed this question yet.";
            let score = 0;
            if (audiobase64) {
              const result = await uploadFile(
                "test/speaking",
                question.id.replace(/\s+/g, "_") +
                  "_" +
                  Date.now() +
                  "-" +
                  Math.random().toString(36).substr(2, 9),
                audiobase64
              );
              content = result.url;
              try {
                transcript = (await getSpeechToText(audiobase64)).transcript;
              } catch (error) {
                console.log("Proceeding with the next step...");
              }
              if (transcript !== null && transcript !== "") {
                let dataScore = await scoreTestWriting(
                  transcript,
                  question.content,
                  scorePerQuestionSpeaking
                );
                score = dataScore.score.split("/")[0];
                comment = dataScore.comment;
              }
            }
            scoreTest = scoreTest + +score;
            let submitTestSpeakingQuestion = {
              id: "",
              testSpeakingQuestionId: question.id,
              submitTestId: "",
              score: score,
              content: content,
              explanation: transcript,
              comment: comment,
              status: "ACTIVE",
            };
            submitTest.submitTestSpeakings.push(submitTestSpeakingQuestion);
          }
        }
      } else if (data.title === "Writing") {
        for (const item of data.dataitem) {
          if (!item) {
            console.warn("Item is undefined");
            continue;
          }

          const contentUserWrite = answers[item.id]?.essay;

          let score = 0;
          let comment =
            "No comment available. You haven't completed this question yet";
          let content =
            "No comment available. You haven't completed this question yet";
          if (contentUserWrite) {
            content = contentUserWrite;
            let dataScore = await scoreTestWriting(
              contentUserWrite,
              item.content,
              scorePerQuestionWriting
            );
            score = dataScore.score.split("/")[0];
            comment = dataScore.comment;
          }
          scoreTest = scoreTest + +score;
          let submitWriting = {
            id: "",
            submitTestId: "",
            testWritingId: item.id,
            content: content,
            score: score,
            comment: comment,
            status: "ACTIVE",
          };
          submitTest.submitTestWritings.push(submitWriting);
        }
      }
    }
    submitTest.score = scoreTest;
    return submitTest;
  };

  const handlebtnSubmit = async () => {
    try {
      let user = await fetchUserInfo();
      const submitTest = await getDataSubmitTest();
      submitTest.userId = user.id;

      const response = await createSubmitTest(submitTest);
      const submitTestId = response.id;

      submitTest.submitTestListeningAnswers.forEach(
        (answer) => (answer.submitTestId = submitTestId)
      );
      submitTest.submitTestReadingAnswers.forEach(
        (answer) => (answer.submitTestId = submitTestId)
      );
      submitTest.submitTestSpeakings.forEach(
        (answer) => (answer.submitTestId = submitTestId)
      );
      submitTest.submitTestWritings.forEach(
        (answer) => (answer.submitTestId = submitTestId)
      );
      submitTest.submitTestMixingAnswers.forEach(
        (answer) => (answer.submitTestId = submitTestId)
      );

      await Promise.all([
        Promise.all(
          submitTest.submitTestListeningAnswers.map((answer) =>
            createSubmitTestListeningAnswer(answer)
          )
        ),
        Promise.all(
          submitTest.submitTestReadingAnswers.map((answer) =>
            createSubmitTestReadingAnswer(answer)
          )
        ),
        Promise.all(
          submitTest.submitTestSpeakings.map((answer) =>
            createSubmitTestSpeaking(answer)
          )
        ),
        Promise.all(
          submitTest.submitTestWritings.map((answer) =>
            createSubmitTestWriting(answer)
          )
        ),
        Promise.all(
          submitTest.submitTestMixingAnswers.map((answer) =>
            createSubmitTestMixingAnswer(answer)
          )
        ),
      ]);

      const state = {
        id: submitTestId,
        testId: datatest.id,
      };

      deleteData("MyDatabase", "MyStore" + datatest.id);

      navigate("/student/history-test/mixing", { state });
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  const calculateScore = () => {
    let score = 0;
    const scorePerSection = 100 / 6;

    const calculateSectionScore = (sections, totalQuestions) => {
      const pointPerQuestion = scorePerSection / totalQuestions;
      sections.forEach((section) => {
        section.questions.forEach((question) => {
          const correctAnswer = question.answers.find(
            (answer) => answer.isCorrect
          );
          if (correctAnswer && answers[question.id] === correctAnswer.id) {
            score += pointPerQuestion;
          }
        });
      });
    };

    const totalReadingQuestions = datatest.testReadings.reduce(
      (total, data) => total + data.questions.length,
      0
    );
    const totalListeningQuestions = datatest.testListenings.reduce(
      (total, data) => total + data.questions.length,
      0
    );
    calculateSectionScore(datatest?.testReadings, totalReadingQuestions);
    calculateSectionScore(datatest?.testListenings, totalListeningQuestions);

    const vocabularyQuestions = datatest?.testMixingQuestions.filter(
      (question) => question.TYPE === "VOCABULARY"
    );

    const grammarQuestions = datatest?.testMixingQuestions.filter(
      (question) => question.TYPE === "GRAMMAR"
    );
    calculateSectionScore(
      [{ questions: vocabularyQuestions }],
      vocabularyQuestions.length
    );

    calculateSectionScore(
      [{ questions: grammarQuestions }],
      grammarQuestions.length
    );

    return Math.round(score * 100) / 100;
  };

  return (
    <Grid sx={{ marginBottom: "1rem" }}>
      <Box sx={{}}>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            {DataTestMixing.map((tab, index) => (
              <Box
                key={index}
                sx={{
                  marginRight: "0.5rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "1rem 1rem 0 0",
                  fontWeight: "bold",
                  textAlign: "center",
                  cursor: "pointer",
                  background:
                    activeTab === index
                      ? "linear-gradient(to right, #00796B, #00B8A2)"
                      : "#E0F7FA",
                  color: activeTab === index ? "#FFFFFF" : "#000000",
                  boxShadow:
                    activeTab === index
                      ? "0px 4px 6px rgba(0, 0, 0, 0.2)"
                      : "none",
                  transition: "all 0.3s ease",
                }}
                onClick={() => setActiveTab(index)}
              >
                {tab.title}
              </Box>
            ))}
          </Box>
          <Box sx={{ marginLeft: "auto", display: "flex", marginRight: "20%" }}>
            <ItemTitleTest title={DataTestMixing[activeTab].title} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            width: "80%",
            padding: "2rem",
            border: "1px solid #ccc",
            borderRadius: "1rem",
          }}
        >
          {activeTab === 0 && (
            <Vocabulary
              key={renderKey}
              dataTest={DataTestMixing[activeTab]}
              focusId={focusId}
              title={title}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}
          {activeTab === 1 && (
            <Grammar
              key={renderKey}
              dataTest={DataTestMixing[activeTab]}
              focusId={focusId}
              title={title}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}
          {activeTab === 2 && (
            <Reading
              key={renderKey}
              dataTest={DataTestMixing[activeTab]}
              focusId={focusId}
              title={title}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}
          {activeTab === 3 && (
            <Listening
              key={renderKey}
              dataTest={DataTestMixing[activeTab]}
              focusId={focusId}
              title={title}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}
          {activeTab === 4 && (
            <Speaking
              key={renderKey}
              dataTest={DataTestMixing[activeTab].dataitem}
              focusId={focusId}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}
          {activeTab === 5 && (
            <Writing
              key={renderKey}
              dataTest={DataTestMixing[activeTab]}
              focusId={focusId}
              title={title}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}
        </Box>

        <Box sx={{ width: "20%", marginLeft: "1rem" }}>
          <SerialGrid
            title={DataTestMixing[activeTab].title}
            TitleAndSerials={TitleAndSerials}
            gridData={gridData}
            onItemClick={onItemClick}
            handlebtnSubmit={handlebtnSubmit}
            duration={datatest.duration}
            storeName={storeName}
          />
        </Box>
      </Box>
    </Grid>
  );
};

export default ItemTest;
