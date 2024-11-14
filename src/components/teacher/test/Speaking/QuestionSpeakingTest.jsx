import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  Paper,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { PlusCircle } from 'lucide-react';

import { DeleteQuestionSpeakingTest } from "./DeleteQuestionSpeakingTest";
import { AddQuestionSpeakingTest } from "./AddQuestionSpeakingTest";
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
  backgroundColor: '#fff',
  borderRadius: theme.spacing(3),
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

const QuestionSpeakingTest = ({ initialData, handleSpeaking }) => {
  const [formData, setFormData] = useState({
    ...initialData,
    serial: initialData?.serial || 1,
    questions: initialData?.questions || [],
  });

  const [isEditMode, setIsEditMode] = useState(false);

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
  };

  const handleSave =  async () => {
    formData.type = "SPEAKING";

    if(formData.id === '')
    {
      const testSpeaking = await createTestSpeaking(formData)
      formData.id = testSpeaking.id;
      try {

        for (const questionData of formData.questions) {
          if (questionData.id?.startsWith('add')) {
            questionData.testSpeakingId = formData.id;
       
             await AddQuestionSpeakingTest(initialData.test.id, questionData);
           
          }
        }
      } catch (error) {
        console.error("Error saving questions or answers:", error);
      }
      

    }
    else
    {
      await updateTestSpeaking(formData.id,formData);
      console.log(questionsDelete);
      
      await Promise.all(
        questionsDelete.map((question) => updateTestSpeakingQuestion(question.id,question))
      );
      console.log(formData.questions);
      
      await Promise.all(
        formData.questions
          .filter((questionData) => !questionData.id?.startsWith('add'))
          .map(async (questionData) => {

            await updateTestSpeakingQuestion(questionData.id, questionData);
          }))
     
      for (const questiondelete of questionsDelete) {
        await DeleteQuestionSpeakingTest(
          initialData.test.id,
          questiondelete,
          questiondelete.serial,
          1
        );
      }

      for (const questionData of formData.questions) {
        if (questionData.id?.startsWith('add')) {
          questionData.testSpeakingId = formData.id;
     
           await AddQuestionSpeakingTest(initialData.test.id,questionData);
         
        }
      }
    }
    handleSpeaking(formData);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setFormData(initialData);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  return (
    <Container maxWidth="lg">
      <OuterContainer>
        <Typography variant="h4" gutterBottom>
          SPEAKING 
        </Typography>
        <FormContainer>
          <Box mb={3} display="flex" alignItems="center">
            <TextField
              label="Serial"
              type="number"
              value={formData.serial}
              onChange={(e) => setFormData({ ...formData, serial: parseInt(e.target.value, 10) })}
              disabled={!isEditMode}
              sx={{ width: '10ch', mr: 2 }}
            />
            <TextField
              label="Test Speaking Title"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              disabled={!isEditMode}
            />
          </Box>

          <Typography variant="h5" gutterBottom>Questions:</Typography>
          {formData.questions.map((question, index) => (
            <Box key={index} display="flex" alignItems="center" mb={2}>
              <TextField
                label={`Serial Question ${question.serial}`}
                fullWidth
                value={question.content}
                onChange={(e) =>
                  handleQuestionChange(index, 'content', e.target.value)
                }
                disabled={!isEditMode}
                sx={{ mr: 2 }}
              />
              {isEditMode && (
                <IconButton onClick={() => handleDeleteQuestion(question)} color="error">
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}

          {isEditMode && (
            <Button
              variant="contained"
              onClick={handleAddNewQuestion}
              startIcon={<PlusCircle />}
              sx={{
                bgcolor: "#9dc45f",
                "&:hover": { bgcolor: "#8ab54e" },
                marginTop: "1rem",
              }}
            >
              Add new question
            </Button>
          )}

          <ButtonContainer>
            <ColorButton color="#F08080" variant="contained" onClick={handleCancel}>
              Cancel
            </ColorButton>
            <ColorButton color="#FFD700" variant="contained" onClick={handleEdit}>
              Edit
            </ColorButton>
            <ColorButton color="#98FB98" variant="contained" onClick={handleSave}
              disabled={!isEditMode}>
              Save
            </ColorButton>
          </ButtonContainer>
        </FormContainer>
      </OuterContainer>
    </Container>
  );
};

export default QuestionSpeakingTest;
