export const handleImageChange = (e, selectedTeacher, setSelectedTeacher, setAvatarFile) => {
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

export const handleTeacherClick = (teacher, setSelectedTeacher, setAvatar) => {
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

export const handleDetailClick = (teacher, setOpenProfile, handleTeacherClick) => {
    handleTeacherClick(teacher);
    setOpenProfile(true);
};

export const generatePassword = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 8; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
};

export const handleAddTeacher = (selectedTeacher, teachers, setTeachers, setFilteredTeachers, setSelectedTeacher, setAvatarFile, setIsNew) => {
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

export const handleDeleteTeacher = (selectedTeacher, teachers, setTeachers, setFilteredTeachers, setConfirmDeleteOpen, setSelectedTeacher, handleClear) => {
    if (!Array.isArray(teachers)) {
        console.error("Teachers is not an array:", teachers);
        return; // Stop execution if teachers is not an array
    }

    const updatedTeachers = teachers.map(teacher =>
        teacher.id === selectedTeacher.id ? {
            ...teacher,
            status: 'Inactive',
            endDate: new Date().toISOString().split('T')[0]
        } : teacher
    );

    setTeachers(updatedTeachers);
    setFilteredTeachers(updatedTeachers);
    setConfirmDeleteOpen(false);

    handleClear(setSelectedTeacher); 
};

export const handleSearch = (teachers, searchName, searchStartDate, searchEndDate, searchLevel, setFilteredTeachers) => {
    const filtered = teachers.filter(teacher => {
        const isNameMatch = searchName === '' || teacher.name.toLowerCase().includes(searchName.toLowerCase());
        const isLevelMatch = searchLevel === 'All' || !searchLevel || teacher.level === searchLevel; // Check if level matches or is 'All'

        const teacherStartDate = new Date(teacher.startDate);
        const teacherEndDate = teacher.endDate ? new Date(teacher.endDate) : null;
        const searchStart = searchStartDate ? new Date(searchStartDate) : null;
        const searchEnd = searchEndDate ? new Date(searchEndDate) : null;
        const today = new Date(); 

        const isDateMatch = (
            (searchStart && !searchEnd && teacherStartDate >= searchStart && (!teacherEndDate || teacherEndDate >= today)) ||

            (!searchStart && searchEnd && teacherStartDate <= searchEnd) ||

            (searchStart && searchEnd && teacherStartDate >= searchStart && teacherStartDate <= searchEnd) ||

            (!searchStart && !searchEnd)
        );

        return isNameMatch && isLevelMatch && isDateMatch; 
    });

    setFilteredTeachers(filtered);
};

export const handleClear = (setSelectedTeacher) => {
    setSelectedTeacher({
        name: '',
        email: '',
        password: '',
        level: '',
        startDate: '',
        endDate: '',
        avatar: '', 
        status: 'Active', 
        id: null, 
    });
};

export const handleEditToggle = (selectedTeacher, setIsEditing) => {
    if (selectedTeacher.id && selectedTeacher.name.trim() && selectedTeacher.level.trim()) {
        setIsEditing((prev) => !prev);
    }
};

export const handleNewToggle = (setIsNew, setSelectedTeacher, setAvatarFile) => {
    setIsNew(true);
    setSelectedTeacher({ name: '', email: '', level: '', startDate: '', endDate: '', avatar: '', status: '' });
    setAvatarFile(null);
};

export const handleSaveEdit = (selectedTeacher, teachers, setTeachers, setFilteredTeachers, setIsEditing, avatarFile) => {
    if (selectedTeacher.name.trim() === '' || selectedTeacher.level.trim() === '') {
        alert('Please fill in all required fields.');
        return;
    }

    const updatedTeachers = teachers.map(teacher =>
        teacher.id === selectedTeacher.id
            ? {
                ...selectedTeacher,
                avatar: avatarFile ? URL.createObjectURL(avatarFile) : teacher.avatar, 
            }
            : teacher
    );

    setTeachers(updatedTeachers);
    setFilteredTeachers(updatedTeachers);
    alert('Teacher information updated successfully!');
    setIsEditing(false);
};


