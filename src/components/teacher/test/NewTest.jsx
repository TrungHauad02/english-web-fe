import React, { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, Dialog, DialogActions, DialogContent, DialogTitle, Typography, IconButton } from '@mui/material';
import { Add, Cancel, Send } from '@mui/icons-material';
import { Box } from '@mui/system';
import { createTest } from '../../../api/test/TestApi';

const NewTest = ({ open, onClose, serial, type,handlebtnDetail }) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');  

  const [titleError, setTitleError] = useState('');
  const [durationError, setDurationError] = useState('');

  const handleSubmit =  async () => {
    if (validateInput()) {
        
     const test = await   createTest({
        id: '',
        title: title,
        duration: duration,
        serial: serial,
        type: type.toUpperCase(),
        status: 'ACTIVE',
      });
      handlebtnDetail(test);
   
    }
  };

  const validateInput = () => {
    let isValid = true;

    // Kiểm tra trường title
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

    return isValid;
  };

  // Hàm validate cho từng trường khi onChange
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm" // Đặt chiều rộng tối đa của dialog
      fullWidth // Giúp dialog luôn có chiều rộng đầy đủ
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
        <FormControl fullWidth margin="normal">
          <TextField
            label="Serial"
            value={serial}
            variant="outlined"
            color="secondary"
            InputProps={{
              readOnly: true,
            }}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Title"
            value={title}
            onChange={handleTitleChange}
            error={Boolean(titleError)}
            helperText={titleError || ' '}
            variant="outlined"
            color="secondary"
            FormHelperTextProps={{ style: { minHeight: '20px', whiteSpace: 'nowrap' } }} // Đảm bảo chiều cao và không xuống dòng
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Duration (minutes)"
            value={duration}
            onChange={handleDurationChange}
            type="number"
            error={Boolean(durationError)}
            helperText={durationError || ' '}
            variant="outlined"
            color="secondary"
            FormHelperTextProps={{ style: { minHeight: '20px', whiteSpace: 'nowrap' } }} // Đảm bảo chiều cao và không xuống dòng
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Test Type"
            value={type}
            variant="outlined"
            color="secondary"
            InputProps={{
              readOnly: true,
            }}
          />
        </FormControl>
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