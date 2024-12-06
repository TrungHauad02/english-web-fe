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
import { styled } from "@mui/material/styles";
import ConfirmDialog from "shared/component/confirmDialog/ConfirmDialog";
import { toast } from "react-toastify";
import useColor from "shared/color/Color";
import { PlusCircle } from "lucide-react";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { DeleteQuestionReadingTest } from "./DeleteQuestionReadingTest";
import { updateTestReading } from "api/test/TestReadingApi";

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

function QuestionList({
  data,
  handleRowClick,
  setQuestionUpdate,
  BooleanDeleteSubmitTest,
}) {
  const [datamixing, setDatamixing] = useState([]);
  const { Color2, Color2_1 } = useColor();

  useEffect(() => {
    const initialDataMixing = [
      {
        type: "READING",
        dataitem: data?.testReadings || [],
      },
    ];
    setDatamixing(initialDataMixing);
  }, [data]);

  const handleStatusChange = async (event, itemUpdate) => {
    const result = await BooleanDeleteSubmitTest();

    if (!result) {
      return;
    }

    updateTestReading(itemUpdate.id, {
      ...itemUpdate,
      status: event.target.checked ? "INACTIVE" : "ACTIVE",
    })
      .then((response) => {
        toast.success(
          `Status of serial ${itemUpdate.serialquestion} with Reading updated successfully!`
        );
        setQuestionUpdate(itemUpdate);
      })
      .catch((error) => {
        toast.error("Failed to update status!");
      });
  };
  const getListSerialTest = () => {
    const questions = [];

    datamixing.forEach((data) => {
      if (data.type === "READING") {
        data.dataitem?.forEach((item) => {
          item.type = data.type;
          const serials =
            item?.questions
              ?.map((q) => q.serial)
              .filter((serial) => serial != null) || [];
          if (serials.length === 1) {
            item.serialquestion = serials[0];
          } else if (serials.length === 2) {
            item.serialquestion = serials[0] + "-" + serials[1];
          } else if (serials.length > 2) {
            item.serialquestion =
              serials[0] + "-" + serials[serials.length - 1];
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
    const result = await BooleanDeleteSubmitTest();

    if (!result) {
      return;
    }
    const newQuestion = {
      id: "",
      testId: data?.id || "",
      status: "ACTIVE",
      type: "READING",
      serial:
        data.testReadings && data.testReadings.length > 0
          ? data.testReadings[data.testReadings.length - 1].serial + 1
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
    try {
      let serial = itemDelete?.serial || "";
      let minus = 1;
      if (itemDelete?.type === "READING") {
        serial =
          itemDelete?.questions?.length > 0
            ? itemDelete.questions[itemDelete.questions.length - 1].serial
            : -1;
        itemDelete.test = true;
        minus = itemDelete?.questions?.length || 0;
      }

      await DeleteQuestionReadingTest(data?.id, itemDelete, serial, minus)
        .then((response) => {
          toast.success(`Deleted ${data.serial} of Test Reading successfully!`);
          setQuestionUpdate(data);
        })
        .catch((error) => {
          toast.error("Failed to delete !");
        });
      setOpenDialogDelete(false);

      setQuestionUpdate(itemDelete);
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [itemDelete, setItemDelete] = useState(0);

  const handleOpenDialogDelete = (itemDelete) => {
    setItemDelete(itemDelete);
    setOpenDialogDelete(true);
  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
  };

  return (
    <FormContainer sx={{ bgcolor: "#", p: 3 }}>
      <ConfirmDialog
        open={openDialogDelete}
        onClose={handleCloseDialogDelete}
        onAgree={handleDeleteQuestion}
        title="Confirm Deletion"
        content={`Are you sure you want to delete serial ${itemDelete.serialquestion} of Test Reading?`}
        cancelText="Cancel"
        agreeText="Delete"
      />
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        READING QUESTION LIST
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
                <TableCell onClick={() => handleRowClick(question)}>
                  {question?.serialquestion}
                </TableCell>
                <TableCell
                  align="center"
                  onClick={() => handleRowClick(question)}
                >
                  {question?.type?.charAt(0) +
                    question?.type?.slice(1)?.toLowerCase()}
                </TableCell>

                <TableCell align="center">
                  <Switch
                    checked={question.status === "ACTIVE"}
                    onChange={(event) => handleStatusChange(event, question)}
                    inputProps={{ "aria-label": "controlled" }}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: Color2,
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: Color2,
                        },
                      "& .MuiSwitch-track": {
                        backgroundColor: "#ccc",
                      },
                    }}
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
