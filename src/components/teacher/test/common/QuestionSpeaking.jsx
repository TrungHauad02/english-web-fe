import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  Paper,
  Container,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { PlusCircle } from 'lucide-react';
import ConfirmDialog from "shared/component/confirmDialog/ConfirmDialog";
import { toast } from "react-toastify";
import { Trash, Upload} from "lucide-react";
import useColor from "shared/color/Color";
import { DeleteQuestionTest } from "../Mixing/DeleteQuestionTest";
import { AddQuestionTest } from "../Mixing/AddQuestionTest";
import { createTestSpeaking, updateTestSpeaking } from "api/test/TestSpeakingApi";
import { createTestSpeakingQuestion, updateTestSpeakingQuestion } from "api/test/TestSpeakingQuestionApi";
const OuterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff9e6',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  width: '100%',
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#F0F0F0',
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[3],
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
}));

const ColorButton = styled(Button)(({ color }) => ({
  borderRadius: '8px',
  padding: '8px 24px',
  backgroundColor: color,
  color: color === '#98FB98' ? 'black' : 'white',
  '&:hover': {
    backgroundColor: color,
    opacity: 0.9,
  },
}));

const TestSpeakingForm = ({ initialData, handleSpeaking }) => {
  const [formData, setFormData] = useState({
    ...initialData,
    serial: initialData?.serial || 1,
    questions: initialData?.questions || [],
  });
  const [errors, setErrors] = useState({
    title: "",
    questions: [], 
  });

  

  const [isEditMode, setIsEditMode] = useState(formData.id==='' ? true : false);

  const handleAddNewQuestion = () => {
    const newQuestion = { id:  `add-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      , content: '',
      
      serial: formData.questions && formData.questions.length > 0
      ? Math.max(...formData.questions.map((q) => q.serial)) + 1
      : (() => {

          const smalllerSpeaking = (initialData.test.testSpeakings || []).filter(
            (Speaking) => Speaking.serial < formData.serial
          );
          if(smalllerSpeaking.length>0)
          {
            const allQuestions = smalllerSpeaking.flatMap((Speaking) => Speaking.questions || []);
            if (allQuestions.length > 0) {
              return Math.max(...allQuestions.map((q) => q.serial)) + 1;
            }
          }

          if (formData.test.testListenings && formData.test.testListenings.length > 0) {
            const allQuestions = formData.test.testListenings.flatMap((listening) => listening.questions || []);
            if (allQuestions.length > 0) {
              return Math.max(...allQuestions.map((q) => q.serial)) + 1;
            }
          }

            if (formData.test.testReadings && formData.test.testReadings.length > 0) {
              const allQuestions = formData.test.testReadings.flatMap((reading) => reading.questions || []);
              if (allQuestions.length > 0) {
                return Math.max(...allQuestions.map((q) => q.serial)) + 1;
              }
            }
     
          if (formData.test.testMixingQuestions && formData.test.testMixingQuestions.length > 0) {
            return Math.max(...formData.test.testMixingQuestions.map((q) => q.serial)) + 1;
          }
 
          return 1;
        })(),
       status: 'ACTIVE',
      };
      setFormData((prevFormData) => ({
        ...prevFormData,
        questions: [...(prevFormData.questions || []), newQuestion],
      }));
  };
    const handleTitleChange = (value) => {
      const trimmedValue = value.trim();
      const titleError = !trimmedValue ? "Title cannot be empty." : "";
      
      setErrors((prev) => ({
        ...prev,
        title: titleError,
      }));

      setFormData((prev) => ({
        ...prev,
        title: value,
      }));
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
  };
  

  const handleQuestionChange = (index, field, value) => {
    setFormData((prevFormData) => {
      const updatedQuestions = prevFormData.questions.map((question, i) =>
        i === index ? { ...question, [field]: value } : question
      );
  
      return {
        ...prevFormData,
        questions: updatedQuestions,
      };
    });
    if (field === "content") {
      setErrors((prevErrors) => {
        const updatedErrors = [...prevErrors.questions];
        updatedErrors[index] = value.trim() === "" ? "Content cannot be empty." : "";
        return {
          ...prevErrors,
          questions: updatedErrors,
        };
      });
    }
  };
  

  const handleSave =  async () => {
    if (!formData.title || formData.title.trim() === "") {
      toast.error("Speaking title cannot be empty.");
      return;
    }
    const activeQuestions = formData.questions.filter((question) => question.status === "ACTIVE");
    if (activeQuestions.length === 0) {
      toast.error("Please create at least one question ACTIVE");
      return;
    }
    const emptyContentQuestions = formData.questions.filter(
      (question) => !question.content || question.content.trim() === ""
    );
    
    if (emptyContentQuestions.length > 0) {
      toast.error("All questions must have content.");
      return;
    }
    formData.type = "SPEAKING";

    if(formData.id === '')
    {
      const testSpeaking = await createTestSpeaking(formData)
      formData.id = testSpeaking.id;
      try {

        for (const questionData of formData.questions) {
          if (questionData.id?.startsWith('add')) {
            questionData.testSpeakingId = formData.id;
       
             await AddQuestionTest(initialData.test.id, "SPEAKING", questionData);
           
          }
        }
      } catch (error) {
        console.error("Error saving questions or answers:", error);
      }
      toast.success(`Successfully created serial ${initialData.serial} of Part Speaking.`);
      

    }
    else
    {

      if(questionsDelete.length!==0)
        {
         const result = await handleOpenDialogDelete();
         if (result === "cancel") {
           handleCancel(); 
           return;
         }
        }

      await updateTestSpeaking(formData.id,formData);
 
      
      await Promise.all(
        questionsDelete.map((question) => updateTestSpeakingQuestion(question.id,question))
      );

      await Promise.all(
        formData.questions
          .filter((questionData) => !questionData.id?.startsWith('add'))
          .map(async (questionData) => {

            await updateTestSpeakingQuestion(questionData.id, questionData);
          }))
     
      for (const questiondelete of questionsDelete) {
        await DeleteQuestionTest(
          initialData.test.id,
          "SPEAKING",
          questiondelete,
          questiondelete.serial,
          1
        );
      }

      for (const questionData of formData.questions) {
        if (questionData.id?.startsWith('add')) {
          questionData.testSpeakingId = formData.id;
     
           await AddQuestionTest(initialData.test.id, "SPEAKING", questionData);
         
        }
      }
      toast.success(`Successfully updated serial ${initialData.serial} of Part Speaking.`);
    }
    setIsEditMode(false);
    handleSpeaking(formData);
 
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setFormData(initialData);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleStatusChange = (event, questionId) => {
   
    setFormData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((q) =>
        q.id === questionId ? { ...q, status: event.target.checked ? "ACTIVE" : "INACTIVE", } : q
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
  const { Color2, Color2_1 } = useColor();


  return (
    <Box sx={{marginRight:'5%',marginLeft:'5%'}} >
      <Box>
      <ConfirmDialog
        open={openDialogDelete}
        onClose={dialogHandlers.onClose}
        onAgree={dialogHandlers.onAgree} 
        title="Confirm Deletion"
        content={`Are you sure you want to delete ${questionsDelete.length} question(s)?`}
        cancelText="Cancel"
        agreeText="Delete"
      />
        <Typography variant="h4" gutterBottom>
          SPEAKING 
        </Typography>
        <FormContainer>
        <Box
              mb={3}
              display="flex"
              alignItems="center"
              gap={2}
              sx={{
                bgcolor: "#FFFFFF",
                padding: 2,
                borderRadius: "4px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", 
                position: "relative",
                top: "-5px", 
                left: "-5px", 
                transition: "all 0.2s ease-in-out", 
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  whiteSpace: "nowrap",
                  flexShrink: 0, 
                }}
              >
                Test Speaking Title
              </Typography>
              <TextField
            label=""
            fullWidth
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            disabled={!isEditMode}
            error={!!errors.title}
            helperText={errors.title}
          />

            </Box>

            <Typography variant="h5" gutterBottom>
                Questions:
              </Typography>
              {formData.questions.map((question, index) => (
            <Box key={index} display="flex" alignItems="center" gap={2} mb={2}>
              <Typography
                variant="h6"
                sx={{
                  whiteSpace: "nowrap", 
                  flexShrink: 0, 
                }}
              >
                Serial {question.serial}
              </Typography>
              <TextField
                fullWidth
                value={question.content}
                onChange={(e) =>
                  handleQuestionChange(index, "content", e.target.value)
                }
                disabled={!isEditMode}
                error={!!errors.questions[index]} 
                helperText={errors.questions[index]}
                sx={{
                  "& .MuiInputBase-root": {
                    bgcolor: "#F8F8F8", 
                    borderRadius: "4px", 
                  },
                }}
              />
              <FormControl sx={{ width: "160px", ml: 2 }}>
                <Select
                  value={question.status || "ACTIVE"}
                  disabled={!isEditMode}
                  onChange={(e) => {
                    handleStatusChange(e, question.id);
                  }}
                >
                  <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                  <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                </Select>
              </FormControl>
              <IconButton
                disabled={!isEditMode}
                onClick={() => handleDeleteQuestion(question)}
                color="error"
                sx={{
                  height: "3rem", 
                }}
              >
                <Trash />
              </IconButton>
            </Box>
          ))}


      
            <Button
              variant="contained"
              onClick={handleAddNewQuestion}
              startIcon={<PlusCircle />}
              disabled={!isEditMode}
              sx={{
                bgcolor: Color2_1,
                "&:hover": { bgcolor:Color2 },
                marginTop: "1rem",
              }}
            >
              Add new question
            </Button>
      
          <ButtonContainer>
            <ColorButton color="#F08080" variant="contained"    disabled={initialData.id === '' ? true : false}  onClick={handleCancel}>
              Cancel
            </ColorButton>
            <ColorButton color="#FFD700" variant="contained" onClick={handleEdit}>
              Edit
            </ColorButton>
            <ColorButton color={Color2} variant="contained" onClick={handleSave}
              disabled={!isEditMode}>
              Save
            </ColorButton>
          </ButtonContainer>
        </FormContainer>
      </Box>
    </Box>
  );
};

export default TestSpeakingForm;
