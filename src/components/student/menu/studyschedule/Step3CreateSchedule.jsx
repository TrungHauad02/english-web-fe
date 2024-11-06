import React from 'react';
import { Box, Typography } from '@mui/material';

const Step3CreateSchedule = ({ title, description, frequency, duration, selectedDays, noteDates, time, reminder, endDate }) => {
    return (
        <Box sx={{ paddingRight: 0, background: '#f5f5f5', padding: 2 }}>
            <Typography variant="body2"><strong>Title:</strong> {title}</Typography>
            <Typography variant="body2"><strong>Description:</strong> {description}</Typography>
            <Typography variant="body2"><strong>Frequency:</strong> {frequency}</Typography>
            <Typography variant="body2"><strong>Duration:</strong> {duration} minutes</Typography>

            {frequency === 'weekly' && (
                <Typography variant="body2"><strong>Days:</strong> {selectedDays.length > 0 ? selectedDays.join(', ') : 'None'}</Typography>
            )}

            {frequency === 'monthly' && (
                <Typography variant="body2"><strong>Note Dates:</strong> {noteDates.length > 0 ? noteDates.join(', ') : 'None'}</Typography>
            )}

            <Typography variant="body2"><strong>Time:</strong> {time}</Typography>
            <Typography variant="body2"><strong>Reminder:</strong> {reminder} minutes ago</Typography>
            <Typography variant="body2"><strong>End Date:</strong> {endDate}</Typography>
        </Box>
    );
};

export default Step3CreateSchedule;
