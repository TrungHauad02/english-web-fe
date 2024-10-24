import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  IconButton
} from "@mui/material"; 
import { Trash, PlusCircle } from 'lucide-react';
import { styled } from '@mui/material/styles';
import { createAnswerVocabulary, updateQuestionVocabulary, updateAnswerVocabulary } from '../../../../api/teacher/test/TestVocabularyApi'; 

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

const findCorrectAnswerId = (answers) => {
  const correctAnswer = answers.find(answer => answer.isCorrect === true);
  return correctAnswer ? correctAnswer.id : null;
};

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#fff5e6',
  borderRadius: theme.spacing(2),
}));

const VocabularyQuiz = ({ question }) => {
  return (
    <>

        <FormContainer sx={{ p: 3, bgcolor: '#fff9e6', minHeight: '100vh' }}>
          <ContentQuestion question={question} />
        </FormContainer>

    </>
  );
};

const ContentQuestion = ({ question }) => {
  const [questionvoca, setQuestionvoca] = useState(question);
  const [selectedAnswer, setSelectedAnswer] = useState(findCorrectAnswerId(question.answers));
  const [isEditMode, setIsEditMode] = useState(false);

  const handleAddAnswer = () => {
    const newAnswer = {
      id: `temp`,
      content: '',
      isCorrect: false,
      status: 'ACTIVE',
      testIdQuestionVocabulary:questionvoca.id

    };
    setQuestionvoca({
      ...questionvoca,
      answers: [...questionvoca.answers, newAnswer]
    });
  };

  const handleRadioChange = (answerId) => {
    setSelectedAnswer(answerId);
    setQuestionvoca({
      ...questionvoca,
      answers: questionvoca.answers.map(a =>
        ({ ...a, isCorrect: a.id === answerId })
      )
    });
  };

  const handleDeleteAnswer = (answerId) => {
    setQuestionvoca({
      ...questionvoca,
      answers: questionvoca.answers.filter(a => a.id !== answerId)
    });
  };

  const handleSave = async () => {
  try {

    await updateQuestionVocabulary(questionvoca);
  
    const answerPromises = questionvoca.answers.map((answer) => {
      if (answer.id.startsWith('temp')) {
    
        return createAnswerVocabulary({
          ...answer,
        }).then((newAnswer) => {
          const updatedAnswers = questionvoca.answers.map(a =>
            a.id === answer.id ? newAnswer : a
          );
          setQuestionvoca({ ...questionvoca, answers: updatedAnswers });
        });
      } else {
    
        return updateAnswerVocabulary(answer);
      }
    });
  

    await Promise.all(answerPromises);
    setIsEditMode(false);
    
  } catch (error) {
    console.error("Error saving question or answers:", error);
  }
};

  
  const handleCancel = () => {
    setIsEditMode(false); 
    setQuestionvoca(question); 
    setSelectedAnswer(findCorrectAnswerId(questionvoca.answers));
  };

  const handleEdit = () => {
    setIsEditMode(true); 
    setSelectedAnswer(findCorrectAnswerId(questionvoca.answers));
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">{question.type}</Typography>
      </Box>

      <Paper sx={{ mb: 3, p: 2, boxShadow: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ mr: 1 }}>Serial</Typography>
          <Box sx={{ 
            bgcolor: '#e0e0e0', 
            borderRadius: '50%', 
            width: 30, 
            height: 30, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mr: 1,
            padding:'0.5rem'
          }}>
            {question.serial}
          </Box>
          <Typography variant="h6" sx={{ mr: 1 }}>:</Typography>
          <TextField
            fullWidth
            disabled={!isEditMode} 
            value={questionvoca.content || ""}
            onChange={(e) => {
              setQuestionvoca({ ...questionvoca, content: e.target.value });
            }}
          />
        </Box>

        <Typography variant="h6" sx={{ mb: 1 }}>Answers:</Typography>

        <RadioGroup 
          value={selectedAnswer} 
          onChange={(e) => handleRadioChange(e.target.value)}
        >
          {questionvoca.answers.map((answer) => (
            <Box key={answer.id} sx={{ display: 'flex', alignItems: 'center', mb: 1, borderRadius: '4px', justifyContent: 'space-between' }}>
              <TextField
                disabled={!isEditMode}
                sx={{ flexGrow: 1 }}
                value={answer.content}
                onChange={(e) => {
                  const updatedOptions = questionvoca.answers.map(opt =>
                    opt.id === answer.id ? { ...opt, content: e.target.value } : opt
                  );
                  setQuestionvoca({ ...questionvoca, answers: updatedOptions });
                }}
              />
              <FormControlLabel
                control={
                  <Radio 
                
                  disabled={!isEditMode}
                  onChange={() => handleRadioChange(answer.id)} // Đảm bảo sự kiện này thay 
                />
                }
                label=""
                value={answer.id}
                sx={{ marginLeft: '1rem' }}
              />
              <IconButton onClick={() => handleDeleteAnswer(answer.id)} color="error">
                <Trash />
              </IconButton>
            </Box>
          ))}
        </RadioGroup>

        {question.isExplain === "false" ? null : (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>Explain:</Typography>
            <TextField
              sx={{ width: '90%' }}
              multiline
              rows={2}
              value={questionvoca.explantion || ""}
              onChange={(e) => {
                setQuestionvoca({ ...questionvoca, explantion: e.target.value });
              }}
              disabled={!isEditMode} 
            />
          </>
        )}

        <Box sx={{ display: 'flex', marginTop: '1rem' }}>
          <Button 
            variant="contained" 
            onClick={handleAddAnswer} 
            startIcon={<PlusCircle />}
            sx={{
              bgcolor: '#9dc45f',
              '&:hover': { bgcolor: '#8ab54e' },
              marginLeft: question.isExplain === "false" ? 0 : '1rem',
              whiteSpace: 'nowrap',
              height: 'auto',
              padding: '0.1rem 1.5rem'
            }}
          >
            Add new answer
          </Button>
        </Box>
        
        <ButtonContainer>
          <ColorButton color="#F08080" variant="contained" onClick={handleCancel}>
            Cancel
          </ColorButton>
          <ColorButton color="#FFD700" variant="contained" onClick={handleEdit}>
            Edit
          </ColorButton>
          <ColorButton color="#98FB98" variant="contained" onClick={handleSave} disabled={!isEditMode}>
            Save
          </ColorButton>
        </ButtonContainer>
      </Paper>
    </>
  );
};

export default VocabularyQuiz;
