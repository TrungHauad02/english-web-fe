import React, { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  InputLabel,
  Paper,
  FormControl,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#fff5e6',
  borderRadius: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(3),
    backgroundColor: 'white',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
}));

const ColorButton = styled(Button)(({ color }) => ({
  borderRadius: '8px',
  padding: '8px 24px',
  backgroundColor: color,
  color: color === '#98FB98' ? 'black' : 'white',
  '&:hover': {
    backgroundColor: color,
    opacity: 0.9,
  },
}));

function InformationTest({data}) {
  const [formData, setFormData] = useState(data);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Box maxWidth="sm">
      <FormContainer elevation={3}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
          TEST DETAILS MIXED
        </Typography>

        <StyledTextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <StyledTextField
          fullWidth
          label="Serial"
          name="serial"
          value={formData.serial}
          onChange={handleChange}
        />

        <StyledTextField
          fullWidth
          label="Duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />

        <StyledTextField
          fullWidth
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        />

        {/* Select for Status with InputLabel */}
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            fullWidth
            value={formData.status}
            onChange={handleChange}
            name="status"
            label="Status"
            displayEmpty
            sx={{
              borderRadius: 6,
              backgroundColor: 'white',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <MenuItem value="">
              <em>Select Status</em>
            </MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>

        <ButtonContainer>
          <ColorButton color="#F08080" variant="contained">
            Cancel
          </ColorButton>
          <ColorButton color="#FFD700" variant="contained">
            Edit
          </ColorButton>
          <ColorButton color="#98FB98" variant="contained">
            Save
          </ColorButton>
        </ButtonContainer>
      </FormContainer>
    </Box>
  );
}

export default InformationTest;
