import React from "react";
import {
  Box,
  Typography,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Button,
} from "@mui/material";
import { Trash, PlusCircle } from "lucide-react";

const QuestionComponent = ({
  question,
  questionData,
  isEditMode,
  handleInputChange,
  handleAnswerChange,
  handleSelectAnswer,
  handleDeleteAnswer,
  handleAddAnswer,
  setSelectedAnswer,
  selectedAnswer,
  errors,
  setQuestionData,
  Color2,
  Color2_1,
  listening,
}) => {
  return (
    <Box>
      <Box sx={{ mb: 3, p: 2, bgcolor: "#F0F0F0" }}>
        <Box
          sx={{
            bgcolor: "#ffffff",
            display: "flex",
            alignItems: "center",
            mb: 2,
            padding: "0.5rem 1rem",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
            transform: "translateX(-10px)",
          }}
        >
          <Typography variant="h6" sx={{ mr: 1 }}>
            Serial
          </Typography>
          <Box
            sx={{
              bgcolor: "#e0e0e0",
              borderRadius: "50%",
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 1,
              padding: "0.5rem",
            }}
          >
            {question.serial}
          </Box>
          <Typography variant="h6" sx={{ mr: 1 }}>
            :
          </Typography>
          <TextField
            fullWidth
            disabled={!isEditMode}
            value={questionData.content || ""}
            onChange={(e) => handleInputChange("content", e.target.value)}
            error={!!errors.content}
            helperText={errors.content}
          />
        </Box>

        <Box sx={{ bgcolor: "#ffffff", padding: "0.5rem 1rem" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              borderRadius: "8px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                whiteSpace: "nowrap",
                paddingTop: "0.5rem",
              }}
            >
              Answers:
            </Typography>
            <Box sx={{ flex: 1 }}>
              <RadioGroup
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              >
                {questionData.answers.map((answer) => (
                  <Box
                    key={answer.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      bgcolor: "#FFFFFF",
                      borderRadius: "8px",
                      padding: "0.5rem 1rem",
                    }}
                  >
                    <TextField
                      disabled={!isEditMode}
                      sx={{
                        flexGrow: 1,
                        "& .MuiInputBase-root": {
                          bgcolor: "#F0F0F0",
                          borderRadius: "4px",
                        },
                      }}
                      value={answer.content}
                      onChange={(e) =>
                        handleAnswerChange(answer.id, e.target.value)
                      }
                      error={
                        !!errors.answers && errors.answers.includes(answer.id)
                      }
                      helperText={
                        errors.answers && errors.answers.includes(answer.id)
                          ? "Answer content cannot be empty."
                          : ""
                      }
                    />

                    <FormControl sx={{ width: 120, ml: 2 }}>
                      <Select
                        value={answer.status || "ACTIVE"}
                        disabled={!isEditMode}
                        onChange={(e) => {
                          const updatedAnswers = questionData.answers.map(
                            (opt) =>
                              opt.id === answer.id
                                ? { ...opt, status: e.target.value }
                                : opt
                          );
                          setQuestionData({
                            ...questionData,
                            answers: updatedAnswers,
                          });
                        }}
                      >
                        <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                        <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControlLabel
                      control={
                        <Radio
                          disabled={!isEditMode}
                          onChange={() => handleSelectAnswer(answer.id)}
                        />
                      }
                      label=""
                      value={answer.id}
                      sx={{ marginLeft: "1rem" }}
                    />
                    <IconButton
                      onClick={() => handleDeleteAnswer(answer)}
                      color="error"
                      disabled={!isEditMode}
                    >
                      <Trash />
                    </IconButton>
                  </Box>
                ))}
              </RadioGroup>
            </Box>
          </Box>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
            {!listening && (
              <>
                <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
                  Explain:
                </Typography>
                <TextField
                  sx={{
                    flex: 1,
                    "& .MuiInputBase-root": {
                      height: "3rem",
                      bgcolor: "#F0F0F0",
                      borderRadius: "4px",
                    },
                  }}
                  multiline
                  rows={2}
                  value={questionData.explanation || ""}
                  onChange={(e) =>
                    handleInputChange("explanation", e.target.value)
                  }
                  disabled={!isEditMode}
                  error={!!errors.explanation}
                  helperText={errors.explanation}
                />
              </>
            )}
            <Button
              variant="contained"
              onClick={handleAddAnswer}
              startIcon={<PlusCircle />}
              sx={{
                bgcolor: Color2_1,
                "&:hover": { bgcolor: Color2 },
                whiteSpace: "nowrap",
                height: "3rem",
              }}
              disabled={!isEditMode}
            >
              Add new answer
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionComponent;
