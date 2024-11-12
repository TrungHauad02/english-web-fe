import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    handleTeacherClick,
} from './common/HandleTeacher';

import { getTeachers } from 'api/admin/teacher/TeacherService';

function ManageTeacher() {
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
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
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
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
    const levelsForSearch = ['ALL', 'BACHELOR', 'MASTER', 'DOCTOR', 'PROFESSOR'];
    const levelsForForm = ['BACHELOR', 'MASTER', 'DOCTOR', 'PROFESSOR'];
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    const [error, setError] = useState('');

    const lastTeacherElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [hasMore]);

    const loadTeachers = async () => {
        try {
            const filters = {
                name: searchName,
                startDate: searchStartDate ? new Date(searchStartDate).toISOString().split('T')[0] : undefined,
                endDate: searchEndDate ? new Date(searchEndDate).toISOString().split('T')[0] : undefined,
                level: searchLevel === 'ALL' ? undefined : searchLevel,
            };
            const data = await getTeachers(page, size, "id", "asc", filters);
            
            const validData = data.content.map(teacher => ({
                ...teacher,
                name: teacher.name || '',
                email: teacher.email || '',
                level: teacher.level || '',
                avatar: teacher.avatar || '/header_user.png',
                startDate: teacher.startDate || '',
                endDate: teacher.endDate || '',
                status: teacher.status || 'Active',
            }));
        
            setTeachers(prevTeachers => page === 0 ? validData : [...prevTeachers, ...validData]);
            setFilteredTeachers(prevTeachers => page === 0 ? validData : [...prevTeachers, ...validData]);
            setHasMore(data.content.length > 0);
        } catch (error) {
            setError("Không thể tải danh sách giáo viên. Vui lòng thử lại sau.");
        }
    };        

    useEffect(() => {
        setPage(0); // Reset page về 0 khi thay đổi bộ lọc
        loadTeachers();
    }, [searchName, searchLevel, searchStartDate, searchEndDate, size, page]);

    return (
        <Grid container spacing={2} style={{ paddingTop: '3rem', paddingRight: '5%', paddingLeft: '5%', paddingBottom: '3rem' }}>
            <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
                <Grid item xs={3} sx={{ marginLeft: '1rem' }}>
                    <FormControl fullWidth margin="none">
                        <InputLabel>Search by Level</InputLabel>
                        <Select
                            value={searchLevel}
                            onChange={(e) => {
                                setSearchLevel(e.target.value);
                                setPage(0); // Reset về trang đầu tiên khi thay đổi bộ lọc
                                loadTeachers(); // Gọi loadTeachers để thực hiện tìm kiếm mới
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

                <Grid item xs={8.5} >
                <SearchPanel
                        searchName={searchName}
                        setSearchName={setSearchName}
                        searchStartDate={searchStartDate}
                        setSearchStartDate={setSearchStartDate}
                        searchEndDate={searchEndDate}
                        setSearchEndDate={setSearchEndDate}
                        handleSearch={() => {
                            setPage(0); // Reset về trang đầu tiên khi tìm kiếm mới
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
                    lastTeacherElementRef={lastTeacherElementRef}
                    handleClick={(teacher) => setSelectedTeacher(teacher)}
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
