// ProfileCard.jsx
import React from 'react';
import { Dialog, DialogContent, Button, Stack, Box, Typography } from '@mui/material';

const Profile = ({ open, handleClose, type, data = {} }) => {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogContent>
                <Stack direction="row" spacing={2} divider={<Box sx={{ width: 2, bgcolor: 'grey.300' }} />}>
                    <Stack spacing={1} alignItems="center" sx={{ width: '40%', justifyContent: 'center' }}>
                        <img
                            src={data.avatar || '/header_user.png'}
                            alt="User"
                            style={{ width: 200, height: 200, borderRadius: "50%" }}
                        />
                    </Stack>
                    <Stack spacing={1} sx={{ width: '60%', pt: 2 }}>
                        <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>
                            {type || "User"}
                        </Typography>
                        <Box sx={{ position: 'relative', mt: 1, mb: 2 }}>
                            <img src="/bg_name_profile.png" alt="Name Background" style={{ width: '100%' }} />
                            <Box sx={{ position: 'absolute', top: '35%', left: '10%', fontSize: 24, fontWeight: 'bold' }}>
                                {data.name || ""}
                            </Box>
                        </Box>
                        <Box sx={{ bgcolor: 'grey.300', p: 2, borderRadius: 2, transition: 'opacity .5s ease-in-out' }}>
                            <Stack spacing={1}>
                                <Box><span style={{ fontWeight: 'bold' }}>Name:</span> {data.name || ""}</Box>
                                <Box><span style={{ fontWeight: 'bold' }}>Email:</span> {data.email || ""}</Box>
                                {type === 'Student' ? (
                                    <>
                                        <Box><span style={{ fontWeight: 'bold' }}>Start Date:</span> {data.startDate || ""}</Box>
                                        <Box><span style={{ fontWeight: 'bold' }}>End Date:</span> {data.endDate || ""}</Box>
                                        <Box><span style={{ fontWeight: 'bold' }}>Status:</span> {data.status || ""}</Box>
                                    </>
                                ) : (
                                    <>
                                        <Box><span style={{ fontWeight: 'bold' }}>Level:</span> {data.level || ""}</Box>
                                        <Box><span style={{ fontWeight: 'bold' }}>Start Date:</span> {data.startDate || ""}</Box>
                                        <Box><span style={{ fontWeight: 'bold' }}>End Date:</span> {data.endDate || ""}</Box>
                                    </>
                                )}
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

export default Profile;
