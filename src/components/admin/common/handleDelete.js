import { toast } from 'react-toastify';
import { updateUser } from 'api/user/userService';

export const handleDelete = async (
    selectedEntity,
    entities,
    setEntities,
    setFilteredEntities,
    setConfirmDeleteOpen,
    setSelectedEntity,
    handleClear,
    setIsNew,
    setReload,
    setPage,
) => {
    if (!Array.isArray(entities)) {
        toast.error("User is not an array:", entities);
        return;
    }

    const newStatus = selectedEntity.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    const currentDate = new Date().toISOString().split('T')[0];

    try {
        const updatedData = {
            status: newStatus,
            endDate: newStatus === "INACTIVE" ? currentDate : null,
            startDate: newStatus === "ACTIVE" ? currentDate : selectedEntity.startDate,
        };

        const response = await updateUser(updatedData, selectedEntity.id);

        const updatedEntities = entities.map(entity =>
            entity.id === selectedEntity.id
                ? { 
                    ...entity, 
                    status: newStatus, 
                    endDate: updatedData.endDate, 
                    startDate: updatedData.startDate 
                }
                : entity
        );

        setEntities(updatedEntities);
        setFilteredEntities(updatedEntities);
        toast.success(`User has been ${newStatus === "INACTIVE" ? "deleted" : "restored"} successfully.`);
    } catch (error) {
        toast.error(error.response?.data?.message || "Error updating user status. Please try again.");
        console.error("Error updating user status:", error);
    }

    setConfirmDeleteOpen(false);
    handleClear(setSelectedEntity, setIsNew);
    setReload(prev => !prev);
    setPage(0);
};
