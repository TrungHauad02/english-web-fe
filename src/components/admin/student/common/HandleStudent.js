import { useState, useRef, useCallback } from 'react';
import { getStudents } from 'api/admin/student/StudentService';
import { toast } from 'react-toastify';

export const useStudentData = (searchName, searchStartDate, searchEndDate, size) => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    const loadStudents = async () => {
        try {
            const filters = {
                name: searchName,
                startDate: searchStartDate ? new Date(searchStartDate).toISOString().split('T')[0] : undefined,
                endDate: searchEndDate ? new Date(searchEndDate).toISOString().split('T')[0] : undefined,
            };
            const data = await getStudents(page, size, "id", "asc", filters);

            const validData = data.content.map(student => ({
                ...student,
                name: student.name || '',
                email: student.email || '',
                avatar: student.avatar || '/header_user.png',
                startDate: student.startDate || '',
                endDate: student.endDate || '',
                status: student.status || 'Active',
            }));

            setStudents(prevStudents => page === 0 ? validData : [...prevStudents, ...validData]);
            setFilteredStudents(prevStudents => page === 0 ? validData : [...prevStudents, ...validData]);
            setHasMore(data.content.length > 0);
        } catch (error) {
            toast.error("Không thể tải danh sách sinh viên. Vui lòng thử lại sau.");
        }
    };

    const lastStudentElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [hasMore]);

    return {
        students,
        filteredStudents,
        setFilteredStudents,
        loadStudents,
        lastStudentElementRef,
        setPage,
    };
};
