import React from 'react';
import { Box, TextField } from '@mui/material';

const Step1CreateSchedule = ({ title, setTitle, description, setDescription }) => {
  return (
    <Box sx={{ paddingRight: 0 }}>
      <TextField
        fullWidth
        label="Title"
        variant="outlined"
        sx={{ mb: 3 }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        fullWidth
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </Box>
  );
};

export default Step1CreateSchedule;
