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
  Switch,
} from "@mui/material";
import ConfirmDialog from "shared/component/confirmDialog/ConfirmDialog";
import { toast } from "react-toastify";
import useColor from "shared/color/Color";
import { styled } from "@mui/material/styles";
import { PlusCircle } from "lucide-react";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { DeleteQuestionTest } from "../Mixing/DeleteQuestionTest";
import { updateTestReading } from "api/test/TestReadingApi";
import { updateTestListening } from "api/test/TestListeningApi";
import { updateTestSpeaking } from "api/test/TestSpeakingApi";
import { updateTestWriting } from "api/test/TestWritingApi";
import { updateTestMixingQuestion } from "api/test/TestMixingQuestionApi";
const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#F0F0F0",
  borderRadius: theme.spacing(2),
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "& .MuiTab-root": {
    backgroundColor: "#E0F7FA",
    margin: "0 0.2rem",
    borderRadius: "0.5rem 0.5rem 0 0",
    color: "black",
    "&.Mui-selected": {
      backgroundColor: "#00796B",
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

function QuestionList({
  data,
  handleRowClick,
  setQuestionUpdate,
  BooleanDeleteSubmitTest,
}) {
  const [currentTab, setCurrentTab] = useState(0);
  const [dataMixing, setDataMixing] = useState([]);

  const { Color2, Color2_1 } = useColor();
  const tabs = [
    "VOCABULARY",
    "GRAMMAR",
    "READING",
    "LISTENING",
    "SPEAKING",
    "WRITING",
  ];
  
  useEffect(() => {
    const initialDataMixing = [
      {
        type: "VOCABULARY",
        questions:
          data?.testMixingQuestions?.filter(
            (question) => question.type === "VOCABULARY"
          ) || [],
      },
      {
        type: "GRAMMAR",
        questions:
          data?.testMixingQuestions?.filter(
            (question) => question.type === "GRAMMAR"
          ) || [],
      },
      {
        type: "READING",
        dataItem: data?.testReadings || [],
      },
      {
        type: "LISTENING",
        dataItem: data?.testListenings || [],
      },
      {
        type: "SPEAKING",
        dataItem: data?.testSpeakings || [],
      },
      {
        type: "WRITING",
        dataItem: data?.testWritings || [],
      },
    ];
    setDataMixing(initialDataMixing);
  }, [data]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const getListSerialTest = () => {
    const questions = [];

    dataMixing.forEach((data) => {
      if (data.type === "GRAMMAR" || data.type === "VOCABULARY") {
        data.questions?.forEach((question) => {
          question.serialQuestion = question.serial || "";
          questions.push(question);
        });
      }

      if (
        data.type === "READING" ||
        data.type === "LISTENING" ||
        data.type === "SPEAKING"
      ) {
        data.dataItem?.forEach((item) => {
          item.type = data.type;
          const serials =
            item?.questions
              ?.map((q) => q.serial)
              .filter((serial) => serial != null) || [];
          if (serials.length === 1) {
            item.serialQuestion = serials[0];
          } else if (serials.length === 2) {
            item.serialQuestion = serials[0] + "-" + serials[1];
          } else if (serials.length > 2) {
            item.serialQuestion =
              serials[0] + "-" + serials[serials.length - 1];
          } else {
            item.serialQuestion = "";
          }
          questions.push(item);
        });
      }
      if (data.type === "WRITING") {
        data.dataItem?.forEach((item) => {
          item.type = data.type;
          item.serialQuestion = item.serial;
          questions.push(item);
        });
      }
    });

    return questions;
  };

  const handleStatusChange = async (event, itemUpdate) => {
  
    const result = await BooleanDeleteSubmitTest();
   
    
    if (!result) {
      return;
    }
  
    let updateStatusFunction;
    switch (itemUpdate.type) {
      case "READING":
        updateStatusFunction = updateTestReading;
        break;
      case "LISTENING":
        updateStatusFunction = updateTestListening;
        break;
      case "SPEAKING":
        updateStatusFunction = updateTestSpeaking;
        break;
      case "WRITING":
        updateStatusFunction = updateTestWriting;
        break;
      default:
        updateStatusFunction = updateTestMixingQuestion;
        break;
    }
   
    
    updateStatusFunction(itemUpdate.id, {
      ...itemUpdate,
      status: event.target.checked ? "INACTIVE" : "ACTIVE",
    })
      .then((response) => {
        toast.success(
          `Status of serial ${itemUpdate.serialQuestion} with  ${
            currentTab > 1 ? "Part" : "Question"
          }  ${tabs[currentTab]} updated successfully!`
        );
        setQuestionUpdate(itemUpdate);
      })
      .catch((error) => {
        toast.error("Failed to update status!");
      });
  };

  const questions = getListSerialTest();

  const filteredQuestions = questions.filter(
    (question) =>
      question.type?.toUpperCase() === tabs[currentTab]?.toUpperCase()
  );

  const handleAddNewQuestion = async () => {
    const result = await BooleanDeleteSubmitTest();

    if (!result) {
      return;
    }

    const newQuestion = {
      id: "",
      testId: data?.id || "",
      status: "ACTIVE",
      ...(tabs[currentTab] === "VOCABULARY" && {
        type: "VOCABULARY",
        explanation: "",
        serial:
          (dataMixing
            .find((data) => data.type === "VOCABULARY")
            ?.questions?.slice(-1)[0]?.serial || 0) + 1,
        content: "",
        answers: [],
      }),
      ...(tabs[currentTab] === "GRAMMAR" && {
        type: "GRAMMAR",
        explanation: "",
        serial:
          (dataMixing
            .find((data) => data.type === "GRAMMAR")
            ?.questions?.slice(-1)[0]?.serial ||
            dataMixing
              .find((data) => data.type === "VOCABULARY")
              ?.questions?.slice(-1)[0]?.serial ||
            0) + 1,
        content: "",
        answers: [],
      }),
      ...(tabs[currentTab] === "READING" && {
        type: "READING",
        serial:
          data.testReadings && data.testReadings.length > 0
            ? data.testReadings[data.testReadings.length - 1].serial + 1
            : 1,
        image: "",
        content: "",
      }),
      ...(tabs[currentTab] === "LISTENING" && {
        type: "LISTENING",
        serial:
          data.testListenings && data.testListenings.length > 0
            ? data.testListenings[data.testListenings.length - 1].serial + 1
            : 1,
        transcript: "",
        content: "",
      }),
      ...(tabs[currentTab] === "SPEAKING" && {
        type: "SPEAKING",
        serial:
          data.testSpeakings && data.testSpeakings.length > 0
            ? data.testSpeakings[data.testSpeakings.length - 1].serial + 1
            : 1,
        title: "",
      }),
      ...(tabs[currentTab] === "WRITING" && {
        type: "WRITING",
        serial:
          data.testWritings && data.testWritings.length > 0
            ? data.testWritings[data.testWritings.length - 1].serial + 1
            : (() => {
                if (data.testSpeakings && data.testSpeakings.length > 0) {
                  const allQuestions = data.testSpeakings.flatMap(
                    (speaking) => speaking.questions || []
                  );
                  if (allQuestions.length > 0) {
                    return Math.max(...allQuestions.map((q) => q.serial)) + 1;
                  }
                }

                if (data.testListenings && data.testListenings.length > 0) {
                  const allQuestions = data.testListenings.flatMap(
                    (listening) => listening.questions || []
                  );
                  if (allQuestions.length > 0) {
                    return Math.max(...allQuestions.map((q) => q.serial)) + 1;
                  }
                }

                if (data.testReadings && data.testReadings.length > 0) {
                  const allQuestions = data.testReadings.flatMap(
                    (reading) => reading.questions || []
                  );
                  if (allQuestions.length > 0) {
                    return Math.max(...allQuestions.map((q) => q.serial)) + 1;
                  }
                }

                if (
                  data.testMixingQuestions &&
                  data.testMixingQuestions.length > 0
                ) {
                  return (
                    Math.max(...data.testMixingQuestions.map((q) => q.serial)) +
                    1
                  );
                }

                return 1;
              })(),
        status: "ACTIVE",

        content: "",
      }),
    };
    handleRowClick(newQuestion);
  };

  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [itemDelete, setItemDelete] = useState(0);

  const handleOpenDialogDelete = async (itemDelete) => {
    const result = await BooleanDeleteSubmitTest();

    if (!result) {
      return;
    }

    setItemDelete(itemDelete);
    setOpenDialogDelete(true);
  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
  };

  const handleAgreeDelete = async () => {
    const result = await BooleanDeleteSubmitTest();

    if (!result) {
      return;
    }
    try {
      let serial = itemDelete?.serial || "";
      let minus = 1;
      if (
        itemDelete?.type === "READING" ||
        itemDelete?.type === "SPEAKING" ||
        itemDelete?.type === "LISTENING"
      ) {
        serial =
          itemDelete?.questions?.length > 0
            ? itemDelete.questions[itemDelete.questions.length - 1].serial
            : -1;
        itemDelete.test = true;
        minus = itemDelete?.questions?.length || 0;
      }

      await DeleteQuestionTest(
        data?.id,
        itemDelete?.type,
        itemDelete,
        serial,
        minus
      )
        .then(() => {
          toast.success(
            `Successfully deleted serial ${itemDelete.serialQuestion} with  ${
              currentTab > 1 ? "Part" : "Question"
            }: ${tabs[currentTab]}.`
          );

          handleCloseDialogDelete();
        })
        .catch(() => {
          toast.error(
            `Failed to delete serial ${itemDelete.serialQuestion} with  ${
              currentTab > 1 ? "Part" : "Question"
            }: ${tabs[currentTab]}.`
          );
          handleCloseDialogDelete();
        });

      setQuestionUpdate(itemDelete);
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  return (
    <FormContainer sx={{ p: 3 }}>
      <ConfirmDialog
        open={openDialogDelete}
        onClose={handleCloseDialogDelete}
        onAgree={handleAgreeDelete}
        title="Confirm Deletion"
        content={`Are you sure you want to delete serial ${
          itemDelete.serialQuestion
        } with ${currentTab > 1 ? "part" : "question"} ${tabs[currentTab]}?`}
        cancelText="Cancel"
        agreeText="Delete"
      />
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
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQuestions.map((question) => (
              <TableRow key={question?.id}>
                <TableCell onClick={() => handleRowClick(question)}>
                  {question?.serialQuestion}
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
        Add new {currentTab > 1 ? "Part" : "Question"} {tabs[currentTab]}
      </Button>
    </FormContainer>
  );
}

export default QuestionList;
