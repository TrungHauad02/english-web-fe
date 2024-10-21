import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Card, Typography, Select, MenuItem, FormControl, InputLabel, Avatar } from '@mui/material';
import ProfileTeacher from './components/ProfileTeacher';
import SearchPanel from './../components/SearchPanel';
import StudentTeacherList from './../components/StudentTeacherList';
import DeleteConfirmationDialog from './../components/DeleteConfirmationDialog';
import TeacherInfo from './components/TeacherInfo'; 

function ManageTeacher() {
    const [selectedTeacher, setSelectedTeacher] = useState({
        name: '',
        email: '',
        password: '',
        level: '',
        startDate: '',
        endDate: '',
        avatar: '',
        status: '',
    });

    const [openProfile, setOpenProfile] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchStartDate, setSearchStartDate] = useState('');
    const [searchEndDate, setSearchEndDate] = useState('');
    const [searchLevel, setSearchLevel] = useState('All');
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [avatar, setAvatar] = useState('/header_user.png'); // Default avatar
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const levelsForSearch = ['All', 'PhD', 'Master', 'Bachelor'];
    const levelsForForm = ['PhD', 'Master', 'Bachelor'];
    const [avatarFile, setAvatarFile] = useState(null);

    // Fake data cho danh sách giáo viên
    useEffect(() => {
        const fakeTeachers = [
            {
                id: 1,
                name: 'Dr. John Doe',
                email: 'johndoe@example.com',
                password: 'password123',
                level: 'PhD',
                startDate: '2021-09-01',
                avatar: '/header_user.png',
                status: 'Active',
            },
            {
                id: 2,
                name: 'Ms. Jane Smith',
                email: 'janesmith@example.com',
                password: 'password456',
                level: 'Master',
                startDate: '2022-02-15',
                avatar: '/icon.png',
                status: 'Active',
            },
            {
                id: 3,
                name: 'Mr. Chris Evans',
                email: 'chrisevans@example.com',
                password: 'password789',
                level: 'Bachelor',
                startDate: '2020-08-10',
                avatar: '/header_icon.png',
                status: 'Active',
            },
            {
                id: 4,
                name: 'Dr. Tony Stark',
                email: 'tonystark@example.com',
                password: 'ironman123',
                level: 'PhD',
                startDate: '2019-05-10',
                avatar: '/icon.png',
                status: 'Inactive',
                endDate: '2023-04-10',
            },
        ];

        setTeachers(fakeTeachers);
        setFilteredTeachers(fakeTeachers);
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedTeacher({ ...selectedTeacher, avatar: event.target.result }); // Update avatar in selectedTeacher
                setAvatarFile(file); // Store the file to update later
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTeacherClick = (teacher) => {
        setSelectedTeacher({
            name: teacher.name,
            email: teacher.email,
            password: teacher.password,
            level: teacher.level,
            startDate: teacher.startDate,
            endDate: teacher.status === 'Inactive' ? teacher.endDate : '',
            avatar: teacher.avatar,
            status: teacher.status,
            id: teacher.id,
        });
        setAvatar(teacher.avatar); // Set the avatar when clicking on a teacher
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
        if (selectedTeacher.name.trim() === '' || selectedTeacher.email.trim() === '' || selectedTeacher.level.trim() === '') {
            alert('Please fill in all required fields: Name, Email, and Level.');
            return;
        }

        const newTeacher = {
            id: teachers.length + 1,
            name: selectedTeacher.name,
            password: generatePassword(),
            startDate: new Date().toISOString().split('T')[0],
            status: 'Active',
            level: selectedTeacher.level,
            email: selectedTeacher.email,
            avatar: selectedTeacher.avatar ? selectedTeacher.avatar : '/header_user.png',
            endDate: '',
        };

        setTeachers([...teachers, newTeacher]);
        setFilteredTeachers([...teachers, newTeacher]);
        setSelectedTeacher({ name: '', email: '', level: '', startDate: '', endDate: '', avatar: '', status: '' });
        setAvatarFile(null);

        setIsNew(false);
    };

    const handleDeleteTeacher = () => {
        const updatedTeachers = teachers.map(teacher =>
            teacher.id === selectedTeacher.id ? { ...teacher, status: 'Inactive', endDate: new Date().toISOString().split('T')[0] } : teacher
        );
        setTeachers(updatedTeachers);
        setFilteredTeachers(updatedTeachers);
        setConfirmDeleteOpen(false);
        handleClear();
    };

    const handleSearch = () => {
        const filtered = teachers.filter(teacher => {
            const isNameMatch = searchName === '' || teacher.name.toLowerCase().includes(searchName.toLowerCase());
            const isLevelMatch = searchLevel === 'All' || !searchLevel || teacher.level === searchLevel; // Check if level matches or is 'All'
    
            const teacherStartDate = new Date(teacher.startDate);
            const teacherEndDate = teacher.endDate ? new Date(teacher.endDate) : null;
            const searchStart = searchStartDate ? new Date(searchStartDate) : null;
            const searchEnd = searchEndDate ? new Date(searchEndDate) : null;
            const today = new Date();  // Current date
    
            // Logic for date search
            const isDateMatch = (
                // 1. If only searchStart is provided: search from searchStart to the current date
                (searchStart && !searchEnd && teacherStartDate >= searchStart && (!teacherEndDate || teacherEndDate >= today)) ||
    
                // 2. If only searchEnd is provided: search before searchEnd
                (!searchStart && searchEnd && teacherStartDate <= searchEnd) ||
    
                // 3. If both searchStart and searchEnd are provided: search between them
                (searchStart && searchEnd && teacherStartDate >= searchStart && teacherStartDate <= searchEnd) ||
    
                // 4. If neither searchStart nor searchEnd are provided: include all
                (!searchStart && !searchEnd)
            );
    
            return isNameMatch && isLevelMatch && isDateMatch; // Return combined conditions
        });
    
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
        setAvatar(null);
    };

    const handleEditToggle = () => {
        if (selectedTeacher.id && selectedTeacher.name.trim() && selectedTeacher.level.trim()) {
            setIsEditing(!isEditing);
        }
    };

    const handleNewToggle = () => {
        setIsNew(true);
        setSelectedTeacher({ name: '', email: '', level: '', startDate: '', endDate: '', avatar: '', status: '' });
        setAvatarFile(null);
    };

    const handleSaveEdit = () => {
        if (selectedTeacher.name.trim() === '' || selectedTeacher.level.trim() === '') {
            alert('Please fill in all required fields.');
            return;
        }

        const updatedTeachers = teachers.map(teacher =>
            teacher.id === selectedTeacher.id ? {
                ...selectedTeacher,
                avatar: avatarFile ? URL.createObjectURL(avatarFile) : teacher.avatar, // Update avatar if file is new
            } : teacher
        );

        setTeachers(updatedTeachers);
        setFilteredTeachers(updatedTeachers);
        alert('Teacher information updated successfully!');
        setIsEditing(false);
        setAvatarFile(null);
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
                                    handleSearch();
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
                        handleSearch={handleSearch}
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
                handleImageChange={handleImageChange}
                setConfirmDeleteOpen={setConfirmDeleteOpen}
                handleEditToggle={handleEditToggle}
                handleSaveEdit={handleSaveEdit}
                handleAddTeacher={handleAddTeacher}
                handleNewToggle={handleNewToggle}
                handleClear={handleClear}
            />

            {/* Right Panel: List of Teachers */}
            <Grid item xs={12} md={8}>
                <StudentTeacherList
                    listData={filteredTeachers}
                    handleClick={handleTeacherClick}
                    handleDetailClick={handleDetailClick}
                    role="teacher"
                />
            </Grid>

            <ProfileTeacher open={openProfile} handleClose={() => setOpenProfile(false)} teacher={selectedTeacher} />
            <DeleteConfirmationDialog
                open={confirmDeleteOpen}
                handleClose={() => setConfirmDeleteOpen(false)}
                handleDelete={handleDeleteTeacher}
            />
        </Grid>
    );
}

export default ManageTeacher;
