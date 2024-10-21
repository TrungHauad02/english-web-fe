import React from 'react';
import { Grid, TextField, Avatar, Button, Card } from '@mui/material';

const StudentInfo = ({ selectedStudent, handleClearSelection, setConfirmDeleteOpen }) => (
    <Card sx={{ height: 500, padding: 2, bgcolor: "#F5F5F5" }}>
        <Grid container spacing={2} style={{ marginTop: '10px' }}>
            <Grid item xs={12} textAlign="center">
                <Avatar
                    alt={selectedStudent?.name || 'Student Avatar'}
                    src={selectedStudent?.avatar || '/icon.png'}
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
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    value={selectedStudent?.startDate || ''}
                    variant="outlined"
                    InputProps={{
                        readOnly: true,
                    }}
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
                />
            </Grid>

            <Grid item xs={12} textAlign="center">
                <Button 
                    variant="contained"
                    color="error"
                    style={{ marginRight: '10px' }}
                    onClick={() => setConfirmDeleteOpen(true)}
                    disabled={!selectedStudent}
                >
                    Delete
                </Button>
                <Button variant="outlined" onClick={handleClearSelection}>
                    Clear
                </Button>
            </Grid>
        </Grid>
    </Card>
);

export default StudentInfo;
