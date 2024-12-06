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
  CardMedia,
  Switch,
} from "@mui/material";
import ConfirmDialog from "shared/component/confirmDialog/ConfirmDialog";
import { toast } from "react-toastify";
import useColor from "shared/color/Color";
import { Trash, Upload, PlusCircle } from "lucide-react";
import { styled } from "@mui/material/styles";
import QuestionReadingDetails from "./QuestionReadingDetails";
import { createTestReading, updateTestReading } from "api/test/TestReadingApi"; // import API

import { DeleteQuestionTest } from "../Mixing/DeleteQuestionTest";
import { AddQuestionTest } from "../Mixing/AddQuestionTest";
import { updateTestReadingQuestion } from "api/test/TestReadingQuestionApi";
import {
  createTestReadingAnswer,
  updateTestReadingAnswer,
  deleteTestReadingAnswer,
} from "api/test/TestReadingAnswerApi";
import {
  handleFileUpload,
  handleFileChange,
} from "../../../../shared/utils/uploadFileUtils";
import { uploadFile } from "api/feature/uploadFile/uploadFileService";

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
}));
const ColorButton = styled(Button)(({ color }) => ({
  borderRadius: "8px",
  padding: "8px 24px",
  backgroundColor: color,
  color: color === "#98FB98" ? "black" : "white",
  "&:hover": {
    backgroundColor: color,
    opacity: 0.9,
  },
}));

function QuestionReading({ data, handleReading, BooleanDeleteSubmitTest }) {
  const initialData = data || {};
  const { Color2, Color2_1 } = useColor();
  const questions = initialData.questions || [];

  const [formData, setFormData] = useState({
    ...initialData,
    questions: questions,
    selectedQuestion: questions.length > 0 ? questions[0] : null,
  });

  const [isEditing, setIsEditing] = useState(data.id === "" ? true : false);
  const [questionSelected, setQuestionSelected] = useState(
    questions.length > 0 ? questions[0] : null
  );
  const [image, setImage] = useState(formData.image);

  const handleImageUploadData = (event) => {
    const file = event.target.files[0]; 
    if (!file) {
      toast.error("Please select a file.");
      return;
    }
    
    const validExtensions = ["image/jpeg", "image/png", "image/gif"];
    if (!validExtensions.includes(file.type)) {
      toast.error("Only JPEG, PNG, and GIF image formats are allowed.");
      return;
    }
    const img = new Image();
    img.onload = function () {
      if (img.width < 150 || img.height < 150) {
        toast.warning("The image is small, which might affect quality. Please consider uploading a larger image.");
      }
      
  };
    
    handleFileChange(event, setImage);
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
    setIsEditing(false);
    setFormData({
      ...formData,
      content: initialData.content,
      image: initialData.image,
    });
  };

  const handleSave = async () => {
    if (!formData.content || formData.content.trim() === "") {
      toast.error("Reading content cannot be empty.");
      return;
    }
    const activeQuestions = formData.questions.filter(
      (question) => question.status === "ACTIVE"
    );
    if (activeQuestions.length === 0) {
      toast.error("Please create at least one question ACTIVE");
      return;
    }

    formData.type = "READING";
    let updatedData = {
      ...initialData,
      content: formData.content,
      image: formData.image,
    };

    if (formData.id === "") {
      try {
        if (image !== "") {
          const dataImage = await uploadFile(
            "test/mixing/reading",
            initialData.testId.replace(/\s+/g, "_"),
            image
          );
          if (dataImage.url !== null) {
            updatedData = {
              ...updatedData,
              image: dataImage.url,
            };
          }
        } else {
          updatedData = {
            ...updatedData,
            image: "",
          };
        }
        const testReading = await createTestReading(updatedData);
        formData.id = testReading.id;

        try {
          for (const questionData of formData.questions) {
            if (questionData.id?.startsWith("add")) {
              questionData.testReadingId = formData.id;

              const id = await AddQuestionTest(
                initialData.test.id,
                "READING",
                questionData
              );

              await Promise.all(
                (questionData.answers || []).map(async (answer) => {
                  answer.testQuestionReadingId = id;
                  if (answer.id.startsWith("add")) {
                    try {
                      await createTestReadingAnswer(answer);
                    } catch (error) {
                      console.error(`Error adding answer ${answer.id}:`, error);
                    }
                  }
                })
              );
            }
          }
          toast.success(
            `Successfully created serial ${initialData.serial} of Part Reading.`
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

        if (initialData.image === "" && image !== "") {
          const dataImage = await uploadFile(
            "test/mixing/reading",
            initialData.testId.replace(/\s+/g, "_"),
            image
          );
          if (dataImage.url !== null) {
            updatedData = {
              ...updatedData,
              image: dataImage.url,
            };
          }
        }
        if (initialData.image !== "") {
          const newImage = await handleFileUpload(
            initialData.image,
            image,
            initialData.testId,
            "test/mixing/reading"
          );

          if (newImage !== initialData.image) {
            updatedData = {
              ...updatedData,
              image: newImage,
            };
          }
        }
        await updateTestReading(updatedData.id, updatedData);
        await Promise.all(
          formData.questions
            .filter((questionData) => !questionData.id?.startsWith("add"))
            .map(async (questionData) => {
              await updateTestReadingQuestion(questionData.id, questionData);

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
                  deleteTestReadingAnswer(answer.id)
                )
              );

              await Promise.all(
                (questionData.answers || []).map(async (answer) => {
                  if (answer.id.startsWith("add")) {
                    await createTestReadingAnswer(answer);
                  } else {
                    await updateTestReadingAnswer(answer.id, answer);
                  }
                })
              );
            })
        );

        await Promise.all(
          questionsDelete.map(async (questiondelete) => {
            await updateTestReadingQuestion(questiondelete.id, questiondelete);
          })
        );
        for (const questiondelete of questionsDelete) {
          await DeleteQuestionTest(
            initialData.test.id,
            "READING",
            questiondelete,
            questiondelete.serial,
            1
          );
        }

        try {
          for (const questionData of formData.questions.filter((questionData) =>
            questionData.id?.startsWith("add")
          )) {
            questionData.testReadingId = formData.id;
            console.log(questionData);

            const id = await AddQuestionTest(
              initialData.test.id,
              "READING",
              questionData
            );

            for (const answer of questionData.answers || []) {
              answer.testQuestionReadingId = id;
              if (answer.id.startsWith("add")) {
                try {
                  await createTestReadingAnswer(answer);
                } catch (error) {
                  console.error(`Error adding answer ${answer.id}:`, error);
                }
              }
            }
          }
          toast.success(
            `Successfully updated serial ${initialData.serial} of Part Reading.`
          );
        } catch (error) {
          console.error("Error saving questions or answers:", error);
        }
      } catch (error) {
        console.error("Error saving questions or answers:", error);
      }
    }
    handleReading(formData);

    setIsEditing(false);
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
        formData.questions.length > 0
          ? Math.max(...formData.questions.map((q) => q.serial)) + 1
          : (() => {
              const smallerReadings = (formData.test.testReadings || []).filter(
                (reading) => reading.serial < formData.serial
              );

              if (smallerReadings.length > 0) {
                const allQuestions = smallerReadings.flatMap(
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
      testReadingId: formData.id,
      test: initialData.test,
      answers: [],
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
    <Box sx={{ p: 3, bgcolor: "#", minHeight: "100vh", display: "flex" }}>
      <ConfirmDialog
        open={openDialogDelete}
        onClose={dialogHandlers.onClose}
        onAgree={dialogHandlers.onAgree}
        title="Confirm Deletion"
        content={`Are you sure you want to delete ${questionsDelete.length} question(s)?`}
        cancelText="Cancel"
        agreeText="Delete"
      />
      <Box sx={{ width: "50%", maxWidth: "50%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            marginLeft: "6%",
          }}
        >
          <Typography variant="h4">Reading</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 4,
            bgcolor: "#F0F0F0",
            padding: "2rem",
            marginRight: "5%",
            marginLeft: "5%",
          }}
        >
          <Box sx={{ flex: 1,marginTop:'2rem', }}>
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
                Image
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
              {image && (
                <CardMedia
                  image={image}
                  sx={{ height: "150px", width: "150px" }}
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
                  accept="image/*"
                  onChange={handleImageUploadData}
                />
                </Button>
              </Box>
            </Box>
            <Typography variant="h6" sx={{ mb: 2 , marginTop:'4rem'}}>
              Content
            </Typography>
            <TextField
              multiline
              rows={6}
              fullWidth
              value={formData.content || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
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
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            marginTop: "1rem",
            justifyContent: "center",
          }}
        >
          <ButtonContainer>
            <ColorButton
              color="#F08080"
              variant="contained"
              disabled={initialData.id === "" ? true : false}
              onClick={handleCancel}
            >
              Cancel
            </ColorButton>
            <ColorButton
              color="#FFD700"
              variant="contained"
              onClick={handleEditToggle}
              disabled={isEditing}
            >
              Edit
            </ColorButton>
            <ColorButton
              color="#00796B"
              variant="contained"
              onClick={handleSave}
              disabled={!isEditing}
            >
              Save
            </ColorButton>
          </ButtonContainer>
        </Box>
      </Box>
      <Box sx={{ flex: 1, width: "50%", maxWidth: "50%" }}>
        {questionSelected && (
          <QuestionReadingDetails
            question={{
              ...questionSelected,
              type: "Question detail",
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

export default QuestionReading;
