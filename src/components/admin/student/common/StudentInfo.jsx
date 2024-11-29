import React from 'react';
import { Grid, TextField, Avatar, Button, Card } from '@mui/material';
import useColor from "shared/color/Color";

const StudentInfo = ({
  selectedStudent,
  setConfirmDeleteOpen,
  handleDelete,
  handleClear,
  setReload,
  setPage
}) => {
  const { Color2_1 } = useColor();

  return (
    <Card sx={{ height: 450, padding: 2, bgcolor: "#F5F5F5" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="center">
          <Avatar
            alt={selectedStudent?.name || 'Student Avatar'}
            src={selectedStudent?.avatar || '/header_user.png'}
            sx={{ width: 100, height: 100, margin: '0 auto' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            value={selectedStudent?.name || ''}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            value={selectedStudent?.email || ''}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            value={selectedStudent?.startDate || '//' }
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Status"
            value={selectedStudent?.status || ''}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color={selectedStudent.status === "INACTIVE" ? "primary" : "error"}
                sx={{ bgcolor: selectedStudent.status === "INACTIVE" ? Color2_1 : '#FF6655' }}
                onClick={selectedStudent.status === "INACTIVE" ? handleDelete : () => setConfirmDeleteOpen(true)}
              >
                {selectedStudent.status === "INACTIVE" ? "Restore" : "Delete"}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleClear}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default StudentInfo;
