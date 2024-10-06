import React, { useState } from 'react';
import { Dialog, DialogContent, Button, Stack, Box, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ChangePassword from './../../account/ChangePassword';

const Profile = ({ open, handleClose }) => {
    const [name, setName] = useState('Thái Thanh Hưng');
    const [email] = useState('web@gmail.com');
    const [userNote, setUserNote] = useState('I will be determined to learn the lessons and do the tests.');
    const [editMode, setEditMode] = useState(false);
    const [image, setImage] = useState('/header_user.png');
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);

    const handleEditProfile = () => {
        setEditMode(true);
    };

    const handleSave = () => {
        setEditMode(false);
        console.log('Updated info:', { name, email, userNote, image });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChangePasswordOpen = () => {
        setChangePasswordOpen(true);
    };
    const handleChangePasswordClose = () => {
        setChangePasswordOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogContent>
                <Stack direction="row" spacing={2} divider={<Box sx={{ width: 2, bgcolor: 'grey.300' }} />}>

                    <Stack spacing={1} alignItems="center" sx={{ width: '40%', justifyContent: 'center' }}>
                        {/* Button containing image */}
                        <label htmlFor="upload-button">
                            <input
                                accept="image/*"
                                id="upload-button"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                                disabled={!editMode}
                            />
                            <Button component="span" sx={{ p: 0 }}>
                                <img
                                    src={image}
                                    alt="User"
                                    style={{ width: 180, height: 180, borderRadius: '50%' }}
                                />
                            </Button>
                        </label>
                        <Button variant="contained" startIcon={<EditIcon />} sx={{ mt: 2, bgcolor: '#FFF4CC', color: '#000' }} onClick={handleEditProfile}>
                            Edit profile
                        </Button>
                    </Stack>

                    <Stack spacing={1} sx={{ width: '60%', pt: 2 }}>
                        <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>
                            Hello Everyone
                        </Typography>
                        <Typography sx={{ fontSize: 20, fontWeight: 'light', fontStyle: 'italic' }}>
                            My name
                        </Typography>
                        <Box sx={{ position: 'relative', mt: 1, mb: 2 }}>
                            <img src="/bg_name_profile.png" alt="Name Background" style={{ width: '100%' }} />
                            <Box sx={{ position: 'absolute', top: '35%', left: '10%', fontSize: 24, fontWeight: 'bold' }}>
                                {name}
                            </Box>
                        </Box>

                        {/* Switch between view and edit mode */}
                        <Box sx={{ bgcolor: 'grey.300', p: 2, borderRadius: 2, transition: 'opacity .5s ease-in-out' }}>
                            <Stack spacing={1}>
                                {editMode ? (
                                    <>
                                        <TextField
                                            label="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            fullWidth
                                            sx={{ padding: '0 0 .5rem 0' }}
                                        />
                                        <TextField
                                            label="Email"
                                            value={email}
                                            fullWidth
                                            sx={{ padding: '0 0 .5rem 0' }}
                                            disabled
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Box><span style={{ fontWeight: 'bold' }}>Name:</span> {name}</Box>
                                        <Box><span style={{ fontWeight: 'bold' }}>Email:</span> {email}</Box>
                                    </>
                                )}
                            </Stack>
                        </Box>
                    </Stack>
                </Stack>

                <TextField
                    multiline
                    rows={4}
                    fullWidth
                    value={userNote}
                    onChange={(e) => setUserNote(e.target.value)}
                    placeholder="Show us your determination to conquer English here"
                    sx={{ mt: 2 }}
                    disabled={!editMode}
                />

                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleChangePasswordOpen}>
                    Change Password
                </Button>

                <Button onClick={editMode ? handleSave : handleClose} variant="contained" color="primary" sx={{ mt: 3, float: 'right', bottom: '.5rem', bgcolor: '#ACCD0A' }}>
                    {editMode ? 'Save' : 'Close'}
                </Button>

                <ChangePassword open={changePasswordOpen} handleClose={handleChangePasswordClose} />
            </DialogContent>
        </Dialog>
    );
};

export default Profile;
