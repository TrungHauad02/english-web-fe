import React, { useState } from 'react';
import { Grid } from '@mui/material';
import ProfileStudent from './common/ProfileStudent';
import SearchPanel from '../common/Filter';
import StudentTeacherList from '../common/StudentTeacherList';
import DeleteConfirmationDialog from '../common/DeleteConfirmationDialog';
import StudentInfo from './common/StudentInfo';
import { handleSearch, handleDeleteStudent, handleClearSelection } from './common/HandleStudent';

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
    const [selectedStudent, setSelectedStudent] = useState(initialStudents[0]);
    const [searchName, setSearchName] = useState('');
    const [searchStartDate, setSearchStartDate] = useState('');
    const [searchEndDate, setSearchEndDate] = useState('');
    const [openProfile, setOpenProfile] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    return (
        <Grid container spacing={2} style={{ paddingTop: '2rem', paddingRight: '5%', paddingLeft: '5%', paddingBottom: '3rem' }}>
            <Grid item xs={12}>
                <SearchPanel
                    searchName={searchName}
                    setSearchName={setSearchName}
                    searchStartDate={searchStartDate}
                    setSearchStartDate={setSearchStartDate}
                    searchEndDate={searchEndDate}
                    setSearchEndDate={setSearchEndDate}
                    handleSearch={() => handleSearch(students, searchName, searchStartDate, searchEndDate, setFilteredStudents)}
                />
            </Grid>

            <Grid item xs={12} md={4}>
                <StudentInfo
                    selectedStudent={selectedStudent}
                    handleClearSelection={() => handleClearSelection(setSelectedStudent)}
                    setConfirmDeleteOpen={setConfirmDeleteOpen}
                />
            </Grid>

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

            {selectedStudent && (
                <ProfileStudent open={openProfile} handleClose={() => setOpenProfile(false)} student={selectedStudent} />
            )}

            <DeleteConfirmationDialog
                open={confirmDeleteOpen}
                handleClose={() => setConfirmDeleteOpen(false)}
                handleDelete={() => handleDeleteStudent(students, selectedStudent, setStudents, setFilteredStudents, setConfirmDeleteOpen, setSelectedStudent)}
            />
        </Grid>
    );
}

export default ManageStudent;
