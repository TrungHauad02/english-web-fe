import { useState, useRef, useCallback } from 'react';
import { getTeachers } from 'api/admin/teacher/TeacherService';

export const useTeacherData = (searchName, searchLevel, searchStartDate, searchEndDate, size) => {
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState('');
    const observer = useRef();

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

    const lastTeacherElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [hasMore]);

    return {
        teachers,
        filteredTeachers,
        setFilteredTeachers,
        loadTeachers,
        lastTeacherElementRef,
        setPage,
        error,
    };
};

export const handleImageChange = (e, selectedTeacher, setSelectedTeacher, setAvatarFile) => {
    const file = e.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedTeacher({ ...selectedTeacher, avatar: imageUrl }); 
        setAvatarFile(file); 
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
    setAvatar(teacher.avatar);
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


