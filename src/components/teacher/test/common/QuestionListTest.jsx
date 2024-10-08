import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button
} from '@mui/material';
import { Trash, Edit, Save, PlusCircle } from 'lucide-react';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#fff5e6',
  borderRadius: theme.spacing(2),
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(3),

  '& .MuiTab-root': {
    backgroundColor: '#D4E9B9',
    margin: '0 0.2rem',
    borderRadius: '0.5rem 0.5rem 0 0',
    color: 'black',
    '&.Mui-selected': {
      backgroundColor: '#8BC34A',
      color: 'black',
    },
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: theme.spacing(2),
  maxHeight: '300px', 
  overflowY: 'auto', 
  '& .MuiTableCell-head': {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
  },
}));

function QuestionList({data,handleRowClick}) {
  const [currentTab, setCurrentTab] = useState(0);
  const tabs = ['VOCABULARY', 'GRAMMAR', 'READING', 'LISTENING', 'SPEAKING', 'WRITING'];

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };



  const getListSerialTest = () => {
    const questions = []; 

    data.forEach(data => {
        if (data.type === "Vocabulary" || data.type === "Grammar") {
            data.questions.forEach(question => {
                question.type = data.type;
                questions.push(question);
            });
        }

        if (data.type === "Reading" || data.type === "Listening") {
            data.dataitem.forEach(item => {
              item.type = data.type;
              questions.push(item);
              
            });
        }

        if (data.type === "Writing") {
            const datawriting = data.dataitem[0];
            datawriting.type = data.type;
            questions.push(datawriting);
        }
    });

    return questions; 

  }
    const questions = getListSerialTest();
  const filteredQuestions = questions.filter(
    (question) => question.type.toUpperCase() === tabs[currentTab].toUpperCase()
  );

  return (
    <FormContainer sx={{  bgcolor: '#FFF8DC', p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        QUESTION LIST
      </Typography>

      <StyledTabs
        value={currentTab}
        onChange={handleTabChange}
        variant="fullWidth"
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab} />
        ))}
      </StyledTabs>

      <StyledTableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Serial</TableCell>
              <TableCell align='center'>Type</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQuestions.map((question) => (
              <TableRow key={question.serial} 
              onClick={() => handleRowClick(question)} 
              >
                <TableCell>{question.serial}</TableCell>
                <TableCell align='center'>{question.type}</TableCell>
                <TableCell align="right">
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <Button 
          variant="contained" 
          onClick={{}}
          startIcon={<PlusCircle />}
          sx={{ bgcolor: '#9dc45f', '&:hover': { bgcolor: '#8ab54e' },marginTop:'1rem' }}
        >
          Add new question
        </Button>
    </FormContainer>
  );
}

export default QuestionList;
