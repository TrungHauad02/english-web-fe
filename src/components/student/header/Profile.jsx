import React, { useState } from 'react';
import { Dialog, DialogContent, Button, Stack, Box, TextField, IconButton, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';

const Profile = ({ open, handleClose }) => {
    const [name, setName] = useState('Thái Thanh Hưng');
    const [email, setEmail] = useState('web@gmail.com');
    const [password, setPassword] = useState('123');
    const [showPassword, setShowPassword] = useState(false);
    const [userNote, setUserNote] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [image, setImage] = useState('/header_user.png'); // State cho ảnh đại diện

    // Hàm bật/tắt hiển thị mật khẩu
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Hàm kích hoạt chế độ chỉnh sửa
    const handleEditProfile = () => {
        setEditMode(true);
    };

    // Hàm lưu thông tin và tắt chế độ chỉnh sửa
    const handleSave = () => {
        setEditMode(false);
        console.log('Cập nhật thông tin:', { name, email, password, userNote, image });
        // Ở đây bạn sẽ thêm logic để gửi thông tin đã chỉnh sửa (bao gồm ảnh) đến CSDL
    };

    // Hàm xử lý khi người dùng chọn ảnh mới
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result); // Cập nhật ảnh đã chọn vào state
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogContent>
                <Stack direction="row" spacing={2} divider={<Box sx={{ width: 2, bgcolor: 'grey.300' }} />}>

                    <Stack spacing={1} alignItems="center" sx={{ width: '40%', justifyContent: 'center' }}>
                        {/* Button chứa hình ảnh */}
                        <label htmlFor="upload-button">
                            <input
                                accept="image/*"
                                id="upload-button"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleImageChange} // Xử lý chọn ảnh mới
                            />
                            <Button component="span" sx={{ p: 0 }}>
                                <img
                                    src={image} // Sử dụng ảnh từ state
                                    alt="User"
                                    style={{ width: 180, height: 180, borderRadius: '50%' }}
                                />
                            </Button>
                        </label>
                        <Button variant="contained" startIcon={<EditIcon />} sx={{ mt: 2, bgcolor: '#FFF4CC', color:'#000' }} onClick={handleEditProfile}>
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

                        {/* Chuyển đổi giữa chế độ xem và chỉnh sửa */}
                        <Box sx={{ bgcolor: 'grey.300', p: 2, borderRadius: 2, transition: 'opacity .5s ease-in-out' }}>
                            <Stack spacing={1}>
                                {editMode ? (
                                    <>
                                        <TextField
                                            label="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            fullWidth
                                            sx={{padding:'0 0 .5rem 0'}}
                                        />
                                        <TextField
                                            label="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            fullWidth
                                            sx={{padding:'0 0 .5rem 0'}}
                                        />
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <TextField
                                                label="Password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                fullWidth
                                                sx={{padding:'0 0 .5rem 0'}}
                                            />
                                            <IconButton onClick={handleTogglePasswordVisibility} aria-label="toggle password visibility">
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </Box>
                                    </>
                                ) : (
                                    <>
                                        <Box><span style={{fontWeight:'bold'}}>Name:</span> {name}</Box>
                                        <Box><span style={{fontWeight:'bold'}}>Email:</span> {email}</Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <span style={{fontWeight:'bold'}}>Password:</span> {showPassword ? password : '******'}
                                            <IconButton onClick={handleTogglePasswordVisibility} aria-label="toggle password visibility">
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </Box>
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
                    placeholder="I will be determined to learn the lessons and do the tests."
                    sx={{ mt: 2 }}
                />

                <Button onClick={editMode ? handleSave : handleClose} variant="contained" color="primary" sx={{ mt: 2, float: 'right', bottom: '.5rem', bgcolor:'#ACCD0A' }}>
                    {editMode ? 'Save' : 'Close'}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default Profile;
