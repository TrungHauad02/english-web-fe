import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Trash, Upload, PlusCircle } from "lucide-react";
import { styled } from "@mui/material/styles";
import QuestionReadingDetails from "./QuestionReadingDetails";
import { updateTestReading } from "api/test/TestReadingApi"; // import API

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#fff5e6",
  borderRadius: theme.spacing(2),
}));

function QuestionReading({ data }) {
  const [formData, setFormData] = useState({
    imageUrl: data.image,
    content: data.content,
    questions: data.questions,
    selectedQuestion: data.questions[0],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [backupContent, setBackupContent] = useState(data.content);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, imageUrl: url }));
    }
  };

  const handleQuestionSelect = (id) => {
    const item = formData.questions.find((item) => item.id === id);
    if (item) {
      setFormData((prev) => ({ ...prev, selectedQuestion: item }));
    }
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => {
      if (prev) {
        setFormData((prevData) => ({ ...prevData, content: backupContent }));
      } else {
        setBackupContent(formData.content);
      }
      return !prev;
    });
  };

  const handleSave = () => {
    const updatedData = {
      ...data,
      content: formData.content,
      image: formData.imageUrl,
    };
    updateTestReading(updatedData)
      .then((response) => {
        console.log("Test updated successfully:", response);
      })
      .catch((error) => {
        console.error("Error updating test:", error);
      });
    setIsEditing(false);
  };

  const handleDeleteQuestion = (id) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((question) => question.id !== id),
    }));
  };

  return (
    <FormContainer sx={{ p: 3, bgcolor: "#fff9e6", minHeight: "100vh" }}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h4">Reading</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Image
            </Typography>
            <Box sx={{ mb: 2 }}>
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Reading content"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                />
              )}
              <Button
                variant="contained"
                component="label"
                startIcon={<Upload />}
              >
                Upload
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            </Box>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Content
            </Typography>
            <TextField
              multiline
              rows={6}
              fullWidth
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              sx={{ mb: 3 }}
              disabled={!isEditing} // Disable when not editing
            />

            <Typography variant="h6" sx={{ mb: 2 }}>
              Questions
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ maxHeight: 200, overflowY: "auto" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Serial</TableCell>
                    <TableCell align="center">Question Content</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formData.questions.map((question) => (
                    <TableRow
                      key={question.id}
                      onClick={() => handleQuestionSelect(question.id)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>{question.id}</TableCell>
                      <TableCell>{question.content}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleDeleteQuestion(question.id)}
                          color="error"
                        >
                          <Trash />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              startIcon={<PlusCircle />}
              sx={{
                bgcolor: "#9dc45f",
                "&:hover": { bgcolor: "#8ab54e" },
                marginTop: "1rem",
              }}
            >
              Add new question
            </Button>
          </Box>
          <Box sx={{ flex: 1 }}>
            <QuestionReadingDetails
              question={{
                ...formData.selectedQuestion,
                type: "Question detail",
                details: "true",
              }}
              key={formData.selectedQuestion.serial}
            />
          </Box>
        </Box>

        <Box
          sx={{ display: "flex", marginTop: "1rem", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            onClick={handleEditToggle}
            sx={{
              bgcolor: isEditing ? "#F08080" : "#FFD700",
              "&:hover": { bgcolor: isEditing ? "#D05252" : "#FFC107" },
              marginRight: "1rem",
            }}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ bgcolor: "#98FB98", "&:hover": { bgcolor: "#8ab54e" } }}
            disabled={!isEditing}
          >
            Save
          </Button>
        </Box>
      </Box>
    </FormContainer>
  );
}

export default QuestionReading;
