import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import ProfileStudent from './common/ProfileStudent';
import SearchPanel from '../common/Filter';
import StudentTeacherList from '../common/StudentTeacherList';
import DeleteConfirmationDialog from '../common/DeleteConfirmationDialog';
import StudentInfo from './common/StudentInfo';
import { handleDeleteStudent, handleClearSelection, useStudentData } from './common/HandleStudent';

function ManageStudent() {
    const [searchName, setSearchName] = useState('');
    const [searchStartDate, setSearchStartDate] = useState('');
    const [searchEndDate, setSearchEndDate] = useState('');
    const [size, setSize] = useState(10);
    const [openProfile, setOpenProfile] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState({
        name: '',
        email: '',
        password: '',
        startDate: '',
        endDate: '',
        avatar: '',
        status: '',
        id: null,
    });

    const {
        students,
        setStudents,
        filteredStudents,
        setFilteredStudents,
        loadStudents,
        lastStudentElementRef,
        setPage,
    } = useStudentData(searchName, searchStartDate, searchEndDate, size);

    useEffect(() => {
        setPage(0);
        loadStudents();
    }, [searchName, searchStartDate, searchEndDate, size]);

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
                    handleSearch={() => {
                        setPage(0); 
                        loadStudents();
                    }}
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
                    lastStudentElementRef={lastStudentElementRef}
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
