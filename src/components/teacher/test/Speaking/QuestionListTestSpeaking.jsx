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
  Switch,
} from "@mui/material";
import useColor from "shared/color/Color";
import { styled } from "@mui/material/styles";
import { PlusCircle } from "lucide-react";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { DeleteQuestionSpeakingTest } from "./DeleteQuestionSpeakingTest";
import { updateTestSpeaking } from "api/test/TestSpeakingApi";
import { toast } from "react-toastify";
import ConfirmDialog from "shared/component/confirmDialog/ConfirmDialog";

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

function QuestionList({ data, handleRowClick,BooleanDeleteSubmitTest,  setVersion,
  setQuestionCurrent,
  questionCurrent }) {
  const [dataMixing, setDataMixing] = useState([]);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [itemDelete, setItemDelete] = useState(null);
  const { Color2, Color2_1 } = useColor();
  useEffect(() => {
    const initialDataMixing = [
      {
        type: "SPEAKING",
        dataItem: data?.testSpeakings || [],
      },
    ];
    setDataMixing(initialDataMixing);
  }, [data]);

  const handleStatusChange = async (event, itemUpdate) => {
    const result = await BooleanDeleteSubmitTest();
  
    if (!result) {
      return;
    }
    updateTestSpeaking(itemUpdate.id, {
      ...itemUpdate,
      status: event.target.checked ? "INACTIVE" : "ACTIVE",
    })
      .then(() => {
        toast.success(`Status of serial ${itemUpdate.serialQuestion} updated successfully!`);
        setVersion((prevData) => (prevData || 0) + 1);
      })
      .catch(() => {
        toast.error(`Failed to update status of serial ${itemUpdate.serialQuestion}!`);
      });
  };

  const getListSerialTest = () => {
    const questions = [];

    dataMixing.forEach((data) => {
      if (data.type === "SPEAKING") {
        data.dataItem?.forEach((item) => {
          item.type = data.type;
          const serials = item?.questions?.map((q) => q.serial).filter((serial) => serial != null) || [];
          if (serials.length === 1) {
            item.serialQuestion = serials[0];
          } else if (serials.length === 2) {
            item.serialQuestion = serials[0] + "-" + serials[1];
          } else if (serials.length > 2) {
            item.serialQuestion = serials[0] + "-" + serials[serials.length - 1];
          } else {
            item.serialQuestion = "";
          }
          questions.push(item);
        });
      }
    });

    return questions;
  };

  const questions = getListSerialTest();

  const handleAddNewQuestion = async () => {
    const result = await BooleanDeleteSubmitTest();
  
    if (!result) {
      return;
    }
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

  const handleDeleteQuestion = async () => {
    const result = await BooleanDeleteSubmitTest();
  
    if (!result) {
      return;
    }
    if (!itemDelete) return;

    try {
      let serial = itemDelete?.serial || "";
      let minus = 1;
      if (itemDelete?.type === "SPEAKING") {
        serial = itemDelete?.questions?.length > 0 ? itemDelete.questions[itemDelete.questions.length - 1].serial : -1;
        itemDelete.test = true;
        minus = itemDelete?.questions?.length || 0;
      }

      await DeleteQuestionSpeakingTest(data?.id, itemDelete, serial, minus)
        .then(() => {
          toast.success(`Deleted serial ${itemDelete.serialQuestion} successfully!`);
          if(questionCurrent.id===itemDelete.id)
            {
              setQuestionCurrent(null)
              setVersion((prevData) => (prevData || 0) + 1);
            }
            else
            {
              handleRowClick(questionCurrent)
            }
        })
        .catch(() => {
          toast.error(`Failed to delete serial ${itemDelete.serialQuestion}!`);
        });

      setOpenDialogDelete(false);
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  const handleOpenDialogDelete = async (item) => {
    const result = await BooleanDeleteSubmitTest();

    if (!result) {
      return;
    }
    setItemDelete(item);
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
        content={`Are you sure you want to delete serial ${itemDelete?.serialQuestion} of Test Speaking?`}
        cancelText="Cancel"
        agreeText="Delete"
      />

      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
        SPEAKING QUESTION LIST
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

export default QuestionList;
