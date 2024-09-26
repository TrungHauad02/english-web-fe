import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Button, TextField, IconButton, ToggleButtonGroup, ToggleButton, MenuItem, Select, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GoogleIcon from '@mui/icons-material/Google';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const CreateScheduleDialog = ({ open, onClose }) => {
  const [step, setStep] = useState(1); // State to track the current step
  const [frequency, setFrequency] = useState('once'); // Example state for frequency
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('12:00');
  const [reminder, setReminder] = useState(30);
  const [endDate, setEndDate] = useState('');

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handleFrequencyChange = (event, newFrequency) => {
    setFrequency(newFrequency);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {'Create an event'}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* Step 1 */}
        {step === 1 && (
          <Box>
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
        )}

        {/* Step 2 */}
        {step === 2 && (
        <Box>
            {/* Frequency selection */}
            <ToggleButtonGroup
            value={frequency}
            exclusive
            onChange={handleFrequencyChange}
            fullWidth
            sx={{ mb: 2 }}
            >
            <ToggleButton value="daily">Daily</ToggleButton>
            <ToggleButton value="weekly">Weekly</ToggleButton>
            <ToggleButton value="monthly">Monthly</ToggleButton>
            </ToggleButtonGroup>

            {/* Custom UI for Daily */}
            {frequency === 'daily' && (
            <>
                <TextField
                label="Duration"
                type="number"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                InputProps={{
                    endAdornment: (
                    <Select defaultValue="minutes">
                        <MenuItem value="minutes">Minutes</MenuItem>
                        <MenuItem value="hours">Hours</MenuItem>
                    </Select>
                    ),
                }}
                />
                <TextField
                label="Time"
                type="time"
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                />
                <TextField
                label="Reminder"
                type="number"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
                InputProps={{
                    endAdornment: (
                    <Select defaultValue="minutes-ago">
                        <MenuItem value="minutes-ago">Minutes ago</MenuItem>
                        <MenuItem value="hours-ago">Hours ago</MenuItem>
                    </Select>
                    ),
                }}
                />
                <TextField
                label="End date"
                type="date"
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                />
            </>
            )}

            {/* Custom UI for Weekly */}
            {frequency === 'weekly' && (
            <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                {['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <ToggleButton key={day} value={day}>
                    {day}
                    </ToggleButton>
                ))}
                </Box>
                <TextField
                label="Duration"
                type="number"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                InputProps={{
                    endAdornment: (
                    <Select defaultValue="minutes">
                        <MenuItem value="minutes">Minutes</MenuItem>
                        <MenuItem value="hours">Hours</MenuItem>
                    </Select>
                    ),
                }}
                />
                <TextField
                label="Time"
                type="time"
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                />
                <TextField
                label="Reminder"
                type="number"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
                InputProps={{
                    endAdornment: (
                    <Select defaultValue="minutes-ago">
                        <MenuItem value="minutes-ago">Minutes ago</MenuItem>
                        <MenuItem value="hours-ago">Hours ago</MenuItem>
                    </Select>
                    ),
                }}
                />
                <TextField
                label="End date"
                type="date"
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                />
            </>
            )}

            {/* Custom UI for Monthly */}
            {frequency === 'monthly' && (
            <>
                <TextField
                label="Note date"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                placeholder="Enter specific dates (e.g., 2, 5, 10)"
                />
                <TextField
                label="Duration"
                type="number"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                InputProps={{
                    endAdornment: (
                    <Select defaultValue="minutes">
                        <MenuItem value="minutes">Minutes</MenuItem>
                        <MenuItem value="hours">Hours</MenuItem>
                    </Select>
                    ),
                }}
                />
                <TextField
                label="Time"
                type="time"
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                />
                <TextField
                label="Reminder"
                type="number"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
                InputProps={{
                    endAdornment: (
                    <Select defaultValue="minutes-ago">
                        <MenuItem value="minutes-ago">Minutes ago</MenuItem>
                        <MenuItem value="hours-ago">Hours ago</MenuItem>
                    </Select>
                    ),
                }}
                />
                <TextField
                label="End date"
                type="date"
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                />
            </>
            )}
        </Box>
        )}


        {/* Step 3 */}
        {step === 3 && (
          <Box>
            <Box sx={{ backgroundColor: '#f0f0f0', p: 2, mb: 2 }}>
              <Typography variant="body2">
                Time: {new Date().toLocaleDateString()}
              </Typography>
              <Typography variant="body2">
                Reminder {reminder} minutes in advance
              </Typography>
              <Typography variant="body2">
                5 minutes notice at {time}
              </Typography>
              <Typography variant="body2">
                Until {endDate || 'No end date set'}
              </Typography>
            </Box>

            {/* Google Sign-in */}
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ width: '100%', mb: 2 }}
            >
              Sign in with Google
            </Button>
          </Box>
        )}
      </DialogContent>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Button
          startIcon={<ArrowBackIosIcon />}
          onClick={handlePrevious}
          disabled={step === 1}
        >
          Previous
        </Button>
        <Button
          endIcon={<ArrowForwardIosIcon />}
          onClick={handleNext}
          disabled={step === 3} // Adjust for final step
        >
          Next
        </Button>
      </Box>
    </Dialog>
  );
};

export default CreateScheduleDialog;
