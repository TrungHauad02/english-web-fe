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

const TestSpeakingForm = ({ initialData, onSave }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [serial, setSerial] = useState(initialData?.serial || 0);
  const [questions, setQuestions] = useState(initialData?.questions || []);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleAddNewQuestion = () => {
    setQuestions([
      ...questions,
      { id: '', content: '', serial: questions.length + 1, status: 'ACTIVE' },
    ]);
  };

  const handleDeleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = questions.map((question, i) =>
      i === index ? { ...question, [field]: value } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleSave = () => {
    const dataToSave = {
      title,
      serial,
      questions,
    };
    onSave(dataToSave);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setTitle(initialData?.title || '');
    setSerial(initialData?.serial || 0);
    setQuestions(initialData?.questions || []);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  return (
    <Container maxWidth="lg">
      <OuterContainer>
        <Typography variant="h4" gutterBottom>
          SPEAKING TEST
        </Typography>
        <FormContainer>
          <Box mb={3} display="flex" alignItems="center">
            <TextField
              label="Serial"
              type="number"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              disabled={!isEditMode}
              sx={{ width: '10ch', mr: 2 }}
            />
            <TextField
              label="Test Speaking Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={!isEditMode}
            />
          </Box>

          <Typography variant="h5" gutterBottom>Questions:</Typography>
          {questions.map((question, index) => (
            <Box key={index} display="flex" alignItems="center" mb={2}>
              <TextField
                label={`Question ${index + 1}`}
                fullWidth
                value={question.content}
                onChange={(e) =>
                  handleQuestionChange(index, 'content', e.target.value)
                }
                disabled={!isEditMode}
                sx={{ mr: 2 }}
              />
              {isEditMode && (
                <IconButton onClick={() => handleDeleteQuestion(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}

          {isEditMode && (
            <Button
              variant="outlined"
              startIcon={<PlusCircle />}
              onClick={handleAddNewQuestion}
              sx={{ mb: 3 }}
            >
              Add new question
            </Button>
          )}

          <ButtonContainer>
            {isEditMode ? (
              <>
                <ColorButton color="#F08080" variant="contained" onClick={handleCancel}>
                  Cancel
                </ColorButton>
                <ColorButton color="#98FB98" variant="contained" onClick={handleSave}>
                  Save
                </ColorButton>
              </>
            ) : (
              <ColorButton color="#FFD700" variant="contained" onClick={handleEdit}>
                Edit
              </ColorButton>
            )}
          </ButtonContainer>
        </FormContainer>
      </OuterContainer>
    </Container>
  );
};

export default TestSpeakingForm;
