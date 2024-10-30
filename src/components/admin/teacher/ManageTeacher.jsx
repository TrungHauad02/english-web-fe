import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Card, Typography, Select, MenuItem, FormControl, InputLabel, Avatar } from '@mui/material';
import ProfileTeacher from './common/ProfileTeacher';
import SearchPanel from '../common/Filter';
import StudentTeacherList from '../common/StudentTeacherList';
import DeleteConfirmationDialog from '../common/DeleteConfirmationDialog';
import TeacherInfo from './common/TeacherInfo';
import {
    handleAddTeacher,
    handleClear,
    handleDeleteTeacher,
    handleDetailClick,
    handleEditToggle,
    handleImageChange,
    handleNewToggle,
    handleSaveEdit,
    handleSearch,
    handleTeacherClick,
} from './common/HandleTeacher';

function ManageTeacher() {
    const initialTeachers = [
        {
            id: 1,
            name: 'Dr. John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            level: 'PhD',
            startDate: '2021-09-01',
            endDate: '',
            status: 'Active',
            avatar: '/header_user.png',
        },
        {
            id: 2,
            name: 'Ms. Jane Smith',
            email: 'janesmith@example.com',
            password: 'password456',
            level: 'Master',
            startDate: '2022-02-15',
            endDate: '',
            status: 'Active',
            avatar: '/icon.png',
        },
        {
            id: 3,
            name: 'Mr. Chris Evans',
            email: 'chrisevans@example.com',
            password: 'password789',
            level: 'Bachelor',
            startDate: '2020-08-10',
            endDate: '',
            status: 'Inactive',
            avatar: '/header_icon.png',
        },
    ];

    const [teachers, setTeachers] = useState(initialTeachers);
    const [filteredTeachers, setFilteredTeachers] = useState(initialTeachers);
    const [selectedTeacher, setSelectedTeacher] = useState(initialTeachers[0]);
    const [searchName, setSearchName] = useState('');
    const [searchStartDate, setSearchStartDate] = useState('');
    const [searchEndDate, setSearchEndDate] = useState('');
    const [searchLevel, setSearchLevel] = useState('All');
    const [openProfile, setOpenProfile] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [avatar, setAvatar] = useState('/header_user.png');
    const [avatarFile, setAvatarFile] = useState(null);
    const levelsForSearch = ['All', 'PhD', 'Master', 'Bachelor'];
    const levelsForForm = ['PhD', 'Master', 'Bachelor'];

    useEffect(() => {
        setFilteredTeachers(teachers);
    }, [teachers]);

    const handleClearSelection = () => {
        setSelectedTeacher({
            name: '',
            email: '',
            password: '',
            level: '',
            startDate: '',
            endDate: '',
            avatar: '',
            status: 'Active', // Assuming default status is 'Active'
            id: null, // Resetting the id as well
        });
        setAvatarFile(null); // Reset avatar file
        setSearchName('');
        setSearchStartDate('');
        setSearchEndDate('');
        setSearchLevel('All'); // Resetting search level to default
        setIsEditing(false); // Resetting edit mode
        setIsNew(false); // Resetting new mode
    };

    return (
        <Grid container spacing={2} style={{ paddingTop: '3rem', paddingRight: '5%', paddingLeft: '5%', paddingBottom: '3rem' }}>
            <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
                <Grid item xs={3} sx={{ marginLeft: '1rem' }}>
                    <FormControl fullWidth margin="none">
                        <InputLabel>Search by Level</InputLabel>
                        <Select
                            value={searchLevel}
                            onChange={(e) => setSearchLevel(e.target.value)}
                            disableScrollLock
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch(teachers, searchName, searchStartDate, searchEndDate, searchLevel, setFilteredTeachers);
                                }
                            }}
                            label="Search by Level"
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 200
                                    },
                                },
                                disableScrollLock: true,
                            }}
                        >
                            {levelsForSearch.map((level) => (
                                <MenuItem key={level} value={level}>{level}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={8.5} >
                    <SearchPanel
                        searchName={searchName}
                        setSearchName={setSearchName}
                        searchStartDate={searchStartDate}
                        setSearchStartDate={setSearchStartDate}
                        searchEndDate={searchEndDate}
                        setSearchEndDate={setSearchEndDate}
                        handleSearch={() => handleSearch(teachers, searchName, searchStartDate, searchEndDate, searchLevel, setFilteredTeachers)}
                    />
                </Grid>
            </Grid>

            {/* Left Panel: Teacher Form */}
            <TeacherInfo
                selectedTeacher={selectedTeacher}
                setSelectedTeacher={setSelectedTeacher}
                isEditing={isEditing}
                isNew={isNew}
                levelsForForm={levelsForForm}
                handleImageChange={(e) => handleImageChange(e, selectedTeacher, setSelectedTeacher, setAvatarFile)}
                setConfirmDeleteOpen={setConfirmDeleteOpen}
                handleEditToggle={() => handleEditToggle(selectedTeacher, setIsEditing)}
                handleSaveEdit={() => handleSaveEdit(selectedTeacher, teachers, setTeachers, setFilteredTeachers, setIsEditing, avatarFile)}
                handleAddTeacher={() => handleAddTeacher(selectedTeacher, teachers, setTeachers, setFilteredTeachers, setSelectedTeacher, setAvatarFile, setIsNew)}
                handleNewToggle={() => handleNewToggle(setIsNew, setSelectedTeacher, setAvatarFile)}
                handleClear={() => handleClear(setSelectedTeacher)} // Keep this line as is
                handleDeleteTeacher={() => handleDeleteTeacher(selectedTeacher, teachers, setTeachers, setFilteredTeachers, setConfirmDeleteOpen, setSelectedTeacher)}
            />

            {/* Right Panel: List of Teachers */}
            <Grid item xs={12} md={8}>
                <StudentTeacherList
                    listData={filteredTeachers}
                    handleClick={(teacher) => handleTeacherClick(teacher, setSelectedTeacher, setAvatar)}
                    handleDetailClick={(teacher) => handleDetailClick(teacher, setOpenProfile, (t) => handleTeacherClick(t, setSelectedTeacher, setAvatar))}
                    role="teacher"
                />
            </Grid>

            <ProfileTeacher open={openProfile} handleClose={() => setOpenProfile(false)} teacher={selectedTeacher} />
            <DeleteConfirmationDialog
                open={confirmDeleteOpen}
                handleClose={() => setConfirmDeleteOpen(false)}
                handleDelete={() => handleDeleteTeacher(
                    selectedTeacher,
                    teachers,
                    setTeachers,
                    setFilteredTeachers,
                    setConfirmDeleteOpen,
                    setSelectedTeacher,
                    handleClear
                )}
            />
        </Grid>
    );
}

export default ManageTeacher;
