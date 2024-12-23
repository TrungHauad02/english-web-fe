import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Switch,
} from "@mui/material";
import { toast } from "react-toastify";
import ConfirmDialog from "shared/component/confirmDialog/ConfirmDialog";
import { Trash, Upload, PlusCircle } from "lucide-react";
import { styled } from "@mui/material/styles";
import QuestionListeningDetails from "./QuestionListeningDetails";
import {
  createTestListening,
  updateTestListening,
} from "api/test/TestListeningApi";
import useColor from "shared/color/Color";
import { DeleteQuestionTest } from "../Mixing/DeleteQuestionTest";
import SaveEditCancelButton from "./SaveEditCancelButton";
import { updateTestListeningQuestion } from "api/test/TestListeningQuestionApi";
import {
  createTestListeningAnswer,
  updateTestListeningAnswer,
  deleteTestListeningAnswer,
} from "api/test/TestListeningAnswerApi";
import { uploadFile } from "api/feature/uploadFile/uploadFileService";
import {
  handleFileUpload,
  handleFileChange,
} from "../../../../shared/utils/uploadFileUtils";
import { AddQuestionTest } from "../Mixing/AddQuestionTest";


const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
}));

function QuestionListening({ data, handleListening, BooleanDeleteSubmitTest ,setQuestionCurrent}) {
  const initialData = data || {};
  const { Color2, Color2_1 } = useColor();
  const questions = initialData.questions || [];
  const [audio, setAudio] = useState(initialData?.content);
  const [formData, setFormData] = useState({
    ...initialData,
    questions: questions,
    selectedQuestion: questions.length > 0 ? questions[0] : null,
  });

  const [isEditing, setIsEditing] = useState(data.id === "" ? true : false);
  const [questionSelected, setQuestionSelected] = useState(
    questions.length > 0 ? questions[0] : null
  );

  const handleAudioUpload = (event) => {
    handleFileChange(event, setAudio);
  };

  const handleQuestionSelect = (id) => {
    const item = formData.questions.find((item) => item.id === id);
    if (item) {
      setFormData((prev) => ({ ...prev, selectedQuestion: item }));
      setQuestionSelected(item);
    }
  };

  const handleSaveSelectedQuestion = (newQuestion) => {
    setFormData((prev) => {
      const existingIndex = prev.questions.findIndex(
        (question) => question.id === newQuestion.id
      );

      if (existingIndex !== -1) {
        const updatedQuestions = [...prev.questions];
        updatedQuestions[existingIndex] = newQuestion;

        return {
          ...prev,
          questions: updatedQuestions,
          selectedQuestion: newQuestion,
        };
      } else {
        return {
          ...prev,
          questions: [...prev.questions, newQuestion],
          selectedQuestion: newQuestion,
        };
      }
    });
  };

  const handleEditToggle = async () => {
    const result = await BooleanDeleteSubmitTest();

    if (!result) {
      return;
    }
    setIsEditing(true);
  };

  const handleCancel = () => {
    if(initialData.id==='')
    {
      setQuestionCurrent(null)
    }
    setIsEditing(false);
    setFormData({
      ...formData,
      content: initialData.content,
      transcript: initialData.transcript,
    });
  };

  const handleSave = async () => {
    if (!audio || audio.trim() === "") {
      toast.error("Listening audio cannot be empty.");
      return;
    }

    if (!formData.transcript || formData.transcript.trim() === "") {
      toast.error("Listening transcript cannot be empty.");
      return;
    }
    const activeQuestions = formData.questions.filter(
      (question) => question.status === "ACTIVE"
    );
    if (activeQuestions.length === 0) {
      toast.error("Please create at least one question ACTIVE");
      return;
    }
    setIsEditing(false);
    formData.type = "LISTENING";
    let updatedData = {
      ...initialData,
      content: audio,
      transcript: formData.transcript,
    };
    if (formData.id === "") {
      try {
        const dataAudio = await uploadFile(
          "test/mixing/listening",
          initialData.testId.replace(/\s+/g, "_"),
          audio
        );

        if (dataAudio.url !== initialData.content) {
          updatedData = {
            ...updatedData,
            content: dataAudio.url,
          };
        }

        const testListening = await createTestListening(updatedData);
        formData.id = testListening.id;

        try {
          for (const questionData of formData.questions) {
            if (questionData.id?.startsWith("add")) {
              questionData.testListeningId = formData.id;

              const id = await AddQuestionTest(
                initialData.test.id,
                "LISTENING",
                questionData
              );

              for (const answer of questionData.answers || []) {
                answer.testQuestionListeningId = id; 
              
                if (answer.id.startsWith("add")) {
                  try {
                    await createTestListeningAnswer(answer);
                  } catch (error) {
                    console.error(`Error adding answer ${answer.id}:`, error);
                  }
                }
              }
            }
          }
          toast.success(
            `Successfully created serial ${initialData.serial} of Part Listening.`
          );
        } catch (error) {
          console.error("Error saving questions or answers:", error);
        }
      } catch (error) {
        console.error("Error saving questions or answers:", error);
      }
    } else {
      try {
        if (questionsDelete.length !== 0) {
          const result = await handleOpenDialogDelete();
          if (result === "cancel") {
            handleCancel();
            return;
          }
        }
        const newAudio = await handleFileUpload(
          initialData.content,
          audio,
          initialData.testId,
          "test/mixing/listening"
        );

        if (newAudio !== initialData.content) {
          updatedData = {
            ...updatedData,
            content: newAudio,
          };
        }

        await updateTestListening(updatedData.id, updatedData);

        await Promise.all(
          formData.questions
            .filter((questionData) => !questionData.id?.startsWith("add"))
            .map(async (questionData) => {
              await updateTestListeningQuestion(questionData.id, questionData);

              const answersToDelete =
                initialData.questions
                  ?.find((q) => q.id === questionData.id)
                  ?.answers?.filter(
                    (initialAnswer) =>
                      !questionData.answers?.some(
                        (currentAnswer) => currentAnswer.id === initialAnswer.id
                      )
                  ) || [];

              await Promise.all(
                answersToDelete.map((answer) =>
                  deleteTestListeningAnswer(answer.id)
                )
              );

              const answers = questionData.answers || [];

              for (const answer of answers) {
                if (answer.id.startsWith("add")) {
                  try {
                    answer.testQuestionListeningId = questionData.id;
                    await createTestListeningAnswer(answer);
                  } catch (error) {
                    console.error(`Error creating listening answer ${answer.id}:`, error);
                  }
                } else {
                  try {
                    await updateTestListeningAnswer(answer.id, answer);
                  } catch (error) {
                    console.error(`Error updating listening answer ${answer.id}:`, error);
                  }
                }
              }
              
            })
        );
        await Promise.all(
          questionsDelete.map(async (questionDelete) => {
            await updateTestListeningQuestion(
              questionDelete.id,
              questionDelete
            );
          })
        );
        for (const questionDelete of questionsDelete) {
          await DeleteQuestionTest(
            initialData.test.id,
            "LISTENING",
            questionDelete,
            questionDelete.serial,
            1
          );
        }

        try {
          for (const questionData of formData.questions.filter((questionData) =>
            questionData.id?.startsWith("add")
          )) {
            questionData.testListeningId = formData.id;

            const id = await AddQuestionTest(
              initialData.test.id,
              "LISTENING",
              questionData
            );

            for (const answer of questionData.answers || []) {
              answer.testQuestionListeningId = id;
              if (answer.id.startsWith("add")) {
                try {
                  await createTestListeningAnswer(answer);
                } catch (error) {
                  console.error(`Error adding answer ${answer.id}:`, error);
                }
              }
            }
          }
          toast.success(
            `Successfully updated serial ${initialData.serial} of Part Listening.`
          );
        } catch (error) {
          console.error("Error saving questions or answers:", error);
        }
      } catch (error) {
        console.error("Error saving questions or answers:", error);
      }
    }

    handleListening(formData);

  };

  const [questionsDelete, setQuestionsDelete] = useState([]);

  const handleDeleteQuestion = async (questionToDelete) => {
    setFormData((prev) => {
      const filteredQuestions = prev.questions.filter(
        (q) => !q.id.startsWith("add")
      );

      const maxSerial =
        filteredQuestions.length > 0
          ? Math.max(...filteredQuestions.map((q) => q.serial))
          : 0;

      if (!questionToDelete.id.startsWith("add")) {
        const updatedQuestionToDelete = {
          ...questionToDelete,
          serial: maxSerial,
        };
        setQuestionsDelete((prevDeleted) => [
          ...prevDeleted,
          updatedQuestionToDelete,
        ]);
      }

      const updatedQuestions = prev.questions.filter(
        (question) => question.id !== questionToDelete.id
      );

      if (updatedQuestions.length === 0) {
        return {
          ...prev,
          questions: [],
        };
      }

      const reOrderedQuestions = updatedQuestions.map((question) => {
        if (question.serial > questionToDelete.serial) {
          return {
            ...question,
            serial: question.serial - 1,
          };
        }
        return question;
      });

      return {
        ...prev,
        questions: reOrderedQuestions,
      };
    });
    if (questionToDelete.id === questionSelected?.id) {
      setQuestionSelected(null);
    }
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: `add-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      serial:
        formData.questions && formData.questions.length > 0
          ? Math.max(...formData.questions.map((q) => q.serial)) + 1
          : (() => {
              const smallerListenings = (
                formData.test.testListenings || []
              ).filter((listening) => listening.serial < formData.serial);

              if (smallerListenings.length > 0) {
                const allQuestions = smallerListenings.flatMap(
                  (listening) => listening.questions || []
                );
                if (allQuestions.length > 0) {
                  return Math.max(...allQuestions.map((q) => q.serial)) + 1;
                }
              }

              if (
                formData.test.testReadings &&
                formData.test.testReadings.length > 0
              ) {
                const allQuestions = formData.test.testReadings.flatMap(
                  (reading) => reading.questions || []
                );
                if (allQuestions.length > 0) {
                  return Math.max(...allQuestions.map((q) => q.serial)) + 1;
                }
              }

              if (
                formData.test.testMixingQuestions &&
                formData.test.testMixingQuestions.length > 0
              ) {
                return (
                  Math.max(
                    ...formData.test.testMixingQuestions.map((q) => q.serial)
                  ) + 1
                );
              }

              return 1;
            })(),
      content: "",
      status: "ACTIVE",
      testListeningId: formData.id,
      test: initialData.test,
      answers: [
        {
          id: "add",
          content: "",
          isCorrect: true,
          status: "ACTIVE",
          testQuestionListeningId: "",
        },
      ],
    };

    setQuestionSelected(newQuestion);
  };
  const handleStatusChange = (event, questionId) => {
    setFormData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((q) =>
        q.id === questionId
          ? { ...q, status: event.target.checked ? "ACTIVE" : "INACTIVE" }
          : q
      ),
    }));
  };
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [dialogHandlers, setDialogHandlers] = useState({
    onAgree: () => {},
    onClose: () => {},
  });

  const handleOpenDialogDelete = () => {
    return new Promise((resolve) => {
      setOpenDialogDelete(true);

      const handleSave = () => {
        setOpenDialogDelete(false);
        resolve("save");
      };

      const handleCancel = () => {
        setOpenDialogDelete(false);
        resolve("cancel");
      };

      setDialogHandlers({ onAgree: handleSave, onClose: handleCancel });
    });
  };

  return (
    <Box
      sx={{  display: "flex"}}
    >
      <ConfirmDialog
        open={openDialogDelete}
        onClose={dialogHandlers.onClose}
        onAgree={dialogHandlers.onAgree}
        title="Confirm Deletion"
        content={`Are you sure you want to delete ${questionsDelete.length} question(s)?`}
        cancelText="Cancel"
        agreeText="Delete"
      />
      <Box sx={{ width: "50%", maxWidth: "50%",flex: 1 ,marginRight:'1rem' }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
        <Typography variant="h4"
          align="center"
          sx={{ fontWeight: "bold" }}>LISTENING</Typography>
        </Box>
        <Box   sx={{
            bgcolor: "#F0F0F0",
            boxShadow: 3,
            padding:'1rem'
          }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  whiteSpace: "nowrap",
                  height: "3rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Audio
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  height: "3rem",
                  flex: 1,
                }}
              >
                {audio && (
                  <audio
                    controls
                    src={audio}
                    style={{ height: "100%", flex: 1 }}
                  />
                )}
                <Button
                  variant="contained"
                  component="label"
                  disabled={!isEditing}
                  startIcon={<Upload />}
                  sx={{
                    whiteSpace: "nowrap",
                    bgcolor: Color2_1,
                    "&:hover": { bgcolor: Color2 },
                  }}
                >
                  Upload
                  <input
                    type="file"
                    hidden
                    accept="audio/*"
                    onChange={handleAudioUpload}
                  />
                </Button>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Transcript
            </Typography>
            <TextField
              multiline
              rows={6}
              fullWidth
              value={formData.transcript || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, transcript: e.target.value }))
              }
              sx={{ mb: 3 }}
              disabled={!isEditing}
            />

            <Typography variant="h6" sx={{ mb: 2 }}>
              Questions
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ maxHeight: 200, overflowY: "auto" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Serial</TableCell>
                    <TableCell align="center">Question Content</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formData.questions.map((question) => (
                    <TableRow key={question.id} sx={{ cursor: "pointer" }}>
                      <TableCell
                        onClick={() => handleQuestionSelect(question.id)}
                      >
                        {question.serial}
                      </TableCell>
                      <TableCell
                        onClick={() => handleQuestionSelect(question.id)}
                      >
                        {question.content}
                      </TableCell>
                      <TableCell align="center">
                        <Switch
                          disabled={!isEditing}
                          checked={question.status === "ACTIVE"}
                          onChange={(event) =>
                            handleStatusChange(event, question.id)
                          }
                          inputProps={{ "aria-label": "controlled" }}
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: Color2,
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                              {
                                backgroundColor: Color2,
                              },
                            "& .MuiSwitch-track": {
                              backgroundColor: "#ccc",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          disabled={!isEditing}
                          onClick={() => handleDeleteQuestion(question)}
                          color="error"
                        >
                          <Trash />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              startIcon={<PlusCircle />}
              sx={{
                bgcolor: Color2_1,
                "&:hover": { bgcolor: Color2 },
                marginTop: "1rem",
              }}
              onClick={handleAddQuestion}
              disabled={!isEditing}
            >
              Add new question
            </Button>
        <Box
          sx={{ display: "flex", padding:'1rem', justifyContent: "center" }}
        >
          <ButtonContainer>
          <SaveEditCancelButton
            onCancel={handleCancel}
            onEdit={handleEditToggle}
            onSave={handleSave}
            isEditing={isEditing}
            size="large"
            spacing={2}
          />
          </ButtonContainer>
        </Box>
      </Box>
      </Box>
      <Box sx={{ flex: 1, width: "50%", maxWidth: "50%" }}>
        {questionSelected && (
          <QuestionListeningDetails
            question={{
              ...questionSelected,
              type: "QUESTION DETAILS",
              details: "true",
            }}
            isEditTestParent={!isEditing}
            key={questionSelected.id}
            handleSaveSelectedQuestion={handleSaveSelectedQuestion}
          />
        )}
      </Box>
    </Box>
  );
}

export default QuestionListening;
