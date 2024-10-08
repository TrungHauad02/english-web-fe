import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GoogleIcon from '@mui/icons-material/Google';

import Step1CreateSchedule from './Step1CreateSchedule';
import Step2CreateSchedule from './Step2CreateSchedule';
import Step3CreateSchedule from './Step3CreateSchedule';

const CreateSchedule = ({ open, onClose }) => {
  const [step, setStep] = useState(1);
  const [frequency, setFrequency] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(':');
  const [reminder, setReminder] = useState();
  const [endDate, setEndDate] = useState('//');
  const [selectedDays, setSelectedDays] = useState([]);
  const [duration, setDuration] = useState('');
  const [noteDates, setNoteDates] = useState([]);

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => prev - 1);
  const handleFrequencyChange = (event, newFrequency) => setFrequency(newFrequency);
  const handleNoteDateChange = (event) => setNoteDates(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" disableScrollLock>
      <DialogTitle>
        {'Create an event'}
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {step === 1 && (
          <Step1CreateSchedule
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          />
        )}

        {step === 2 && (
          <Step2CreateSchedule
            frequency={frequency}
            handleFrequencyChange={handleFrequencyChange}
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
            time={time}
            setTime={setTime}
            reminder={reminder}
            setReminder={setReminder}
            endDate={endDate}
            setEndDate={setEndDate}
            duration={duration}
            setDuration={setDuration}
            noteDates={noteDates}
            handleNoteDateChange={handleNoteDateChange}
          />
        )}

        {step === 3 && (
          <Step3CreateSchedule
            title={title}
            description={description}
            frequency={frequency}
            duration={duration}
            selectedDays={selectedDays}
            noteDates={noteDates}
            time={time}
            reminder={reminder}
            endDate={endDate}
          />
        )}

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

export default CreateSchedule;
