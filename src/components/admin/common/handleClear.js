export const handleClear = (setSelectedEntity, setIsNew, setIsEditing) => {
    setSelectedEntity({
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
    setIsNew(false);
    setIsEditing(false);
};
