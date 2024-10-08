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
  '& .MuiOutlinedInput-root': {
    height: '3rem',
    borderRadius: '0.5rem',
    backgroundColor: 'white',
    '& input': {
      color: '#9E9E9E',
    },
    '& fieldset': {
      borderColor: '#E0E0E0',
    },
  },
  '& .MuiInputLabel-root': {
    display: 'none',
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
}));

const ColorButton = styled(Button)(({ color }) => ({
  borderRadius: '1rem',
  padding: '1rem 2rem',
  backgroundColor: color,
  color: 'white',
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

        <Box sx={{ mb: 1 }}>
  <Typography variant="h7" sx={{ mb: 1, fontWeight: 'bold' }}>Title</Typography>
  <StyledTextField
    fullWidth
    placeholder="Speaking Detail 1"
    name="title"
    value={formData.title}
    onChange={handleChange}
  />
</Box>

<Box sx={{ mb: 1 }}>
  <Typography variant="h7" sx={{ mb: 1, fontWeight: 'bold' }}>Serial</Typography>
  <StyledTextField
    fullWidth
    placeholder="1"
    name="serial"
    value={formData.serial}
    onChange={handleChange}
  />
</Box>

<Box sx={{ mb: 1 }}>
  <Typography variant="h7" sx={{ mb: 1, fontWeight: 'bold' }}>Duration</Typography>
  <StyledTextField
    fullWidth
    placeholder="Duration"
    name="duration"
    value={formData.duration}
    onChange={handleChange}
  />
</Box>

<Box sx={{ mb: 1 }}>
  <Typography variant="h7" sx={{ mb: 1, fontWeight: 'bold' }}>Type</Typography>
  <StyledTextField
    fullWidth
    placeholder="Type"
    name="type"
    value={formData.type}
    onChange={handleChange}
  />
</Box>

<Box sx={{ mb: 1 }}>
  <Typography variant="h7" sx={{ mb: 1, fontWeight: 'bold' }}>Status</Typography>
  <FormControl fullWidth>
    <Select
      value={formData.status}
      onChange={handleChange}
      name="status"
      displayEmpty
      sx={{
        height: '3rem',
        borderRadius: '0.5rem',
        backgroundColor: 'white',
        '& .MuiSelect-select': {
          color: '#9E9E9E',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#E0E0E0',
        },
      }}
    >
      <MenuItem value="">
     
      </MenuItem>
      <MenuItem value="active">Active</MenuItem>
      <MenuItem value="inactive">Inactive</MenuItem>
    </Select>
  </FormControl>
</Box>

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