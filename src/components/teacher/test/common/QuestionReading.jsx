import React, { useState } from 'react';
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
  Checkbox
} from '@mui/material';
import { Trash, Edit, Save, Upload, PlusCircle } from 'lucide-react';
import { styled } from '@mui/material/styles';
import QuestionVocabulary from "./QuestionVocabulary"



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

const QuestionReading = ({data}) => {
  const [imageUrl, setImageUrl] = useState(data.image);
  const [content, setContent] = useState(data.content);
  const [questions, setQuestions] = useState(data.questions);
  const [selectedQuestion, setSelectedQuestion] = useState(data.questions[0]);
  const [isEditing, setIsEditing] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleQuestionSelect = (id) => {
    data.questions.forEach((item) => {
      if (item.id === id) {
        console.log(item);
        
        setSelectedQuestion(item);
      }
    });
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#fff9e6', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Reading</Typography>
  
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Image</Typography>
          <Box sx={{ mb: 2 }}>
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt="Reading content" 
                style={{ 
                  width: '100%', 
                  height: '200px', 
                  objectFit: 'cover',
                  marginBottom: '10px'
                }} 
              />
            )}
            <Button
              variant="contained"
              component="label"
              startIcon={<Upload />}
            >
              Upload
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
          </Box>

          <Typography variant="h6" sx={{ mb: 2 }}>Content</Typography>
          <TextField
            multiline
            rows={6}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Typography variant="h6" sx={{ mb: 2 }}>Question reading</Typography>
          <TableContainer component={Paper} sx={{ maxHeight: 200, overflowY: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Serial</TableCell>
                  <TableCell align='center'>Question content</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.map((question) => (
                  <TableRow 
                    key={question.id}
                    onClick={() => handleQuestionSelect(question.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{question.id}</TableCell>
                    <TableCell>{question.content}</TableCell>
                    <TableCell>
                      <IconButton>
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
          sx={{ bgcolor: '#9dc45f', '&:hover': { bgcolor: '#8ab54e' } ,marginTop:'1rem'}}
        >
          Add new question
        </Button>
        </Box>

        <Box sx={{ flex: 1,  }}>
  <QuestionVocabulary 
    question={{ 
      ...selectedQuestion, 
      type: "Question detail" 
    }} 
  />
</Box>

      </Box>
    </Box>
  );
};

export default QuestionReading;