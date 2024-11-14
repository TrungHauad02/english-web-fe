export const handleClear = (setSelectedEntity, setIsNew) => {
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
};
