import React, { useState } from 'react';
import { TextField, Button, FormControl, Dialog, DialogActions, DialogContent, DialogTitle, Typography, IconButton, MenuItem, Select, Grid, Box } from '@mui/material';
import { Add, Cancel, Send } from '@mui/icons-material';
import { createTest } from '../../../api/test/TestApi';
import {  toast } from 'react-toastify';
const NewTest = ({ open, onClose, serial, handlebtnDetail }) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [testType, setTestType] = useState('');
  const [titleError, setTitleError] = useState('');
  const [durationError, setDurationError] = useState('');
  const [typeError, setTypeError] = useState('');

  const handleSubmit = async () => {
    if (validateInput()) {
      try {
        const test = await createTest({
          id: '',
          title: title,
          duration: duration,
          serial: serial,
          type: testType.toUpperCase(),
          status: 'ACTIVE',
        });
    
        toast.success(`created ${test.title}  successfully!`);
        handlebtnDetail(test);
      
      } catch (error) {
        toast.error(`Failed to create test ${title}`);
    
      }
 
    }
    
    
  };

  const validateInput = () => {
    let isValid = true;

    if (title.trim() === '') {
      setTitleError('Title cannot be empty');
      isValid = false;
    } else {
      setTitleError('');
    }

    const durationValue = parseInt(duration.trim(), 10);
    if (isNaN(durationValue) || durationValue <= 0) {
      setDurationError('Duration must be a valid positive integer');
      isValid = false;
    } else {
      setDurationError('');
    }

    if (testType.trim() === '') {
      setTypeError('Please select a test type');
      isValid = false;
    } else {
      setTypeError('');
    }

    return isValid;
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    if (value.trim() === '') {
      setTitleError('Title cannot be empty');
    } else {
      setTitleError('');
    }
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    setDuration(value);
    const durationValue = parseInt(value.trim(), 10);
    if (isNaN(durationValue) || durationValue <= 0) {
      setDurationError('Duration must be a valid positive integer');
    } else {
      setDurationError('');
    }
  };

  const handleTestTypeChange = (e) => {
    setTestType(e.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Add color="primary" style={{ marginRight: '8px' }} />
          <Typography variant="h5" component="div" color="primary">
            Create New Test
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" style={{ marginBottom: '16px', fontSize: '1rem', color: '#555' }}>
          Please fill in the details to create a new test.
        </Typography>
        <Grid container spacing={2} alignItems="center">
          

          <Grid item xs={4}>
            <Typography variant="body1" color="textSecondary">Title *</Typography>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth margin="normal">
              <TextField
                value={title}
                onChange={handleTitleChange}
                error={Boolean(titleError)}
                helperText={titleError || ' '}
                variant="outlined"
                color="secondary"
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" color="textSecondary">Serial</Typography>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth margin="normal">
              <TextField
                value={serial}
                variant="outlined"
                color="secondary"
                InputProps={{
                  readOnly: true,
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body1" color="textSecondary">Duration (minutes) *</Typography>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth margin="normal">
              <TextField
                value={duration}
                onChange={handleDurationChange}
                type="number"
                error={Boolean(durationError)}
                helperText={durationError || ' '}
                variant="outlined"
                color="secondary"
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body1" color="textSecondary">Type *</Typography>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth margin="normal">
              <Select
                value={testType}
                onChange={handleTestTypeChange}
                variant="outlined"
                color="secondary"
              >
                <MenuItem value="MIXING">Mixing</MenuItem>
                <MenuItem value="READING">Reading</MenuItem>
                <MenuItem value="LISTENING">Listening</MenuItem>
                <MenuItem value="SPEAKING">Speaking</MenuItem>
                <MenuItem value="WRITING">Writing</MenuItem>
              </Select>
              {typeError && <Typography color="error">{typeError}</Typography>}
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center', padding: '16px' }}>
        <Button
          onClick={onClose}
          variant="contained"
          startIcon={<Cancel />}
          style={{ backgroundColor: '#ffcc00', color: 'black', marginRight: '10px' }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          startIcon={<Send />}
          style={{ backgroundColor: '#6200ea', color: 'white', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTest;
