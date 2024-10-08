import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MainPicture from '../../common/listTopic/MainPicture';
import CreateSchedule from './CreateSchedule'; // Import popup mới

const StudySchedulePage = () => {
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog

  const StudyReminderCard = () => (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6">Study reminder</Typography>
          <Typography variant="body2">12:00 Daily</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <GoogleIcon sx={{ fontSize: 18, color: '#4CAF50' }} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              Added to Google Calendar
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Button
            color="primary"
            startIcon={<EditIcon />}
            sx={{ mr: 1, justifyContent: 'flex-start' }}
            onClick={() => console.log("Edit Clicked")}
          >
            Edit
          </Button>
          <Button
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ justifyContent: 'flex-start' }} 
            onClick={() => console.log("Remove Clicked")}
          >
            Remove
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <>
      <MainPicture src="/bg_study_schedule.png" title="Study Schedule" />
      <Box sx={{ p: 4 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Studying a little every day will help your knowledge accumulate.
          Research shows that learners who make studying a habit are more likely to achieve their goals.
          Set aside time to study and get reminders using a study scheduler.
        </Typography>

        <Grid container spacing={4}>
          {/* Bên trái: danh sách Study Schedule */}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: '1rem',
                p: 2,
                height: '25rem', // Chiều cao cố định cho khung Study Schedule
                overflowY: 'auto', // Hiển thị thanh scroll khi nội dung tràn
              }}
            >
              <StudyReminderCard />
              <StudyReminderCard />
              <StudyReminderCard />
              <StudyReminderCard />
            </Box>
          </Grid>

          {/* Bên phải: Hình ảnh và nút Create Schedule */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img
                src="/create_study_schedule.png"
                alt="Create Study Schedule"
                style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }}
              />
              <Button
                variant="contained"
                color="warning"
                size="large"
                sx={{ mt: 2, fontSize: '18px', fontWeight: 'bold', borderRadius: '8px' }}
                onClick={() => setOpenDialog(true)}
              >
                Create Study Schedule
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Hiển thị Popup khi nhấn "Create Study Schedule" */}
      <CreateSchedule open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  );
};

export default StudySchedulePage;
