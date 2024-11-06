// Step2CreateSchedule.js
import React from 'react';
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  TextField,
  InputAdornment,
} from '@mui/material';

const Step2CreateSchedule = ({
  frequency,
  handleFrequencyChange,
  selectedDays,
  setSelectedDays,
  time,
  setTime,
  reminder,
  setReminder,
  endDate,
  setEndDate,
  duration,
  setDuration,
  noteDates,
  handleNoteDateChange,
}) => {
  return (
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
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel id="week-day-label">Select Days</InputLabel>
            <Select
              labelId="week-day-label"
              id="week-day-select"
              multiple
              value={selectedDays}
              onChange={(e) => setSelectedDays(e.target.value)}
              input={<OutlinedInput label="Select Days" />}
            >
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                (day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                )
              )}
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

      {/* Custom UI for Daily */}
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

      {/* Custom UI for Monthly */}
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
  );
};

export default Step2CreateSchedule;
