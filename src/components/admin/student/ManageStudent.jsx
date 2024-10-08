import React, { useState } from 'react';
import { Grid, Button, Typography, TextField, Card, Avatar } from '@mui/material';
import ProfileStudent from './ProfileStudent';
import SearchPanel from './../components/SearchPanel';
import StudentTeacherList from './../components/StudentTeacherList';
import DeleteConfirmationDialog from './../components/DeleteConfirmationDialog';

function ManageStudent() {
    const initialStudents = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            startDate: '2023-01-01',
            endDate: '',
            status: 'Active',
            avatar: '/icon.png',
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            startDate: '2023-05-15',
            endDate: '',
            status: 'Active',
            avatar: '/header_user.png',
        },
        {
            id: 3,
            name: 'Chris Evans',
            email: 'chris.evans@example.com',
            startDate: '2022-10-10',
            endDate: '',
            status: 'Inactive',
            avatar: '/icon.png',
        },
    ];

    const [students, setStudents] = useState(initialStudents);
    const [filteredStudents, setFilteredStudents] = useState(initialStudents);
    const [selectedStudent, setSelectedStudent] = useState(initialStudents[0]);  // Hiển thị thông tin sinh viên đầu tiên
    const [searchName, setSearchName] = useState('');
    const [searchStartDate, setSearchStartDate] = useState('');
    const [openProfile, setOpenProfile] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    // Xử lý tìm kiếm
    const handleSearch = () => {
        const filtered = students.filter(student =>
            (searchName === '' || student.name.toLowerCase().includes(searchName.toLowerCase())) &&
            (searchStartDate === '' || student.startDate >= searchStartDate)
        );
        setFilteredStudents(filtered);
    };

    // Xử lý xóa sinh viên
    const handleDeleteStudent = () => {
        const updatedStudents = students.map(student =>
            student.id === selectedStudent.id ? { ...student, status: 'Inactive', endDate: new Date().toISOString().split('T')[0] } : student
        );
        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents);
        setConfirmDeleteOpen(false);
        setSelectedStudent(null);
    };

    // Xử lý nút Clear để bỏ chọn sinh viên
    const handleClearSelection = () => {
        setSelectedStudent(null);
    };

    return (
        <Grid container spacing={2} style={{ padding: 20 }}>
            <Grid item xs={12}>
                <SearchPanel
                    searchName={searchName}
                    setSearchName={setSearchName}
                    searchStartDate={searchStartDate}
                    setSearchStartDate={setSearchStartDate}
                    handleSearch={handleSearch}
                />
            </Grid>

            {/* Left Panel: Hiển thị thông tin sinh viên */}
            <Grid item xs={12} md={4}>
                <Card sx={{ height: 500, padding: 2, bgcolor: "#F5F5F5" }}>
                    <Grid container spacing={2} style={{ marginTop: '10px' }}>
                        {/* Avatar */}
                        <Grid item xs={12} textAlign="center">
                            <Avatar
                                alt={selectedStudent?.name || 'Student Avatar'}
                                src={selectedStudent?.avatar || '/icon.png'}
                                sx={{ width: 100, height: 100, margin: '0 auto' }}
                            />
                        </Grid>

                        {/* Name */}
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

                        {/* Email */}
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

                        {/* Start Date */}
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

                        {/* Status */}
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

                        {/* Nút Delete và Clear */}
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
            </Grid>

            {/* Right Panel: Danh sách sinh viên */}
            <Grid item xs={12} md={8}>
                <StudentTeacherList
                    listData={filteredStudents}
                    handleClick={(student) => setSelectedStudent(student)}
                    handleDetailClick={(student) => {
                        setSelectedStudent(student);
                        setOpenProfile(true);
                    }}
                    role="student"
                />
            </Grid>

            {/* Dialog hiển thị chi tiết sinh viên */}
            {selectedStudent && (
                <ProfileStudent open={openProfile} handleClose={() => setOpenProfile(false)} student={selectedStudent} />
            )}

            {/* Dialog xác nhận xóa */}
            <DeleteConfirmationDialog
                open={confirmDeleteOpen}
                handleClose={() => setConfirmDeleteOpen(false)}
                handleDelete={handleDeleteStudent}
            />
        </Grid>
    );
}

export default ManageStudent;
