import React, { useState } from "react";
import { Box, Typography, Paper, TextField } from "@mui/material";
import { updateTestWriting } from "api/test/TestWritingApi";
import { createTestWriting } from "api/test/TestWritingApi";
import { toast } from "react-toastify";
import SaveEditCancelButton from "../common/SaveEditCancelButton";


const QuestionWriting = ({ data, handleWriting, BooleanDeleteSubmitTest,setQuestionCurrent }) => {
  const [content, setContent] = useState(data?.content || "");
  const serialNumber = data.serial;
  const [isEditing, setIsEditing] = useState(data.id === "" ? true : false);

  const handleEdit = async () => {
    const result = await BooleanDeleteSubmitTest();

    if (!result) {
      return;
    }
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      data.content = content;
      if (!content.trim()) {
        toast.error("Content cannot be empty.");
        return;
      }
      if (data.id === "") {
        data = await createTestWriting(data);
        data.type = "WRITING";
        handleWriting(data);
        toast.success(
          `Successfully created question serial ${data.serial} of Part Writing.`
        );
      } else {
        const testWriting = await updateTestWriting(data.id, data);
        testWriting.type = "WRITING";
        handleWriting(testWriting);
        toast.success(
          `Successfully updated question serial ${data.serial} of Part Writing.`
        );
      }
    } catch (error) {
      toast.error("An error occurred while saving the question.");
    }
  };

  const handleCancel = () => {
    if(data.id==='')
    {
      setQuestionCurrent(null)
    }
    setContent(data?.content || "");
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#F7F7F7",
        marginRight: "5%",
        marginLeft: "5%",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          WRITING
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: "500", color: "#333" }}
        >
          Serial question: {serialNumber}
        </Typography>

        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: "500", color: "#333" }}
        >
          Content:
        </Typography>
        <Paper
          sx={{
            p: 2,
            mb: 2,
            bgcolor: "#FFFFFF",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <TextField
            multiline
            rows={12}
            fullWidth
            value={content}
            disabled={!isEditing}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter the writing prompt or question here..."
            sx={{
              "& .MuiInputBase-root": {
                bgcolor: "#F9F9F9",
                borderRadius: "4px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#DDD",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#BBB",
              },
            }}
          />
        </Paper>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <SaveEditCancelButton
            onCancel={handleCancel}
            onEdit={handleEdit}
            onSave={handleSave}
            isEditing={isEditing}
            size="large"
            spacing={2}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionWriting;
