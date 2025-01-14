import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import { updateTest } from "api/test/TestApi";
import HelpTextField from "./HelpTextField";
import SaveEditCancelButton from "./SaveEditCancelButton";

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#F0F0F0",
  borderRadius: theme.spacing(2),
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
}));

function InformationTest({ data, BooleanDeleteSubmitTest }) {
  const [formData, setFormData] = useState(data);
  const backupData = data;
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    let updatedErrors = { ...errors };

    if (name === "title") {
      updatedErrors.title = value ? null : "Title is required";
    }

    if (name === "duration") {
      if (!/^\d*$/.test(value)) {
        updatedErrors.duration = "Duration must be a positive number";
      } else if (value === "" || Number(value) <= 0) {
        updatedErrors.duration = "Duration must be a positive number";
      } else if (Number(value) > 120) {
        updatedErrors.duration = "Duration must be under 120 minutes";
      } else {
        updatedErrors.duration = null;
      }
    }

    if (name === "status") {
      updatedErrors.status = value ? null : "Status is required";
    }

    setErrors(updatedErrors);

    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "duration" ? Number(value) : value,
    }));
  };

  const handleEdit = async () => {
    const result = await BooleanDeleteSubmitTest();

    if (!result) {
      return;
    }
    setEditMode(true);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.title) formErrors.title = "Title is required";
    if (
      !formData.duration ||
      isNaN(formData.duration) ||
      formData.duration <= 0
    ) {
      formErrors.duration = "Duration must be a positive number";
    } else if (formData.duration > 120) {
      formErrors.duration = "Duration must be under 120 minutes";
    }
    if (!formData.status) formErrors.status = "Status is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        const updatedData = await updateTest(data.id, formData)
          .then(() => {
            toast.success(`${data.title} updated successfully!`);
          })
          .catch(() => {
            toast.error(`Failed to update ${data.title}`);
          });
        setFormData((prevState) => ({
          ...prevState,
          ...updatedData,
        }));
        setEditMode(false);
      } catch (error) {
        console.error("Error updating test:", error);
      }
    }
  };

  const handleCancel = () => {
    setFormData(backupData);
    setEditMode(false);
  };

  return (
    <Box maxWidth="sm">
      <FormContainer elevation={3}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          TEST DETAILS MIXED
        </Typography>

        <Box sx={{ mb: 2 }}>
          <HelpTextField
            label="Title *"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={!editMode}
            error={!!errors.title}
            errorText={errors.title}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <HelpTextField
            label="Serial"
            name="serial"
            value={formData.serial}
            onChange={handleChange}
            disabled={true}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <HelpTextField
            label="Duration (min) *"
            name="duration"
            value={formData.duration.toString()} // Ensure string for input
            onChange={handleChange}
            disabled={!editMode}
            error={!!errors.duration}
            errorText={errors.duration}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <HelpTextField
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            disabled={true}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box display="flex" alignItems="center">
            <Typography
              variant="body1"
              style={{
                fontWeight: "bold",
                marginRight: "16px",
                minWidth: "120px",
              }}
            >
              Status
            </Typography>
            <Select
              fullWidth
              value={formData.status}
              onChange={handleChange}
              name="status"
              disabled={!editMode}
              displayEmpty
              sx={{
                height: "3rem",
                borderRadius: "0.5rem",
                backgroundColor: "white",
                "& .MuiSelect-select": {
                  color: "#9E9E9E",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E0E0E0",
                },
              }}
            >
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="INACTIVE">Inactive</MenuItem>
            </Select>
          </Box>
          {errors.status && (
            <Typography
              color="error"
              variant="caption"
              style={{ marginTop: "4px", display: "block" }}
            >
              {errors.status}
            </Typography>
          )}
        </Box>

        <ButtonContainer>
        <SaveEditCancelButton
            onCancel={handleCancel}
            onEdit={handleEdit}
            onSave={handleSave}
            isEditing={editMode}
            size="large"
            spacing={2}
          />
        </ButtonContainer>
      </FormContainer>
    </Box>
  );
}

export default InformationTest;
