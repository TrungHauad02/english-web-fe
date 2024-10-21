export const handleSearch = (students, searchName, searchStartDate, searchEndDate, setFilteredStudents) => {
    const filtered = students.filter(student => {
        const isNameMatch = searchName === '' || student.name.toLowerCase().includes(searchName.toLowerCase());

        const studentStartDate = new Date(student.startDate);
        const studentEndDate = student.endDate ? new Date(student.endDate) : null;
        const searchStart = searchStartDate ? new Date(searchStartDate) : null;
        const searchEnd = searchEndDate ? new Date(searchEndDate) : null;
        const today = new Date();  // Current date

        // Logic tìm kiếm theo ngày
        const isDateMatch = (
            // 1. Nếu chỉ có searchStart: tìm kiếm từ searchStart đến thời điểm hiện tại
            (searchStart && !searchEnd && studentStartDate >= searchStart && (!studentEndDate || studentEndDate >= today)) ||

            // 2. Nếu chỉ có searchEnd: tìm kiếm từ trước searchEnd
            (!searchStart && searchEnd && studentStartDate <= searchEnd) ||

            // 3. Nếu cả searchStart và searchEnd: tìm kiếm từ searchStart đến searchEnd
            (searchStart && searchEnd && studentStartDate >= searchStart && studentStartDate <= searchEnd) ||

            // 4. Nếu không có searchStart và searchEnd: bao gồm tất cả
            (!searchStart && !searchEnd)
        );

        return isNameMatch && isDateMatch;
    });

    setFilteredStudents(filtered);
};

export const handleDeleteStudent = (students, selectedStudent, setStudents, setFilteredStudents, setConfirmDeleteOpen, setSelectedStudent) => {
    const updatedStudents = students.map(student =>
        student.id === selectedStudent.id ? { ...student, status: 'Inactive', endDate: new Date().toISOString().split('T')[0] } : student
    );
    setStudents(updatedStudents);
    setFilteredStudents(updatedStudents);
    setConfirmDeleteOpen(false);
    setSelectedStudent(null);
};

export const handleClearSelection = (setSelectedStudent) => {
    setSelectedStudent(null);
};
