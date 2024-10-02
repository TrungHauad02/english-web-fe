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


const VocabularyQuiz = ({ question }) => {
  const [questionvoca, setQuestionvoca] = useState(question);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); 

  const handleAddAnswer = () => {
    const newAnswer = {
      id: `as${questionvoca.serial}-${questionvoca.options.length + 1}`,
      content: '',
      isCorrect: false
    };
    setQuestionvoca({
      ...questionvoca,
      options: [...questionvoca.options, newAnswer]
    });
  };

  

  const handleCheckboxChange = (answerId) => {
    setQuestionvoca({
      ...questionvoca,
      options: questionvoca.options.map(a =>
        a.id === answerId ? { ...a, isCorrect: !a.isCorrect } : a
      )
    });
  };

  const handleDeleteAnswer = (answerId) => {
    setQuestionvoca({
      ...questionvoca,
      options: questionvoca.options.filter(a => a.id !== answerId)
    });
  };

  const handleSave = () => {
 
  };

  const handleCancel = () => {

  };

  const handleEdit = () => {
    setIsEditMode(!isEditMode); 
    setSelectedAnswer(findCorrectAnswerId(question.options));

  };

  return (
    <Box sx={{ p: 3, bgcolor: '#fff9e6', minHeight: '100vh' }}>
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
            mr: 1
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
          onChange={(e) => setSelectedAnswer(e.target.value)} 
        >
          {questionvoca.options.map((answer) => (
            <Box key={answer.id} sx={{ display: 'flex', alignItems: 'center', mb: 1, borderRadius: '4px', justifyContent: 'space-between' }}>
              <TextField
                disabled={!isEditMode}
                sx={{ flexGrow: 1 }}
                value={answer.content}
                onChange={(e) => {
                  const updatedOptions = questionvoca.options.map(opt =>
                    opt.id === answer.id ? { ...opt, content: e.target.value } : opt
                  );
                  setQuestionvoca({ ...questionvoca, options: updatedOptions });
                }}
              />
              <FormControlLabel
                control={
                  <Radio 
                  checked={isEditMode ? selectedAnswer === answer.id : answer.isCorrect}  
                  disabled={!isEditMode}
                />
                
                }
                label=""
                value={answer.id}
                sx={{marginLeft:'1rem'}}
              />
              <IconButton onClick={() => handleDeleteAnswer(answer.id)} color="error">
                <Trash />
              </IconButton>
            </Box>
          ))}
        </RadioGroup>
        {
          question.isExplain==="false" ? null : 
          <Typography variant="h6" sx={{ mt: 2 }}>Explain:</Typography>
        }
        
    
        <Box sx={{ display: 'flex' }}>
        {
          question.isExplain==="false" ? null : 
          <TextField
            sx={{ width: '90%' }}
            multiline
            rows={2}
            value={questionvoca.explanation}
            onChange={(e) => {
              setQuestionvoca({ ...questionvoca, explanation: e.target.value });
            }}
            disabled={!isEditMode} 
          />
        }
       
          <Button 
            variant="contained" 
            onClick={handleAddAnswer} 
            startIcon={<PlusCircle />}
            sx={{
              bgcolor: '#9dc45f',
              '&:hover': { bgcolor: '#8ab54e' },
              marginLeft: question.isExplain === "false" ? 0 : '1rem' 
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
    </Box>
  );
};

export default VocabularyQuiz;
