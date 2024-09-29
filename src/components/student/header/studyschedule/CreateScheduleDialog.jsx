import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Button, TextField, IconButton, ToggleButtonGroup, ToggleButton, MenuItem, Select, Typography, FormControl, InputLabel, OutlinedInput, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GoogleIcon from '@mui/icons-material/Google';
import InputAdornment from '@mui/material/InputAdornment';

const CreateScheduleDialog = ({ open, onClose }) => {
  const [step, setStep] = useState(1);
  const [frequency, setFrequency] = useState('once');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('12:00');
  const [reminder, setReminder] = useState(30);
  const [endDate, setEndDate] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [duration, setDuration] = useState('');
  const [noteDates, setNoteDates] = useState([]);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handleFrequencyChange = (event, newFrequency) => {
    setFrequency(newFrequency);
    if (newFrequency !== 'weekly') {
      setSelectedDays([]);
    }
    if (newFrequency !== 'daily' && newFrequency !== 'weekly' && newFrequency !== 'monthly') {
      setDuration('');
    }
    if (newFrequency !== 'monthly') {
      setNoteDates([]);
    }
  };

  const handleNoteDateChange = (event) => {
    const {
      target: { value },
    } = event;
    setNoteDates(typeof value === 'string' ? value.split(',') : value);
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
        )}

        {/* Step 2 */}
        {step === 2 && (
          <Box sx={{ paddingRight: 0 }}>
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

            {/* Custom UI for Weekly */}

            {frequency === 'weekly' && (
              <>
                <TextField
                  label="Duration"
                  type="number"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
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
                    endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
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

            {frequency === 'daily' && (
              <>
                <TextField
                  label="Duration"
                  type="number"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
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
                    endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
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

            {frequency === 'monthly' && (
              <>
                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                  <InputLabel id="note-date-label">Note Dates</InputLabel>
                  <Select
                    labelId="note-date-label"
                    id="note-date-select"
                    multiple
                    value={noteDates}
                    onChange={handleNoteDateChange}
                    input={<OutlinedInput label="Note Dates" />}
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                      <MenuItem key={date} value={date}>
                        {date}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Duration"
                  type="number"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
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
                    endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
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
          <Box sx={{ paddingRight: 0, background: '#f5f5f5', padding: 2 }}>
            <Typography variant="body2">
              <strong>Title:</strong> {title}
            </Typography>
            <Typography variant="body2">
              <strong>Description:</strong> {description}
            </Typography>
            <Typography variant="body2">
              <strong>Frequency:</strong> {frequency}
            </Typography>
            <Typography variant="body2">
              <strong>Duration:</strong> {duration} minutes
            </Typography>
            {frequency === 'weekly' && (
              <Typography variant="body2">
                <strong>Days:</strong> {selectedDays.length > 0 ? selectedDays.join(', ') : 'None'}
              </Typography>
            )}
            {frequency === 'monthly' && (
              <Typography variant="body2">
                <strong>Note Dates:</strong> {noteDates.length > 0 ? noteDates.join(', ') : 'None'}
              </Typography>
            )}
            <Typography variant="body2">
              <strong>Time:</strong> {time}
            </Typography>
            <Typography variant="body2">
              <strong>Reminder:</strong> {reminder} minutes ago
            </Typography>
            <Typography variant="body2">
              <strong>End Date:</strong> {endDate}
            </Typography>
          </Box>
        )}

        {/* Navigation buttons */}
        <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
          <Button onClick={handlePrevious} disabled={step === 1}>
            <ArrowBackIosIcon />
            Back
          </Button>
          {step < 3 ? (
            <Button onClick={handleNext}>
              Next
              <ArrowForwardIosIcon />
            </Button>
          ) : (
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ width: '50%', mb: 2, background: '#f44336', color: '#fff' }}
            >
              Sign in with Google
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateScheduleDialog;
