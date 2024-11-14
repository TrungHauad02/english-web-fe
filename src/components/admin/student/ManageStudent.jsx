import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import ProfileStudent from './common/ProfileStudent';
import SearchPanel from '../common/Filter';
import StudentTeacherList from '../common/StudentTeacherList';
import DeleteConfirmationDialog from '../common/DeleteConfirmationDialog';
import StudentInfo from './common/StudentInfo';
import { useStudentData } from './common/HandleStudent';
import { handleDelete } from '../common/handleDelete';
import { handleClear } from '../common/handleClear';

function ManageStudent() {
    const [searchName, setSearchName] = useState('');
    const [searchStartDate, setSearchStartDate] = useState('');
    const [searchEndDate, setSearchEndDate] = useState('');
    const [size, setSize] = useState(10);
    const [openProfile, setOpenProfile] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [reload, setReload] = useState(false);
    const [students, setStudents] = useState([]);
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
        filteredStudents,
        setFilteredStudents,
        loadStudents,
        lastStudentElementRef,
        setPage,
    } = useStudentData(searchName, searchStartDate, searchEndDate, size);

    useEffect(() => {
        setPage(0);
        loadStudents();
    }, [reload, searchName, searchStartDate, searchEndDate, size]);

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
                    setConfirmDeleteOpen={setConfirmDeleteOpen}
                    handleDelete={() => handleDelete(
                        selectedStudent,
                        students,
                        setStudents,
                        setFilteredStudents,
                        setConfirmDeleteOpen,
                        setSelectedStudent,
                        handleClear,
                        setIsNew,
                        setReload,
                        setPage
                    )}
                    handleClear={() => handleClear(setSelectedStudent, setIsNew)}
                    setReload={setReload}
                    setPage={setPage}
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

            <ProfileStudent open={openProfile} handleClose={() => setOpenProfile(false)} student={selectedStudent} />

            <DeleteConfirmationDialog
                open={confirmDeleteOpen}
                handleClose={() => setConfirmDeleteOpen(false)}
                handleDelete={() => handleDelete(
                    selectedStudent,
                    students,
                    setStudents,
                    setFilteredStudents,
                    setConfirmDeleteOpen,
                    setSelectedStudent,
                    handleClear,
                    setIsNew,
                    setReload,
                    setPage
                )}
            />
        </Grid>
    );
}

export default ManageStudent;
