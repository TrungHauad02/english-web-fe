import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MainPicture from "../../common/listTopic/MainPicture";
import CreateSchedule from "./CreateSchedule";

const StudySchedulePage = () => {
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog

  const StudyReminderCard = () => (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h6">Study reminder</Typography>
          <Typography variant="body2">12:00 Daily</Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <GoogleIcon sx={{ fontSize: 18, color: "#4CAF50" }} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              Added to Google Calendar
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Button
            color="primary"
            startIcon={<EditIcon />}
            sx={{ mr: 1, justifyContent: "flex-start" }}
            onClick={() => console.log("Edit Clicked")}
          >
            Edit
          </Button>
          <Button
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ justifyContent: "flex-start" }}
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
      <MainPicture
        src="https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_study_schedule.png?alt=media"
        title="Study Schedule"
      />
      <Box sx={{ p: 4 }}>
        <Box mx="5%">
          <Typography variant="body1" sx={{ mb: 2 }}>
            Studying a little every day will help your knowledge accumulate.
            Research shows that learners who make studying a habit are more
            likely to achieve their goals. Set aside time to study and get
            reminders using a study scheduler.
          </Typography>

          <Grid container spacing={4}>
            {/* Left side: Study Schedule list */}
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "1rem",
                  p: 2,
                  height: "25rem",
                  overflowY: "auto",
                }}
              >
                <StudyReminderCard />
                <StudyReminderCard />
                <StudyReminderCard />
                <StudyReminderCard />
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fcreate_study_schedule.png?alt=media"
                  alt="Create Study Schedule"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                />
                <Button
                  variant="contained"
                  color="warning"
                  size="large"
                  sx={{
                    mt: 2,
                    fontSize: "18px",
                    fontWeight: "bold",
                    borderRadius: "8px",
                  }}
                  onClick={() => setOpenDialog(true)}
                >
                  Create Study Schedule
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <CreateSchedule open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  );
};

export default StudySchedulePage;
