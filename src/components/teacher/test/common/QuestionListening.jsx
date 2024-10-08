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
const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#fff5e6',
  borderRadius: theme.spacing(2),
}));

const ListeningQuiz = ({data}) => {
  const [audioUrl, setAudioUrl] = useState(data.content);
  const [transcript, setTranscript] = useState(data.transcript);
  const [questions, setQuestions] = useState(data.questions);
  const [selectedQuestion, setSelectedQuestion] = useState(data.questions[0]);
  const [isEditing, setIsEditing] = useState(false);

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    }
  };

  const handleQuestionSelect = (id) => {
    data.questions.forEach((item) => {

      if (item.id === id) {
 
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
    <FormContainer sx={{ p: 3, bgcolor: '#fff9e6', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Listening</Typography>
    
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Content</Typography>
          <Box sx={{ mb: 2 }}>
            <audio controls src={audioUrl} style={{ width: '100%' }} />
            <Button
              variant="contained"
              component="label"
              startIcon={<Upload />}
              sx={{ mt: 1 }}
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

          <Typography variant="h6" sx={{ mb: 2 }}>Transcript</Typography>
          <TextField
            multiline
            rows={6}
            fullWidth
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Typography variant="h6" sx={{ mb: 2  }} >Question listening</Typography>
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
          onClick={{}}
          startIcon={<PlusCircle />}
          sx={{ bgcolor: '#9dc45f', '&:hover': { bgcolor: '#8ab54e' },marginTop:'1rem'} }
        >
          Add new question
        </Button>
        </Box>

        <Box sx={{ flex: 1 }}>
       <QuestionVocabulary 
            question={{ 
              ...selectedQuestion, 
              type: "Question detail" ,
              isExplain: "false",
              details: "true"
            }} 
          />
        </Box>
      </Box>
    </FormContainer>
  );
};

export default ListeningQuiz;
