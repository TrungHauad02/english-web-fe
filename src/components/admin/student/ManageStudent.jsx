import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Avatar, Card, Typography, IconButton, InputAdornment } from '@mui/material';
import { VisibilityOff, Visibility, Search } from '@mui/icons-material';
import ProfileStudent from './ProfileStudent';

function ManageStudent() {
    const [selectedStudent, setSelectedStudent] = useState({
        name: '',
        email: '',
        password: '',
        startDate: '',
        endDate: '',
        status: '',
    });

    const [openProfile, setOpenProfile] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchStartDate, setSearchStartDate] = useState('');
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const sampleStudents = [
            { id: 1, name: 'Thai Thanh Hung', password: '123', startDate: '2021-01-01', endDate: '', status: 'Active' },
            { id: 2, name: 'Nguyen Van A', password: '456', startDate: '2022-03-15', endDate: '2024-01-01', status: 'Inactive' },
            { id: 3, name: 'Le Thi B', password: '789', startDate: '2020-06-10', endDate: '', status: 'Active' },
        ];
        setStudents(sampleStudents);
        setFilteredStudents(sampleStudents);
    }, []);

    const handleStudentClick = (student) => {
        setSelectedStudent({
            name: student.name,
            email: `${student.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
            startDate: student.startDate,
            endDate: student.status === 'Inactive' ? student.endDate : '',
            status: student.status,
            password: student.password,
        });
    };

    const handleDetailClick = (student) => {
        handleStudentClick(student);
        setOpenProfile(true);
    };

    const handleDeleteStudent = () => {
        const updatedStudents = students.filter(student => student.id !== selectedStudent.id);
        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents);
        setSelectedStudent({ name: '', email: '', password: '', startDate: '', endDate: '', status: '' });
    };

    const handleClear = () => {
        setSearchName('');
        setSearchStartDate('');
        setSelectedStudent({ name: '', email: '', password: '', startDate: '', endDate: '', status: '' });
    };

    const handleSearch = () => {
        const filtered = students.filter(student =>
            (searchName === '' || student.name.toLowerCase().includes(searchName.toLowerCase())) &&
            (searchStartDate === '' || student.startDate === searchStartDate)
        );
        setFilteredStudents(filtered);
    };

    return (
        <Grid container spacing={2} style={{ padding: 20 }}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            label="Search by Name"
                            variant="outlined"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
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
                        value={selectedStudent.name}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        value={selectedStudent.email}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        margin="normal"
                        type={showPassword ? 'text' : 'password'}
                        value={selectedStudent.password}
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="error"
                                onClick={handleDeleteStudent}
                                sx={{ bgcolor: '#FF6655' }}
                                disabled={!selectedStudent.name}
                            >
                                Delete
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="outlined" onClick={handleClear} fullWidth>
                                Clear
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

            {/* Right Panel: List of Students */}
            <Grid item xs={12} md={8}>
                <Card sx={{ height: 500, overflow: 'auto', padding: 2, bgcolor: '#F5F5F5' }}>
                    {filteredStudents.map((student) => (
                        <Card
                            key={student.id}
                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, marginBottom: 2, cursor: 'pointer' }}
                            onClick={() => handleStudentClick(student)}
                        >
                            <Grid container alignItems="center">
                                <Typography variant="h6">{student.name}</Typography>
                                <Typography variant="body2" sx={{ flex: 3, textAlign: 'right' }}>
                                    <span style={{ display: 'inline-block', minWidth: '120px', textAlign: 'right' }}>{student.startDate}</span>
                                </Typography>
                            </Grid>

                            <Grid container alignItems="center" justifyContent="flex-end">
                                <Button variant="contained" color={student.status === 'Active' ? 'success' : 'warning'}>
                                    {student.status}
                                </Button>
                                <Button variant="outlined" sx={{ marginLeft: 2 }} onClick={() => handleDetailClick(student)}>
                                    Detail
                                </Button>
                            </Grid>
                        </Card>
                    ))}
                </Card>
            </Grid>
            <ProfileStudent open={openProfile} handleClose={() => setOpenProfile(false)} student={selectedStudent} />
        </Grid>
    );
}

export default ManageStudent;
