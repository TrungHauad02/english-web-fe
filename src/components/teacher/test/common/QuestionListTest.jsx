import React, { useState,useEffect } from 'react';
import {
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
import { styled } from '@mui/material/styles';
import { PlusCircle } from 'lucide-react';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { createTestMixingQuestion ,updateTestMixingQuestion } from '../../../../api/teacher/test/TestMixingQuestionApi'; 
import { createListening } from '../../../../api/teacher/test/TestListeningApi'; 
import { createReading } from '../../../../api/teacher/test/TestReadingApi'; 
import { createSpeaking } from '../../../../api/teacher/test/TestSpeakingApi'; 
import { createWriting } from '../../../../api/teacher/test/TestWritingApi'; 

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
function QuestionList({ data, handleRowClick }) {
  const [currentTab, setCurrentTab] = useState(0);
  const tabs = ['VOCABULARY', 'GRAMMAR', 'READING', 'LISTENING', 'SPEAKING', 'WRITING'];

  const [datamixing, setDatamixing] = useState([]);

  useEffect(() => {
    const initialDataMixing = [
      {
        type: "Vocabulary",
        questions: data.testMixingQuestions.filter(
          question => question.type === "VOCABULARY"
        )
      },
      {
        type: "Grammar",
        questions: data.testMixingQuestions.filter(
          question => question.type === "GRAMMAR"
        )
      },
      {
        type: "Reading",
        dataitem: data.testReadings,
      },
      {
        type: "Listening",
        dataitem: data.testListenings,
      },
      {
        type: "Speaking",
        dataitem: data.testSpeakings,
      },
      {
        type: "Writing",
        dataitem: data.testWritings,
      },
    ];
    setDatamixing(initialDataMixing);
  }, [data]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const getListSerialTest = () => {
    const questions = [];

    datamixing.forEach(data => {
      if (data.type === "Grammar") {
        data.questions.forEach(question => {
          question.type = data.type;
          question.serialquestion = question.serial;
          questions.push(question);
        });
      }
      if (data.type === "Vocabulary") {
        data.questions.forEach(question => {
          question.type = data.type;
          question.serialquestion = question.serial;
          questions.push(question);
        });
      }

      if (data.type === "Reading" || data.type === "Listening") {
        data.dataitem.forEach(item => {
          item.type = data.type;
          item.serialquestion = item.questions[0].serial + '-' + item.questions[2].serial;
          questions.push(item);
        });
      }

      if (data.type === "Writing") {
        const datawriting = data.dataitem[0];
        datawriting.type = data.type;
        datawriting.serialquestion = datawriting.serial;
        questions.push(datawriting);
      }
      if (data.type === "Speaking") {
        data.dataitem.forEach(item => {
          item.type = data.type;
          item.serialquestion = item.questions[0].serial + '-' + item.questions[item.questions.length-1].serial;
          questions.push(item);
        });
      }
    });
    

    return questions;
  };

  const questions = getListSerialTest();

  const filteredQuestions = questions.filter(
    (question) => question.type.toUpperCase() === tabs[currentTab].toUpperCase()
  );

  const handleAddNewQuestion = async () => {
    const newQuestion = {
      id: '',
      content: '',
      status: 'ACTIVE',
      serial: 0,
      explanation: '',
      ...(tabs[currentTab] === 'VOCABULARY' && {
        type: 'VOCABULARY',
        testId: data.testVocabularyQuestions[0].testId,
      }),
      ...(tabs[currentTab] === 'GRAMMAR' && {
        type: 'GRAMMAR',
      }),
      ...(tabs[currentTab] === 'READING' && {
        type: 'READING',
      }),
      ...(tabs[currentTab] === 'LISTENING' && {
        type: 'LISTENING',
      }),
      ...(tabs[currentTab] === 'SPEAKING' && {
        type: 'SPEAKING',
      }),
      ...(tabs[currentTab] === 'WRITING' && {
        type: 'WRITING',
      }),
    };

    try {
      let createdQuestion;
      switch (newQuestion.type) {
        case 'VOCABULARY':
  
          break;
        case 'GRAMMAR':
     
          break;
        case 'READING':
          createdQuestion = await createReading(newQuestion);
          break;
        case 'LISTENING':
          createdQuestion = await createListening(newQuestion);
          break;
        case 'SPEAKING':
          createdQuestion = await createSpeaking(newQuestion);
          break;
        case 'WRITING':
          createdQuestion = await createWriting(newQuestion);
          break;
        default:
          return;
      }
      const dataforward = {
        ...createdQuestion,
        type: 'Vocabulary',
        new: true
      };
      handleRowClick(dataforward);

    } catch (error) {
      console.error("Failed to add new question:", error);
    }
  };

  return (
    <FormContainer sx={{ bgcolor: '#FFF8DC', p: 3 }}>
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
              <TableRow key={question.id} onClick={() => handleRowClick(question)}>
                <TableCell>{question.serialquestion}</TableCell>
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
        onClick={handleAddNewQuestion}
        startIcon={<PlusCircle />}
        sx={{ bgcolor: '#9dc45f', '&:hover': { bgcolor: '#8ab54e' }, marginTop: '1rem' }}
      >
        Add new question
      </Button>
    </FormContainer>
  );
}

export default QuestionList;