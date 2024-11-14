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
} from "@mui/material";
import { Trash, Upload, PlusCircle } from "lucide-react";
import { styled } from "@mui/material/styles";
import QuestionReadingDetails from "./QuestionReadingDetails";
import { createTestReading, updateTestReading } from "api/test/TestReadingApi"; 

import { DeleteQuestionReadingTest } from "./DeleteQuestionReadingTest";
import { AddQuestionReadingTest } from "./AddQuestionReadingTest";
import { updateTestReadingQuestion } from "api/test/TestReadingQuestionApi";
import {
  createTestReadingAnswer,
  updateTestReadingAnswer,
  deleteTestReadingAnswer,
} from "api/test/TestReadingAnswerApi";
import {handleImageUpload,handleImageChange} from "../../../../shared/utils/uploadImageUtils"
import {
  deleteFile,
  uploadFile,
} from "api/feature/uploadFile/uploadFileService";

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#fff5e6",
  borderRadius: theme.spacing(2),
}));
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

function QuestionReadingTest({ data, handleReading }) {
  const initialData = data || {};
  const questions = initialData.questions || [];

  const [formData, setFormData] = useState({
    ...initialData,
    questions: questions,
    selectedQuestion: questions.length > 0 ? questions[0] : null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [questionSelected, setQuestionSelected] = useState(
    questions.length > 0 ? questions[0] : null
  );
  const [image,setImage] = useState(formData.image);

  const handleImageUploadData = (event) => {
    handleImageChange(event,setImage)
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
  

  const handleEditToggle = () => {
    console.log(image);
    
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
    formData.type = "READING";
    let updatedData = {
      ...initialData,
      content: formData.content,
      image: formData.image,
    };
    if (formData.id === '') { 
      try {

        const dataImage = await uploadFile(
                "test/reading",
                initialData.testId.replace(/\s+/g, "_"),
                image,
        );
        if (dataImage.url !== initialData.image) {
          updatedData = {
            ...updatedData,
            image: dataImage.url,
          };
        }
        
        const testReading = await createTestReading(updatedData);
        formData.id = testReading.id;
        
        try {

          for (const questionData of formData.questions) {
            if (questionData.id?.startsWith('add')) {
              questionData.testReadingId = formData.id;
         
              const id = await AddQuestionReadingTest(initialData.test.id, questionData);
              console.log(id);
              
              
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
        } catch (error) {
          console.error("Error saving questions or answers:", error);
        }
        
      } catch (error) {
        console.error("Error saving questions or answers:", error);
      }

    } else {
      try {

        const newImage = await handleImageUpload(
          initialData.image,
          image,
          initialData.testId,
          "test/reading"
        );
    
        if (newImage !== initialData.image) {
          updatedData = {
            ...updatedData,
            image: newImage,
          };
        }

        await updateTestReading(updatedData.id, updatedData);
        await Promise.all(
          formData.questions
            .filter((questionData) => !questionData.id?.startsWith('add'))
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
                answersToDelete.map((answer) => deleteTestReadingAnswer(answer.id))
              );
        
              await Promise.all(
                (questionData.answers || []).map(async (answer) => {
                  if (answer.id.startsWith('add')) {
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
            await updateTestReadingQuestion(
              questiondelete.id,questiondelete
            );
          })
        );
        for (const questiondelete of questionsDelete) {
          await DeleteQuestionReadingTest(
            initialData.test.id,

            questiondelete,
            questiondelete.serial,
            1
          );
        }
        try {
          for (const questionData of formData.questions.filter((questionData) => questionData.id?.startsWith('add'))) {
            questionData.testReadingId = formData.id;
            console.log(questionData);
        

            const id = await AddQuestionReadingTest(initialData.test.id,  questionData);
        
            for (const answer of (questionData.answers || [])) {
              answer.testQuestionReadingId = id;
              if (answer.id.startsWith('add')) {
                try {
                  await createTestReadingAnswer(answer);
                } catch (error) {
                  console.error(`Error adding answer ${answer.id}:`, error);
                }
              }
            }
          }
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

    const filteredQuestions = prev.questions.filter((q) => !q.id.startsWith("add"));

 
    const maxSerial = filteredQuestions.length > 0
      ? Math.max(...filteredQuestions.map((q) => q.serial))
      : 0;


    if (!questionToDelete.id.startsWith("add")) {
      const updatedQuestionToDelete = {
        ...questionToDelete,
        serial: maxSerial,
      };
      setQuestionsDelete((prevDeleted) => [...prevDeleted, updatedQuestionToDelete]);
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
      serial: formData.questions.length > 0
      ? Math.max(...formData.questions.map((q) => q.serial)) + 1
      : (() => {
          const smallerReadings = (formData.test.testReadings || []).filter(
            (reading) => reading.serial < formData.serial
          );
    
          if (smallerReadings.length > 0) {
            const allQuestions = smallerReadings.flatMap((reading) => reading.questions || []);
            if (allQuestions.length > 0) {
              return Math.max(...allQuestions.map((q) => q.serial)) + 1;
            }
          }
          return 1;
        })(),
     
      content: "",
      status: "ACTIVE",
      testReadingId: formData.id,
      test: initialData.test,
      answers: [
        {
          id: "add",
          content: "",
          isCorrect: true,
          status: "ACTIVE",
          testQuestionReadingId: "",
        },
      ],
    };

    setQuestionSelected(newQuestion);
  };

  return (
    <FormContainer sx={{ p: 3, bgcolor: "#fff9e6", minHeight: "100vh" }}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h4">Reading</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Image
            </Typography>
            <Box sx={{ mb: 2 }}>
              {image && (
                  <CardMedia
                  image={image}
                  sx={{ height: "250px", width: "250px" }}
                />
              )}
              <Button
                variant="contained"
                component="label"
                startIcon={<Upload />}
              >
                Upload
                <input type="file" hidden accept="image/*" onChange={handleImageUploadData} />
              </Button>
            </Box>

            <Typography variant="h6" sx={{ mb: 2 }}>
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
                    <TableCell>{isEditing ? "Actions" : ""}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formData.questions.map((question) => (
                    <TableRow
                      key={question.id}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell   onClick={() => handleQuestionSelect(question.id)}>{question.serial}</TableCell>
                      <TableCell   onClick={() => handleQuestionSelect(question.id)}>{question.content}</TableCell>
                      <TableCell>
                        {isEditing ? (
                          <IconButton
                            onClick={() => handleDeleteQuestion(question)}
                            color="error"
                          >
                            <Trash />
                          </IconButton>
                        ) : null}
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
                bgcolor: "#9dc45f",
                "&:hover": { bgcolor: "#8ab54e" },
                marginTop: "1rem",
              }}
              onClick={handleAddQuestion}
              disabled={!isEditing }
            >
              Add new question
            </Button>
          </Box>
          <Box sx={{ flex: 1 }}>
            {questionSelected && (
              <QuestionReadingDetails
                question={{
                  ...questionSelected,
                  type: "Question detail",
                  details: "true",
                }}
                iseditreading={isEditing}
                key={questionSelected.id}
                handleSaveSelectedQuestion={handleSaveSelectedQuestion}
              />
            )}
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
            <ColorButton color="#F08080" variant="contained" onClick={handleCancel}>
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
              color="#98FB98"
              variant="contained"
              onClick={handleSave}
              disabled={!isEditing}
            >
              Save
            </ColorButton>
          </ButtonContainer>
        </Box>
      </Box>
    </FormContainer>
  );
}

export default QuestionReadingTest;
