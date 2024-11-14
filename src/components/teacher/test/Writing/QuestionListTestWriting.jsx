import React, { useState, useEffect } from "react";
import {
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
import { deleteTestWriting, updateTestWriting } from 'api/test/TestWritingApi';

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#fff5e6",
  borderRadius: theme.spacing(2),
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

function QuestionListWriting({ data, handleRowClick, setQuestionUpdate }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (data?.testWritings) {
      const formattedQuestions = data.testWritings.map((item) => ({
        ...item,
        type: "WRITING",
        serialquestion: item.serial,
      }));
      setQuestions(formattedQuestions);
    }
  }, [data]);

  const handleAddNewQuestion = async () => {
    const newQuestion = {
      id: "",
      testId: data?.id || "",
      status: "ACTIVE",
      type: "WRITING",
      serial: data.testWritings && data.testWritings.length > 0
        ? data.testWritings[data.testWritings.length - 1].serial + 1
        : 1,
      content: "",
    };

    handleRowClick(newQuestion);
  };

  const handleDeleteQuestion = async (question) => {

    await Promise.all(data?.testWritings.map(async (testWriting) => {
        if (testWriting.serial > question.serial) {
            testWriting.serial -= 1;
            await updateTestWriting(testWriting.id, testWriting);
        }
    }));
    await deleteTestWriting(question)

      setQuestionUpdate(question);
   
  };

  return (
    <FormContainer sx={{ bgcolor: "#FFF8DC", p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
        WRITING QUESTION LIST
      </Typography>

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
            {questions.map((question) => (
              <TableRow key={question?.id}>
                <TableCell onClick={() => handleRowClick(question)}>{question?.serialquestion}</TableCell>
                <TableCell align="center" onClick={() => handleRowClick(question)}>
                  {question?.type?.charAt(0) + question?.type?.slice(1)?.toLowerCase()}
                </TableCell>
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

export default QuestionListWriting;
