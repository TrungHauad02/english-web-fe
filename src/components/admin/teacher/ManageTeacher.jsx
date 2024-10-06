import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Grid,
    Avatar,
    Card,
    Typography,
    IconButton,
    InputAdornment,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Snackbar,
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { VisibilityOff, Visibility, Search } from '@mui/icons-material';
import ProfileTeacher from './ProfileTeacher';

function ManageTeacher() {
    const [selectedTeacher, setSelectedTeacher] = useState({
        name: '',
        email: '',
        level: '',
        startDate: '',
        endDate: '',
        avatar: null,
        status: '',
    });

    const [openProfile, setOpenProfile] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchStartDate, setSearchStartDate] = useState('');
    const [searchLevel, setSearchLevel] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // Thay đổi để kiểm soát xác nhận xóa
    const levels = ['PhD', 'Master', 'Bachelor'];

    useEffect(() => {
        const sampleTeachers = [
            { id: 1, name: 'Thai Thanh Hung', startDate: '2021-01-01', endDate: '', status: 'Active', level: 'Bachelor' },
            { id: 2, name: 'Nguyen Van A', startDate: '2022-03-15', endDate: '2024-01-01', status: 'Inactive', level: 'Master' },
            { id: 3, name: 'Le Thi B', startDate: '2020-06-10', endDate: '', status: 'Active', level: 'PhD' },
            { id: 4, name: 'Tran Van C', startDate: '2019-11-20', endDate: '2024-01-01', status: 'Inactive', level: 'Master' },
            { id: 5, name: 'Pham Thi D', startDate: '2023-02-05', endDate: '', status: 'Active', level: 'Bachelor' },
        ];
        setTeachers(sampleTeachers);
        setFilteredTeachers(sampleTeachers);
    }, []);

    const handleTeacherClick = (teacher) => {
        setSelectedTeacher({
            name: teacher.name,
            email: `${teacher.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
            level: teacher.level,
            startDate: teacher.startDate,
            endDate: teacher.status === 'Inactive' ? teacher.endDate : '',
            avatar: teacher.avatar,
            status: teacher.status,
            id: teacher.id // Lưu id để sử dụng cho các thao tác sau này
        });
    };

    const handleDetailClick = (teacher) => {
        handleTeacherClick(teacher);
        setOpenProfile(true);
    };

    const generatePassword = () => {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < 8; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return password;
    };

    const handleAddTeacher = () => {
        const newTeacher = {
            id: teachers.length + 1,
            name: selectedTeacher.name,
            password: generatePassword(), // Tạo mật khẩu tự động
            startDate: new Date().toISOString().split('T')[0],
            status: 'Active',
            level: selectedTeacher.level,
            email: `${selectedTeacher.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
            avatar: selectedTeacher.avatar,
            endDate: '',
        };

        setTeachers([...teachers, newTeacher]);
        setFilteredTeachers([...teachers, newTeacher]);
        setSelectedTeacher({ name: '', email: '', level: '', startDate: '', endDate: '', avatar: null, status: '' });
        setSnackbarMessage('Teacher added successfully!');
        setSnackbarOpen(true);
    };

    const handleDeleteTeacher = () => {
        const updatedTeachers = teachers.map(teacher => 
            teacher.id === selectedTeacher.id ? { ...teacher, status: 'Inactive', endDate: new Date().toISOString().split('T')[0] } : teacher
        );
        setTeachers(updatedTeachers);
        setFilteredTeachers(updatedTeachers);
        setSnackbarMessage('Teacher status updated to Inactive!');
        setSnackbarOpen(true);
        setConfirmDeleteOpen(false);
        handleClear(); // Clear the left panel after deletion
    };

    const handleSearch = () => {
        const filtered = teachers.filter(teacher =>
            (searchName === '' || teacher.name.toLowerCase().includes(searchName.toLowerCase())) &&
            (searchStartDate === '' || teacher.startDate === searchStartDate) &&
            (searchLevel === '' || teacher.level.toLowerCase().includes(searchLevel.toLowerCase()))
        );
        setFilteredTeachers(filtered);
    };

    const handleClear = () => {
        setSearchName('');
        setSearchStartDate('');
        setSearchLevel('');
        setSelectedTeacher({ name: '', email: '', level: '', startDate: '', endDate: '', avatar: null, status: '' });
        setIsEditing(false);
        setIsNew(false);
        setFilteredTeachers(teachers);
    };

    const handleEditToggle = () => {
        if (selectedTeacher.id && selectedTeacher.name.trim() && selectedTeacher.level.trim()) {
            setIsEditing(!isEditing);
        }
    };

    const handleNewToggle = () => {
        setIsNew(!isNew);
        if (isNew) {
            handleClear(); // Khi quay lại chế độ chỉnh sửa, làm sạch trường.
        } else {
            // Khi chuyển sang chế độ New, làm trống các trường và cho phép nhập liệu.
            setSelectedTeacher({ name: '', email: '', level: '', startDate: '', endDate: '', avatar: null, status: '' });
        }
    };

    const handleSaveEdit = () => {
        if (selectedTeacher.name.trim() === '' || selectedTeacher.level.trim() === '') {
            alert('Please fill in all required fields.');
            return;
        }

        const updatedTeachers = teachers.map(teacher => 
            teacher.id === selectedTeacher.id ? selectedTeacher : teacher
        );
        setTeachers(updatedTeachers);
        setFilteredTeachers(updatedTeachers);
        setSnackbarMessage('Teacher information updated successfully!');
        setSnackbarOpen(true);
        setIsEditing(false); // Ngăn không cho chỉnh sửa sau khi lưu
    };

    const handleNewTeacher = () => {
        if (selectedTeacher.name.trim() === '' || selectedTeacher.level.trim() === '') {
            alert('Please fill in all required fields.');
            return;
        }

        // Kiểm tra email có tồn tại
        const emailExists = teachers.some(teacher => teacher.email === selectedTeacher.email);
        if (emailExists) {
            alert('Email already exists. Please enter a different email.');
            setSelectedTeacher({ ...selectedTeacher, email: '' });
            return;
        }

        handleAddTeacher();
        setIsNew(false);
    };

    return (
        <Grid container spacing={2} style={{ padding: 20 }}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Search by Name"
                            variant="outlined"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Search by Start Date"
                            variant="outlined"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={searchStartDate}
                            onChange={(e) => setSearchStartDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Search by Level</InputLabel>
                            <Select
                                value={searchLevel}
                                onChange={(e) => setSearchLevel(e.target.value)}
                                label="Search by Level"
                            >
                                {levels.map(level => (
                                    <MenuItem key={level} value={level}>{level}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                        <Button fullWidth variant="contained" onClick={handleSearch}>Search</Button>
                    </Grid>
                </Grid>
            </Grid>

            {/* Left Panel: Teacher Form */}
            <Grid item xs={12} md={4}>
                <Card sx={{ height: 500, padding: 2, bgcolor: "#F5F5F5" }}>
                    <TextField
                        fullWidth
                        label="Name"
                        margin="normal"
                        value={selectedTeacher.name}
                        onChange={(e) => setSelectedTeacher({ ...selectedTeacher, name: e.target.value })}
                        disabled={!isEditing && !isNew}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        value={selectedTeacher.email}
                        onChange={(e) => setSelectedTeacher({ ...selectedTeacher, email: e.target.value })}
                        disabled={true} // Không cho chỉnh sửa trường email
                    />
                    <FormControl fullWidth margin="normal" disabled={!isEditing && !isNew}>
                        <InputLabel>Level</InputLabel>
                        <Select
                            value={selectedTeacher.level}
                            onChange={(e) => setSelectedTeacher({ ...selectedTeacher, level: e.target.value })}
                        >
                            {levels.map(level => (
                                <MenuItem key={level} value={level}>{level}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" component="label" sx={{ marginBottom: 2 }} disabled={!isEditing && !isNew}>
                        Avatar: Choose File
                        <input hidden accept="image/*" type="file" onChange={(e) => setSelectedTeacher({ ...selectedTeacher, avatar: e.target.files[0] })} />
                    </Button>

                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Button 
                                fullWidth 
                                variant="contained" 
                                color="error" 
                                sx={{ bgcolor: '#FF6655' }} 
                                onClick={() => setConfirmDeleteOpen(true)} // Mở dialog xác nhận xóa
                                disabled={!selectedTeacher.id || !selectedTeacher.name.trim()}
                            >
                                Delete
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button 
                                fullWidth 
                                variant="contained" 
                                color="warning" 
                                sx={{ bgcolor: '#FFD014' }} 
                                onClick={isEditing ? handleSaveEdit : handleEditToggle}
                                disabled={!selectedTeacher.id || !selectedTeacher.name.trim()}
                            >
                                {isEditing ? 'Save Edit' : 'Edit'}
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button 
                                fullWidth 
                                variant="contained" 
                                color="success" 
                                sx={{ bgcolor: '#64FF64' }} 
                                onClick={isNew ? handleNewTeacher : handleNewToggle}
                            >
                                {isNew ? 'Save' : 'New'}
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="outlined" onClick={handleClear} fullWidth>
                                Clear
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

            {/* Right Panel: List of Teachers */}
            <Grid item xs={12} md={8}>
                <Card sx={{ height: 500, overflow: 'auto', padding: 2, bgcolor: '#F5F5F5' }}>
                    {filteredTeachers.map((teacher) => (
                        <Card
                            key={teacher.id}
                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, marginBottom: 2, cursor: 'pointer' }}
                            onClick={() => handleTeacherClick(teacher)}
                        >
                            <Grid container alignItems="center">
                                <Avatar sx={{ marginRight: 2 }} />
                                <Typography variant="h6">{teacher.name}</Typography>
                                <Typography variant="body2" sx={{ flex: 3, textAlign: 'right' }}>
                                    <span style={{ display: 'inline-block', minWidth: '120px', textAlign: 'right' }}>{teacher.startDate}</span>
                                </Typography>
                            </Grid>

                            <Grid container alignItems="center" justifyContent="flex-end">
                                <Button variant="contained" color={teacher.status === 'Active' ? 'success' : 'warning'}>
                                    {teacher.status}
                                </Button>
                                <Button variant="outlined" sx={{ marginLeft: 2 }} onClick={() => handleDetailClick(teacher)}>
                                    Detail
                                </Button>
                            </Grid>
                        </Card>
                    ))}
                </Card>
            </Grid>

            <ProfileTeacher open={openProfile} handleClose={() => setOpenProfile(false)} teacher={selectedTeacher} />

            {/* Confirm Delete Dialog */}
            <Dialog
                open={confirmDeleteOpen}
                onClose={() => setConfirmDeleteOpen(false)}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this teacher?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteOpen(false)}>No</Button>
                    <Button onClick={handleDeleteTeacher} color="error">Yes</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for alerts */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Grid>
    );
}

export default ManageTeacher;
