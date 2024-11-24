import React, { useState, useEffect } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, Button, Typography } from '@mui/material';
import ProfileTeacher from './common/ProfileTeacher';
import SearchPanel from '../common/Filter';
import StudentTeacherList from '../common/StudentTeacherList';
import DeleteConfirmationDialog from '../common/DeleteConfirmationDialog';
import TeacherInfo from './common/TeacherInfo';
import { handleImageChange, handleAddTeacher, handleDetailClick, handleEditToggle, handleNewToggle, handleSaveEdit, handleTeacherClick, useTeacherData } from './common/HandleTeacher';
import { handleClear } from '../common/handleClear';
import { handleDelete } from '../common/handleDelete';
import DotLoader from 'shared/component/loader/DotLoader';

function ManageTeacher() {
    const [isLoading, setIsLoading] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchStartDate, setSearchStartDate] = useState('');
    const [searchEndDate, setSearchEndDate] = useState('');
    const [searchLevel, setSearchLevel] = useState('ALL');
    const [size, setSize] = useState();
    const [openProfile, setOpenProfile] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [avatar, setAvatar] = useState('/header_user.png');
    const [avatarFile, setAvatarFile] = useState(null);
    const [reload, setReload] = useState(false);
    const levelsForSearch = ['ALL', 'BACHELOR', 'MASTER', 'DOCTOR', 'PROFESSOR'];
    const levelsForForm = ['BACHELOR', 'MASTER', 'DOCTOR', 'PROFESSOR'];
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState({
        name: '',
        email: '',
        password: '',
        level: '',
        startDate: '',
        endDate: '',
        avatar: '',
        status: '',
        id: null,
    });

    const {
        filteredTeachers,
        setFilteredTeachers,
        loadTeachers,
        page,
        setPage,
        totalPages,
    } = useTeacherData(searchName, searchLevel, searchStartDate, searchEndDate, size);

    useEffect(() => {
        loadTeachers(page);
    }, [reload, searchName, searchLevel, searchStartDate, searchEndDate, size, page]);

    return (
        <Grid container spacing={2} style={{ paddingTop: '3rem', paddingRight: '5%', paddingLeft: '5%', paddingBottom: '3rem' }}>
            <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
                <Grid item xs={3.1} sx={{ marginLeft: 2 }}>
                    <FormControl fullWidth margin="none">
                        <InputLabel>Search by Level</InputLabel>
                        <Select
                            value={searchLevel}
                            onChange={(e) => {
                                setSearchLevel(e.target.value);
                                setPage(0);
                                loadTeachers();
                            }}
                            disableScrollLock
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

                <Grid item xs={8.5}>
                    <SearchPanel
                        searchName={searchName}
                        setSearchName={setSearchName}
                        searchStartDate={searchStartDate}
                        setSearchStartDate={setSearchStartDate}
                        searchEndDate={searchEndDate}
                        setSearchEndDate={setSearchEndDate}
                        handleSearch={() => {
                            setPage(0);
                            loadTeachers();
                        }}
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
                handleSaveEdit={() => handleSaveEdit(selectedTeacher, teachers, setTeachers, setFilteredTeachers, setIsEditing, avatarFile, setReload, setPage)}
                handleAddTeacher={() => handleAddTeacher(selectedTeacher, teachers, setTeachers, setFilteredTeachers, setSelectedTeacher, avatarFile, setIsNew, setReload, setPage, setIsLoading)}
                handleNewToggle={() => handleNewToggle(setIsNew, setSelectedTeacher, setAvatarFile)}
                handleClear={() => handleClear(setSelectedTeacher, setIsNew, setIsEditing)}
                handleDeleteTeacher={() => handleDelete(selectedTeacher, teachers, setTeachers, setFilteredTeachers, setConfirmDeleteOpen, setSelectedTeacher, handleClear, setIsNew, setReload, setPage, setIsEditing)}
                setReload={setReload}
                setPage={setPage}
            />

            {/* Right Panel: List of Teachers */}
            <Grid item xs={12} md={8}>
                <StudentTeacherList
                    listData={filteredTeachers}
                    handleClick={(teacher) => setSelectedTeacher(teacher)}
                    handleDetailClick={(teacher) =>
                        handleDetailClick(teacher, setOpenProfile, (t) =>
                            handleTeacherClick(t, setSelectedTeacher, setAvatar)
                        )
                    }
                    page={page}
                    totalPages={totalPages}
                    onPreviousPage={() => {
                        if (page > 0) {
                            setPage(page - 1);
                            loadTeachers(page - 1);
                        }
                    }}
                    onNextPage={() => {
                        if (page < totalPages - 1) {
                            setPage(page + 1);
                            loadTeachers(page + 1);
                        }
                    }}
                />
            </Grid>

            <ProfileTeacher open={openProfile} handleClose={() => setOpenProfile(false)} teacher={selectedTeacher} />

            <DeleteConfirmationDialog
                open={confirmDeleteOpen}
                handleClose={() => setConfirmDeleteOpen(false)}
                handleDelete={() => handleDelete(
                    selectedTeacher,
                    teachers,
                    setTeachers,
                    setFilteredTeachers,
                    setConfirmDeleteOpen,
                    setSelectedTeacher,
                    handleClear,
                    setIsNew,
                    setReload,
                    setPage,
                    setIsEditing
                )}
            />
            {isLoading && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1300 }}>
                    <DotLoader dotSize="1rem" />
                </div>
            )}
        </Grid>
    );
}

export default ManageTeacher;
