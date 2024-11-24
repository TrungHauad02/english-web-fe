import { useState } from 'react';
import { getStudents } from 'api/admin/student/StudentService';
import { toast } from 'react-toastify';

export const useStudentData = (searchName, searchStartDate, searchEndDate, size) => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loadStudents = async (currentPage = 0) => {
        try {
            const filters = {
                name: searchName,
                startDate: searchStartDate ? new Date(searchStartDate).toISOString().split('T')[0] : undefined,
                endDate: searchEndDate ? new Date(searchEndDate).toISOString().split('T')[0] : undefined,
            };

            const data = await getStudents(currentPage, size, "id", "asc", filters);

            const validData = data.content.map(student => ({
                ...student,
                name: student.name || '',
                email: student.email || '',
                avatar: student.avatar || '/header_user.png',
                startDate: student.startDate || '',
                endDate: student.endDate || '',
                status: student.status || 'Active',
            }));

            setStudents(validData); 
            setFilteredStudents(validData);
            setTotalPages(data.totalPages); 
            setHasMore(data.content.length > 0); 
        } catch (error) {
            toast.error("Unable to load student list. Please try again later.");
        }
    };

    return {
        students,
        filteredStudents,
        setFilteredStudents,
        loadStudents,
        page,
        setPage,
        totalPages,
    };
};
