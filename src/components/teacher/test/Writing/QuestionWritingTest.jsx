import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  TextField,
} from '@mui/material';
import { PlusCircle } from 'lucide-react';
import { styled } from '@mui/material/styles';
import { AddQuestionTest } from "../Mixing/AddQuestionTest";
import { updateTestWriting ,createTestWriting} from "api/test/TestWritingApi";


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

const QuestionWriting = ({data,handleWriting}) => {
  const [content, setContent] = useState(data?.content || '');
  const [serialNumber, setSerialNumber] = useState(data?.serial);
  const handleSave = async () => {
    data.content = content;
    if (data.id === '') {
      data  = await createTestWriting(data);
      data.type = "WRITING";
      handleWriting(data);
    } else {
      const testwriting  =  await updateTestWriting(data.id, data);
      testwriting.type = "WRITING";
      handleWriting(testwriting);
    }
  };
  

  const handleCancel = () => {

    setContent(data?.content || '');
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#fff9e6', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Writing</Typography>
     
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Serial question: {serialNumber}
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>Content</Typography>
        <Paper sx={{ p: 2, mb: 2 }}>
          <TextField
            multiline
            rows={12}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter the writing prompt or question here..."
          />
        </Paper>

        <ButtonContainer>
        <ColorButton color="#F08080" variant="contained"
        onClick={handleCancel}>
            Cancel
        </ColorButton>
        <ColorButton color="#FFD700" variant="contained">
            Upload
        </ColorButton>
        <ColorButton color="#98FB98" variant="contained"  onClick={handleSave}>
            Save
        </ColorButton>
        </ButtonContainer>
       
      </Box>
    </Box>
  );
};

export default QuestionWriting;