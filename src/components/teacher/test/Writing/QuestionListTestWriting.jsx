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
  Switch
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { PlusCircle } from "lucide-react";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { deleteTestWriting, updateTestWriting } from "api/test/TestWritingApi";
import { toast } from "react-toastify";
import ConfirmDialog from "shared/component/confirmDialog/ConfirmDialog";
import useColor from "shared/color/Color";

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#F0F0F0",
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


function QuestionListWriting({ data, handleRowClick,BooleanDeleteSubmitTest,  setVersion,
  setQuestionCurrent,
  questionCurrent }) {
  const [questions, setQuestions] = useState([]);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [itemDelete, setItemDelete] = useState(null);
  const { Color2, Color2_1 } = useColor();

  useEffect(() => {
    if (data?.testWritings) {
      const formattedQuestions = data.testWritings.map((item) => ({
        ...item,
        type: "WRITING",
        serialQuestion: item.serial,
      }));
      setQuestions(formattedQuestions);
    }
  }, [data]);

  const handleStatusChange = async (event, itemUpdate) => {
    const result = await BooleanDeleteSubmitTest();
  
    if (!result) {
      return;
    }
    updateTestWriting(itemUpdate.id, {
      ...itemUpdate,
      status: event.target.checked ? "INACTIVE" : "ACTIVE",
    })
      .then(() => {
        toast.success(`Status of serial ${itemUpdate.serial} updated successfully!`);
        setVersion((prevData) => (prevData || 0) + 1);
      })
      .catch(() => {
        toast.error(`Failed to update status of serial ${itemUpdate.serial}!`);
      });
  };

  const handleAddNewQuestion = async () => {
    const result = await BooleanDeleteSubmitTest();
  
    if (!result) {
      return;
    }
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

  const handleDeleteQuestion = async () => {
    if (!itemDelete) return;

    try {
      await Promise.all(
        data?.testWritings.map(async (testWriting) => {
          if (testWriting.serial > itemDelete.serial) {
            testWriting.serial -= 1;
            await updateTestWriting(testWriting.id, testWriting);
          }
        })
      );

      await deleteTestWriting(itemDelete.id);
      toast.success(`Deleted serial ${itemDelete.serialQuestion} test writing successfully!`);
      if(questionCurrent.id===itemDelete.id)
        {
          setQuestionCurrent(null)
          setVersion((prevData) => (prevData || 0) + 1);
        }
        else
        {
          handleRowClick(questionCurrent)
        }
        
      setOpenDialogDelete(false);
    } catch (error) {
      toast.error(`Failed to delete serial ${itemDelete.serialQuestion}!`);
      console.error("Failed to delete question:", error);
    }
  };

  const handleOpenDialogDelete = async (question) => {
    const result = await BooleanDeleteSubmitTest();

    if (!result) {
      return;
    }
    setItemDelete(question);
    setOpenDialogDelete(true);
  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
    setItemDelete(null);
  };

  return (
    <FormContainer>
      <ConfirmDialog
        open={openDialogDelete}
        onClose={handleCloseDialogDelete}
        onAgree={handleDeleteQuestion}
        title="Confirm Deletion"
        content={`Are you sure you want to delete serial ${itemDelete?.serialQuestion} of Test Writing?`}
        cancelText="Cancel"
        agreeText="Delete"
        sx={{
          bgcolor: "#FFFFFF",
          padding: 2,
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      />

      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
        WRITING QUESTION LIST
      </Typography>

      <StyledTableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Serial</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question?.id}>
                <TableCell onClick={() => handleRowClick(question)}>{question?.serialQuestion}</TableCell>
                <TableCell align="center" onClick={() => handleRowClick(question)}>
                  {question?.type?.charAt(0) + question?.type?.slice(1)?.toLowerCase()}
                </TableCell>
                <TableCell align="center">
                  <Switch
                    checked={question.status === "ACTIVE"}
                    onChange={(event) => handleStatusChange(event, question)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenDialogDelete(question)}>
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
          bgcolor: Color2_1,
          "&:hover": { bgcolor: Color2 },
          marginTop: "1rem",
        }}
      >
        Add new part
      </Button>
    </FormContainer>
  );
}

export default QuestionListWriting;
