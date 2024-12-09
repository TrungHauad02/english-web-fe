import React, { useState, useCallback, useEffect } from "react";
import { Box, Grid, CircularProgress } from "@mui/material";
import ItemTitleTest from "./ItemTitleTest";
import Vocabulary from "./Vocabulary";
import Grammar from "./Grammar";
import Reading from "./Reading";
import Listening from "./Listening";
import Writing from "./Writing";
import Speaking from "./Speaking";
import SerialGrid from "./SerialGrid/SerialGrid";
import { createSubmitTest } from "api/test/submitTest";
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
} from "api/test/commentTest";
import { scoreTestWriting } from "api/feature/scoreTestWriting/scoreTestWriting";
import { getSpeechToText } from "api/feature/stt/SpeechToTextService";
import { useNavigate } from "react-router-dom";
import { openDB, saveData, getData, deleteData } from "../common/IndexDB";

const ItemTest = ({ title, test }) => {
  const storeName = "MyStore" + test.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const DataTestMixing = [
    {
      title: "Vocabulary",
      questions:
        test?.testMixingQuestions.filter(
          (question) => question.type === "VOCABULARY"
        ) || [],
      testId: test.id,
    },
    {
      title: "Grammar",
      questions:
        test?.testMixingQuestions.filter(
          (question) => question.type === "GRAMMAR"
        ) || [],
      testId: test.id,
    },
    {
      title: "Reading",
      dataItem: test?.testReadings || [],
    },
    {
      title: "Listening",
      dataItem: test?.testListenings || [],
    },
    {
      title: "Speaking",
      dataItem: test?.testSpeakings || [],
    },
    {
      title: "Writing",
      dataItem: test?.testWritings || [],
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
        data.dataItem.forEach((item) => {
          item.questions.forEach((question) => {
            if (question.serial !== undefined) {
              question.serial = currentSerial++;
            }
          });
        });
      } else if (title === "Writing") {
        data.dataItem.forEach((item) => {
          if (item.serial !== undefined) {
            item.serial = currentSerial++;
          }
        });
      }
    });
  };

  const [answers, setAnswers] = useState({});
  useEffect(() => {
    if (test != null) {
      updateSerialsByOrder();
      openDB("MyDatabase", "MyStore" + test.id)
        .then((db) => {
          getData(db, "MyStore" + test.id, storeName)
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
  }, [test?.id]);

  useEffect(() => {
    if (test != null) {
      openDB("MyDatabase", storeName)
        .then((db) => {
          saveData(db, "MyStore" + test.id, { id: storeName, answers });
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
        data.dataItem.forEach((item) => {
          item.questions.forEach((question) => {
            serialsForCurrentTitle.push(question.serial);
          });
        });

        TitleAndSerials.serials.push(serialsForCurrentTitle);
      } else if (data.title === "Writing") {
        TitleAndSerials.title.push(data.title);
        const serialsForCurrentTitle = [];
        data.dataItem.forEach((item) => {
          serialsForCurrentTitle.push(item.serial);
        });
        TitleAndSerials.serials.push(serialsForCurrentTitle);
      }
    });
    return TitleAndSerials;
  };

  const [focusId, setFocusId] = useState();
  const [activeTab, setActiveTab] = useState(0);
  const TitleAndSerials = getListSerialTest();

  const onItemClick = useCallback(
    (serial) => {
      for (let index = 0; index < TitleAndSerials.title.length; index++) {
        const serials = TitleAndSerials.serials[index];
        console.log(TitleAndSerials);

        if (serials && serials.includes(serial)) {
          setFocusId(serial);
          setActiveTab(index);
          break;
        }
      }
    },
    [TitleAndSerials]
  );
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
        return (data.dataItem || []).flatMap((item) => {
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
        return (data.dataItem || []).flatMap((item) => {
          if (!item || !item.questions) {
            console.warn("Item or questions array is undefined");
            return -1;
          }

          return item.questions.map((question) => {
            const selectedAnswer = answers[question.id];

            if (selectedAnswer === undefined) {
              return -1;
            }
            return 1;
          });
        });
      } else if (data.title === "Writing") {
        return (data.dataItem || []).flatMap((item) => {
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

  const getDataSubmitTest = async () => {
    let scoreTest = calculateScore();
    let scorePerQuestionSpeaking = 0;
    if (test?.testSpeakings?.length > 0) {
      const totalQuestions = test.testSpeakings.reduce(
        (sum, speaking) => sum + (speaking.questions?.length || 0),
        0
      );
      scorePerQuestionSpeaking =
        totalQuestions > 0 ? 100 / 6 / totalQuestions : 0;
    }
    let scorePerQuestionWriting = 0;
    if (test?.testWritings?.length > 0) {
      scorePerQuestionWriting = 100 / 6 / test.testWritings.length;
    }

    const vietnamTime = new Date()
      .toLocaleString("en-CA", { timeZone: "Asia/Ho_Chi_Minh", hour12: false })
      .replace(", ", "T");
    let submitTest = {
      id: "",
      testId: test.id,
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
        for (const item of data.dataItem) {
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
        for (const item of data.dataItem) {
          if (!item || !item.questions) {
            console.warn("Item or questions array is undefined");
            continue;
          }

          for (const question of item.questions) {
            const audioBase64 = answers[question.id];
            let content = "No audio available. You haven't completed this question yet.";
            let transcript = "No transcript available. You haven't completed this question yet."
            let comment = "No comment available. You haven't completed this question yet."
          let score = 0;
        if (audioBase64) {
          const result = await uploadFile(
            "test/speaking",
            question.id.replace(/\s+/g, "_") + "_" + Date.now() + "-" + Math.random().toString(36).substr(2, 9),
            audioBase64,
          );
          content = result.url;
          try {
  
            transcript = (await getSpeechToText(audioBase64, 2)).transcript;
          } catch (error) {
        
          
          }
          if(transcript!==null && transcript!=='')
          {

            let  dataScore= await scoreTestWriting(transcript, question.content,scorePerQuestionSpeaking);
            score = dataScore.score.split("/")[0];;
            comment = dataScore.comment;
          }
          
        }
        scoreTest=scoreTest+ +score;
        let submitTestSpeakingQuestion = {
          id: '',
          testSpeakingQuestionId: question.id,
          submitTestId: '',
          score: score,
          content: content,
          transcript: transcript,
          comment: comment,
          status: "ACTIVE"
        }
            submitTest.submitTestSpeakings.push(submitTestSpeakingQuestion);
          }
        }
      } else if (data.title === "Writing") {
        for (const item of data.dataItem) {
          if (!item) {
            console.warn("Item is undefined");
            continue;
          }

          const contentUserWrite = answers[item.id]?.essay;

          let score = 0;
          let comment =
            "No comment available. You haven't completed this question yet";
          let content =
            "No content available. You haven't completed this question yet";
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
  const handleBtnSubmit = async () => {
    setIsSubmitting(true);
    let submitTestId;

    try {
      const userId = sessionStorage.getItem('userId');
      const submitTest = await getDataSubmitTest();
      submitTest.userId = userId;

      const response = await createSubmitTest(submitTest);
      submitTestId = response.id;

      [
        ...submitTest.submitTestListeningAnswers,
        ...submitTest.submitTestReadingAnswers,
        ...submitTest.submitTestSpeakings,
        ...submitTest.submitTestWritings,
        ...submitTest.submitTestMixingAnswers,
      ].forEach((answer) => (answer.submitTestId = submitTestId));

      await Promise.all([
        ...submitTest.submitTestListeningAnswers.map((answer) =>
          createSubmitTestListeningAnswer(answer)
        ),
        ...submitTest.submitTestReadingAnswers.map((answer) =>
          createSubmitTestReadingAnswer(answer)
        ),
        ...submitTest.submitTestSpeakings.map((answer) =>
          createSubmitTestSpeaking(answer)
        ),
        ...submitTest.submitTestWritings.map((answer) =>
          createSubmitTestWriting(answer)
        ),
        ...submitTest.submitTestMixingAnswers.map((answer) =>
          createSubmitTestMixingAnswer(answer)
        ),
      ]);
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      deleteData("MyDatabase", "MyStore" + test.id);

      navigate("/student/history-test/mixing", {
        state: {
          id: submitTestId || null,
          testId: test.id,
        },
      });
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

    const totalReadingQuestions = test.testReadings.reduce(
      (total, data) => total + data.questions.length,
      0
    );
    const totalListeningQuestions = test.testListenings.reduce(
      (total, data) => total + data.questions.length,
      0
    );
    calculateSectionScore(test?.testReadings, totalReadingQuestions);
    calculateSectionScore(test?.testListenings, totalListeningQuestions);

    const vocabularyQuestions = test?.testMixingQuestions.filter(
      (question) => question.TYPE === "VOCABULARY"
    );

    const grammarQuestions = test?.testMixingQuestions.filter(
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
    <>
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
      <Grid sx={{ marginBottom: "1rem" }}>
        <Box sx={{}}>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
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
            <Box
              sx={{ marginLeft: "auto", display: "flex", marginRight: "20%" }}
            >
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
                dataTest={DataTestMixing[activeTab]}
                focusId={focusId}
                title={title}
                answers={answers}
                setAnswers={setAnswers}
              />
            )}
            {activeTab === 1 && (
              <Grammar
                dataTest={DataTestMixing[activeTab]}
                focusId={focusId}
                title={title}
                answers={answers}
                setAnswers={setAnswers}
              />
            )}
            {activeTab === 2 && (
              <Reading
                dataTest={DataTestMixing[activeTab]}
                focusId={focusId}
                title={title}
                answers={answers}
                setAnswers={setAnswers}
              />
            )}
            {activeTab === 3 && (
              <Listening
                dataTest={DataTestMixing[activeTab]}
                focusId={focusId}
                title={title}
                answers={answers}
                setAnswers={setAnswers}
              />
            )}
            {activeTab === 4 && (
              <Speaking
                dataTest={DataTestMixing[activeTab].dataItem}
                focusId={focusId}
                answers={answers}
                setAnswers={setAnswers}
              />
            )}
            {activeTab === 5 && (
              <Writing
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
              handleBtnSubmit={handleBtnSubmit}
              duration={test.duration}
              storeName={storeName}
            />
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default ItemTest;
