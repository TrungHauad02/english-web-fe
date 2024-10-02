import React from 'react';
import { Dialog, DialogContent, Button, Stack, Box, Typography } from '@mui/material';

const ProfileStudent = ({ open, handleClose, student }) => {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogContent>
                <Stack direction="row" spacing={2} divider={<Box sx={{ width: 2, bgcolor: 'grey.300' }} />}>
                    <Stack spacing={1} alignItems="center" sx={{ width: '40%', justifyContent: 'center' }}>
                        <img
                            src={student.avatar || '/header_user.png'}
                            alt="User"
                            style={{ width: 180, height: 180, borderRadius: '50%' }}
                        />
                    </Stack>

                    <Stack spacing={1} sx={{ width: '60%', pt: 2 }}>
                        <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>
                            Student
                        </Typography>
                        <Box sx={{ position: 'relative', mt: 1, mb: 2 }}>
                            <img src="/bg_name_profile.png" alt="Name Background" style={{ width: '100%' }} />
                            <Box sx={{ position: 'absolute', top: '35%', left: '10%', fontSize: 24, fontWeight: 'bold' }}>
                                {student.name}
                            </Box>
                        </Box>

                        <Box sx={{ bgcolor: 'grey.300', p: 2, borderRadius: 2, transition: 'opacity .5s ease-in-out' }}>
                            <Stack spacing={1}>
                                <Box><span style={{ fontWeight: 'bold' }}>Name:</span> {student.name}</Box>
                                <Box><span style={{ fontWeight: 'bold' }}>Email:</span> {student.email}</Box>
                                <Box><span style={{ fontWeight: 'bold' }}>Start Date:</span> {student.startDate}</Box>
                                {student.status === 'Inactive' && (
                                    <Box><span style={{ fontWeight: 'bold' }}>End Date:</span> {student.endDate}</Box>
                                )}
                                <Box><span style={{ fontWeight: 'bold' }}>Status:</span> {student.status}</Box>
                            </Stack>
                        </Box>


                    </Stack>
                </Stack>
                <Button onClick={handleClose} variant="contained" color="primary" sx={{ mt: 2, float: 'right', bgcolor: '#ACCD0A' }}>
                    Close
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileStudent;
