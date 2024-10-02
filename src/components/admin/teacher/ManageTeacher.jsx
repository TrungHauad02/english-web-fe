import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Avatar, Card, Typography, IconButton, InputAdornment } from '@mui/material';
import { VisibilityOff, Visibility, Search } from '@mui/icons-material';
import ProfileTeacher from './ProfileTeacher';

function ManageTeacher() {
    const [selectedTeacher, setSelectedTeacher] = useState({
        name: '',
        email: '',
        password: '',
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
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const sampleTeachers = [
            { id: 1, name: 'Thai Thanh Hung', password: '123', startDate: '2021-01-01', endDate: '', status: 'Active', level: 'Bachelor' },
            { id: 2, name: 'Nguyen Van A', password: '456', startDate: '2022-03-15', endDate: '2024-01-01', status: 'Inactive', level: 'Master' },
            { id: 3, name: 'Le Thi B', password: '789', startDate: '2020-06-10', endDate: '', status: 'Active', level: 'PhD' },
            { id: 4, name: 'Tran Van C', password: '135', startDate: '2019-11-20', endDate: '2024-01-01', status: 'Inactive', level: 'Master' },
            { id: 5, name: 'Pham Thi D', password: '246', startDate: '2023-02-05', endDate: '', status: 'Active', level: 'Bachelor' },
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
            endDate: teacher.status === 'Inactive' ? teacher.endDate : '', // Chỉ hiển thị endDate khi trạng thái là Inactive
            avatar: teacher.avatar,
            status: teacher.status,
            password: teacher.password,
        });
    };

    const handleDetailClick = (teacher) => {
        handleTeacherClick(teacher);
        setOpenProfile(true);
    };

    const handleAddTeacher = () => {
        const newTeacher = {
            id: teachers.length + 1,
            name: selectedTeacher.name,
            password: selectedTeacher.password,
            startDate: new Date().toISOString().split('T')[0],
            status: 'Active',
            level: selectedTeacher.level,
            email: `${selectedTeacher.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
            avatar: selectedTeacher.avatar,
            endDate: selectedTeacher.status === 'Inactive' ? new Date().toISOString().split('T')[0] : '', // Chỉ gán endDate khi trạng thái là Inactive
        };

        setTeachers([...teachers, newTeacher]);
        setFilteredTeachers([...teachers, newTeacher]);
        setSelectedTeacher({ name: '', email: '', level: '', startDate: '', endDate: '', avatar: null, status: '', password: '' });
    };

    const handleDeleteTeacher = (teacherId) => {
        const updatedTeachers = teachers.filter(teacher => teacher.id !== teacherId);
        setTeachers(updatedTeachers);
        setFilteredTeachers(updatedTeachers);
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
        setSelectedTeacher({ name: '', email: '', level: '', startDate: '', endDate: '', avatar: null, status: '', password: '' });
        setIsEditing(false);
        setFilteredTeachers(teachers);
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
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
                        <TextField
                            fullWidth
                            label="Search by Level"
                            variant="outlined"
                            value={searchLevel}
                            onChange={(e) => setSearchLevel(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            variant="contained"
                            startIcon={<Search />}
                            onClick={handleSearch}
                            sx={{ marginLeft: '1rem', marginTop: '.5rem' }}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            {/* Left Panel: Form */}
            <Grid item xs={12} md={4}>
                <Card sx={{ padding: 2, bgcolor: "#F5F5F5" }}>
                    <TextField
                        fullWidth
                        label="Name"
                        margin="normal"
                        value={selectedTeacher.name}
                        onChange={(e) => setSelectedTeacher({ ...selectedTeacher, name: e.target.value })}
                        disabled={!isEditing}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        value={selectedTeacher.email}
                        onChange={(e) => setSelectedTeacher({ ...selectedTeacher, email: e.target.value })}
                        disabled={!isEditing}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        margin="normal"
                        type={showPassword ? 'text' : 'password'}
                        value={selectedTeacher.password}
                        onChange={(e) => setSelectedTeacher({ ...selectedTeacher, password: e.target.value })}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            readOnly: !isEditing,
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Level"
                        margin="normal"
                        value={selectedTeacher.level}
                        onChange={(e) => setSelectedTeacher({ ...selectedTeacher, level: e.target.value })}
                        disabled={!isEditing}
                    />
                    <Button variant="contained" component="label" sx={{ marginBottom: 2 }} disabled={!isEditing}>
                        Avatar: Choose File
                        <input hidden accept="image/*" type="file" onChange={(e) => setSelectedTeacher({ ...selectedTeacher, avatar: e.target.files[0] })} />
                    </Button>

                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Button fullWidth variant="contained" color="error" onClick={() => handleDeleteTeacher(selectedTeacher.id)} sx={{ bgcolor: '#FF6655' }}>Delete</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button fullWidth variant="contained" color="warning" sx={{ bgcolor: '#FFD014' }} onClick={handleEditToggle}>
                                {isEditing ? 'Save Edit' : 'Edit'}
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button fullWidth variant="contained" color="success" sx={{ bgcolor: '#64FF64' }} onClick={handleAddTeacher}>
                                Save
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
        </Grid>
    );
};

export default ManageTeacher;
