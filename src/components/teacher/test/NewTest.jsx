import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Select,
  MenuItem,
  Grid,
  Box,
} from '@mui/material';
import { Add, Cancel, Send } from '@mui/icons-material';
import { createTest } from '../../../api/test/TestApi';
import { toast } from 'react-toastify';
import HelpTextField from './common/HelpTextField';

const NewTest = ({ open, onClose, serial, handleBtnDetail }) => {
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

        toast.success(`Created ${test.title} successfully!`);
        handleBtnDetail(test);
        onClose();
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

    if (!/^\d*$/.test(duration)) {
      setDurationError("Duration must be a positive number");
      isValid = false;
    } else if (duration === "" || durationValue <= 0) {
      setDurationError("Duration must be a positive number");
      isValid = false;
    } else if (durationValue > 120) {
      setDurationError("Duration must be under 120 minutes");
      isValid = false;
    } else {
      setDurationError("");
    }
    

    if (testType.trim() === '') {
      setTypeError('Please select a test type');
      isValid = false;
    } else {
      setTypeError('');
    }

    return isValid;
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <HelpTextField
              label="Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={Boolean(titleError)}
              errorText={titleError}
            />
          </Grid>
          <Grid item xs={12}>
            <HelpTextField
              label="Serial*"
              value={serial}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12}>
            <HelpTextField
              label="Duration (min)*"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              error={Boolean(durationError)}
              errorText={durationError}
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Typography
                variant="body1"
                style={{ fontWeight: 'bold', marginRight: '16px', minWidth: '120px' }}
              >
                Type *
              </Typography>
              <Select
                value={testType}
                onChange={(e) => setTestType(e.target.value)}
                variant="outlined"
                style={{ flexGrow: 1 }}
              >
                <MenuItem value="MIXING">Mixing</MenuItem>
                <MenuItem value="READING">Reading</MenuItem>
                <MenuItem value="LISTENING">Listening</MenuItem>
                <MenuItem value="SPEAKING">Speaking</MenuItem>
                <MenuItem value="WRITING">Writing</MenuItem>
              </Select>
            </Box>
            {typeError && (
              <Typography color="error" variant="caption" style={{ marginTop: '4px', display: 'block' }}>
                {typeError}
              </Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          startIcon={<Cancel />}
          style={{ backgroundColor: "#D9D9D9", color: 'black' }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          startIcon={<Send />}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTest;
