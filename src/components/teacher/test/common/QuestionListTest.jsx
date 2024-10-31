import React, { useState, useEffect } from "react";
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
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { PlusCircle } from "lucide-react";
import DeleteIcon from "@mui/icons-material/DeleteOutline";

import { createTestMixingQuestion,updateTestMixingQuestion,deleteTestMixingQuestion } from "api/test/TestMixingQuestionApi";

import { updateTestReadingQuestion } from "api/test/TestReadingQuestionApi";
import { updateTestListeningQuestion } from "api/test/TestListeningQuestionApi";
import { updateTestSpeakingQuestion } from "api/test/TestSpeakingQuestionApi";

import { createTestListening,deleteTestListening } from "api/test/TestListeningApi";
import { createTestReading,deleteTestReading } from "api/test/TestReadingApi";
import { createTestSpeaking,deleteTestSpeaking } from "api/test/TestSpeakingApi";
import { createTestWriting,updateTestWriting,deleteTestWriting } from "api/test/TestWritingApi";

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#fff5e6",
  borderRadius: theme.spacing(2),
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(3),

  "& .MuiTab-root": {
    backgroundColor: "#D4E9B9",
    margin: "0 0.2rem",
    borderRadius: "0.5rem 0.5rem 0 0",
    color: "black",
    "&.Mui-selected": {
      backgroundColor: "#8BC34A",
      color: "black",
    },
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: theme.spacing(2),
  maxHeight: "300px",
  overflowY: "auto",
  "& .MuiTableCell-head": {
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
  },
}));
function QuestionList({ data, handleRowClick,setQuestionUpdate }) {
  const [currentTab, setCurrentTab] = useState(0);
  const tabs = [
    "VOCABULARY",
    "GRAMMAR",
    "READING",
    "LISTENING",
    "SPEAKING",
    "WRITING",
  ];

  const [datamixing, setDatamixing] = useState([]);

  useEffect(() => {
    const initialDataMixing = [
      {
        type: "VOCABULARY",
        questions: data.testMixingQuestions.filter(
          (question) => question.type === "VOCABULARY"
        ),
      },
      {
        type: "GRAMMAR",
        questions: data.testMixingQuestions.filter(
          (question) => question.type === "GRAMMAR"
        ),
      },
      {
        type: "READING",
        dataitem: data.testReadings,
      },
      {
        type: "LISTENING",
        dataitem: data.testListenings,
      },
      {
        type: "SPEAKING",
        dataitem: data.testSpeakings,
      },
      {
        type: "WRITING",
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

    datamixing.forEach((data) => {
      if (data.type === "GRAMMAR") {
        data.questions.forEach((question) => {
     
          question.serialquestion = question.serial;
          questions.push(question);
        });
      }
      if (data.type === "VOCABULARY") {
        data.questions.forEach((question) => {
 
          question.serialquestion = question.serial ;
          questions.push(question);
        });
      }

      if (data.type === "READING" || data.type === "LISTENING") {
        data.dataitem.forEach((item) => {
          item.type = data.type;
          const serials = item.questions
          .map((q) => q.serial)
          .filter((serial) => serial != null); 
        if (serials.length === 1) {
          item.serialquestion = serials[0];
        } else if (serials.length === 2) {
          item.serialquestion = serials[0] + "-" + serials[1];
        } else if (serials.length > 2) {
          item.serialquestion = serials[0] + "-" + serials[serials.length - 1];
        }
          questions.push(item);
        });
      }

      if (data.type === "WRITING") {
        data.dataitem.forEach((item) =>
        {
          item.type = data.type;
          item.serialquestion = item.serial;
          questions.push(item);
        }
        );
       
      }
      if (data.type === "SPEAKING") {
        data.dataitem.forEach((item) => {
          item.type = data.type;
          const serials = item.questions
          .map((q) => q.serial)
          .filter((serial) => serial != null); 
        if (serials.length === 1) {
          item.serialquestion = serials[0];
        } else if (serials.length === 2) {
          item.serialquestion = serials[0] + "-" + serials[1];
        } else if (serials.length > 2) {
          item.serialquestion = serials[0] + "-" + serials[serials.length - 1];
        }
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
      id: "",
      serial: 0,
      content: "",
      testId: data.id,
      status: "ACTIVE",
      ...(tabs[currentTab] === "VOCABULARY" && {
        type: "VOCABULARY",
        explanation: "",
      }),
      ...(tabs[currentTab] === "GRAMMAR" && {
        type: "GRAMMAR",
        explanation: "",
      }),
      ...(tabs[currentTab] === "READING" && {
        type: "READING",
        image: '',
      }),
      ...(tabs[currentTab] === "LISTENING" && {
        type: "LISTENING",
        transcript:'',
      }),
      ...(tabs[currentTab] === "SPEAKING" && {
        type: "SPEAKING",
        title:'',

      }),
      ...(tabs[currentTab] === "WRITING" && {
        type: "WRITING",
      }),
    };

    try {
      let createdQuestion;
      let highestSerial = 0;
      switch (newQuestion.type) {
        case "VOCABULARY":
          datamixing.forEach((item) => {
            if (item.type.toUpperCase() === newQuestion.type) {
              item.questions.forEach((question) => {
                if (question.serial > highestSerial) {
                  highestSerial = question.serial;
                }
              });
            }
          });
          newQuestion.serial = highestSerial + 1;
          createdQuestion = await createTestMixingQuestion(newQuestion);
          await Promise.all([
            updateGrammarQuestions(datamixing,1,newQuestion.serial-1),
            updateReadingQuestions(datamixing,1,newQuestion.serial-1),
            updateListeningQuestions(datamixing,1,newQuestion.serial-1),
            updateSpeakingQuestions(datamixing,1,newQuestion.serial-1),
            updateWritingQuestions(datamixing,1,newQuestion.serial-1),
          ]);
          break;
        case "GRAMMAR":
          datamixing.forEach((item) => {
            if (item.type.toUpperCase() === newQuestion.type) {
              item.questions.forEach((question) => {
                if (question.serial > highestSerial) {
                  highestSerial = question.serial;
                }
              });
            }
          });
          newQuestion.serial = highestSerial + 1;
          createdQuestion = await createTestMixingQuestion(newQuestion);
          await Promise.all([
            updateReadingQuestions(datamixing,1,newQuestion.serial-1),
            updateListeningQuestions(datamixing,1,newQuestion.serial-1),
            updateSpeakingQuestions(datamixing,1,newQuestion.serial-1),
            updateWritingQuestions(datamixing,1,newQuestion.serial-1),
          ]);
          break;
        case "READING":
          createdQuestion = await createTestReading(newQuestion);
          break;
        case "LISTENING":
          createdQuestion = await createTestListening(newQuestion);
          break;
        case "SPEAKING":
          createdQuestion = await createTestSpeaking(newQuestion);
          break;
        case "WRITING":
          createdQuestion = await createTestWriting(newQuestion);
          break;
        default:
          return;
      }
      const dataforward = {
        ...createdQuestion,
        type: "Vocabulary",
        new: true,
      };
      handleRowClick(dataforward);
    } catch (error) {
      console.error("Failed to add new question:", error);
    }
  };

  const handleDeleteQuestion = async (question) => {
    let serialupdate=question.serial;
    let serialdelete=1
    try {
      switch (question.type) {
        case "VOCABULARY":
        case "GRAMMAR":
          await deleteTestMixingQuestion(question.id);
          break;
        case "READING":
          serialupdate= question.questions[question.questions.length-1].serial;
          serialdelete= question.questions.length;
          await deleteTestReading(question.id);
          break;
        case "LISTENING":
          serialupdate= question.questions[question.questions.length-1].serial;
          serialdelete= question.questions.length;
          await deleteTestListening(question.id);
          break;
        case "SPEAKING":
          serialupdate= question.questions[question.questions.length-1].serial;
          serialdelete= question.questions.length;
          await deleteTestSpeaking(question.id);
          break;
        case "WRITING":
          await deleteTestWriting(question.id);
          break;
        default:
          return;
      }
    
      await Promise.all([
        updateVocabularyQuestions(datamixing,-serialdelete,serialupdate),
        updateGrammarQuestions(datamixing,-serialdelete,serialupdate),
        updateReadingQuestions(datamixing,-serialdelete,serialupdate),
        updateListeningQuestions(datamixing,-serialdelete,serialupdate),
        updateSpeakingQuestions(datamixing,-serialdelete,serialupdate),
        updateWritingQuestions(datamixing,-serialdelete,serialupdate),
      ]);
      setQuestionUpdate(question)
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  return (
    <FormContainer sx={{ bgcolor: "#FFF8DC", p: 3 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4 }}
      >
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
              <TableCell align="center">Type</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQuestions.map((question) => (
              <TableRow
                key={question.id}

              >
                <TableCell    onClick={() => handleRowClick(question)} >{question.serialquestion}</TableCell>
                <TableCell align="center"    onClick={() => handleRowClick(question)}>{question.type.charAt(0) + question.type.slice(1).toLowerCase()}</TableCell>
                <TableCell align="right">
                <IconButton onClick={() => handleDeleteQuestion(question)}>
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
        sx={{
          bgcolor: "#9dc45f",
          "&:hover": { bgcolor: "#8ab54e" },
          marginTop: "1rem",
        }}
      >
        Add new question
      </Button>
    </FormContainer>
  );
}

const updateGrammarQuestions = async (datamixing,serialupdate,questionserialupdate) => {
  const grammarQuestions = datamixing.find((data) => data.type === "GRAMMAR")?.questions;
  if (grammarQuestions) {
    for (const question of grammarQuestions) {
      if(questionserialupdate<question.serial)
        {
          question.serial = question.serial + serialupdate;
          question.type = "GRAMMAR";
          await updateTestMixingQuestion(question.id, question);
        }
    }
  }
};

const updateVocabularyQuestions = async (datamixing,serialupdate,questionserialupdate) => {
  const vocabularyQuestions = datamixing.find((data) => data.type === "VOCABULARY")?.questions;
  if (vocabularyQuestions) {
    for (const question of vocabularyQuestions) {
      console.log(questionserialupdate,"ca");
      if(questionserialupdate<question.serial)
        {
          question.serial = question.serial + serialupdate;
          await updateTestMixingQuestion(question.id, question);
        }
    }
  }
};

const updateReadingQuestions = async (datamixing,serialupdate,questionserialupdate) => {
  const readingItems = datamixing.find((data) => data.type === "READING")?.dataitem;
  if (readingItems) {
    for (const item of readingItems) {
      for (const question of item.questions) {

        if(questionserialupdate<question.serial)
          {
            question.serial = question.serial + serialupdate;
          await updateTestReadingQuestion(question.id, question);
          }
    
      }
    }
  }
};

const updateListeningQuestions = async (datamixing,serialupdate,questionserialupdate) => {
  const listeningItems = datamixing.find((data) => data.type === "LISTENING")?.dataitem;
  if (listeningItems) {
    for (const item of listeningItems) {
      for (const question of item.questions) {

        if(questionserialupdate<question.serial)
          {
            question.serial = question.serial + serialupdate;
            await updateTestListeningQuestion(question.id, question);
          }
   
      }
    }
  }
};

const updateWritingQuestions = async (datamixing,serialupdate,questionserialupdate) => {
  const writingItems = datamixing.find((data) => data.type === "WRITING")?.dataitem;
  if (writingItems) {
    for (const item of writingItems) {
      if(questionserialupdate<item.serial)
        {
          item.serial = item.serial + serialupdate;
          await updateTestWriting(item.id, item);
        }
    
    }
  }
};

const updateSpeakingQuestions = async (datamixing,serialupdate,questionserialupdate) => {
  const speakingItems = datamixing.find((data) => data.type === "SPEAKING")?.dataitem;
  if (speakingItems) {
    for (const item of speakingItems) {
      for (const question of item.questions) {
        if(questionserialupdate<question.serial)
          {
            question.serial = question.serial + serialupdate;
            await updateTestSpeakingQuestion(question.id, question);
          }
  
      }
    }
  }
};

export default QuestionList;
