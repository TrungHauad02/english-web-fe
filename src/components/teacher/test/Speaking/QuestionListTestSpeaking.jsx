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
import { DeleteQuestionSpeakingTest } from "./DeleteQuestionSpeakingTest";

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

function QuestionList({ data, handleRowClick, setQuestionUpdate }) {
  const [datamixing, setDatamixing] = useState([]);

  useEffect(() => {
    const initialDataMixing = [
      {
        type: "SPEAKING",
        dataitem: data?.testSpeakings || [],
      },
    ];
    setDatamixing(initialDataMixing);
  }, [data]);

  const getListSerialTest = () => {
    const questions = [];

    datamixing.forEach((data) => {
      if (data.type === "SPEAKING") {
        data.dataitem?.forEach((item) => {
          item.type = data.type;
          const serials = item?.questions?.map((q) => q.serial).filter((serial) => serial != null) || [];
          if (serials.length === 1) {
            item.serialquestion = serials[0];
          } else if (serials.length === 2) {
            item.serialquestion = serials[0] + "-" + serials[1];
          } else if (serials.length > 2) {
            item.serialquestion = serials[0] + "-" + serials[serials.length - 1];
          } else {
            item.serialquestion = "";
          }
          questions.push(item);
        });
      }
    });

    return questions;
  };

  const questions = getListSerialTest();

  const handleAddNewQuestion = async () => {
    const newQuestion = {
      id: "",
      testId: data?.id || "",
      status: "ACTIVE",
      type: "SPEAKING",
      serial: data.testSpeakings && data.testSpeakings.length > 0
        ? data.testSpeakings[data.testSpeakings.length - 1].serial + 1
        : 1,
      image: "",
      content: "",
    };

    handleRowClick(newQuestion);
  };

  const handleDeleteQuestion = async (question) => {
    try {
      let serial = question?.serial || "";
      let minus = 1;
      if (question?.type === "SPEAKING") {
        serial = question?.questions?.length > 0 ? question.questions[question.questions.length - 1].serial : -1;
        question.test = true;
        minus = question?.questions?.length || 0;
      }

      await DeleteQuestionSpeakingTest(data?.id, question, serial, minus);

      setQuestionUpdate(question);
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  return (
    <FormContainer sx={{ bgcolor: "#FFF8DC", p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
        SPEAKING QUESTION LIST
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

export default QuestionList;
