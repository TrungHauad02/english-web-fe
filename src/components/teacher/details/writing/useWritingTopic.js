export default function useWritingTopic(
  data,
  setData,
  isEditing,
  setIsEditing
) {
  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setData(data);
  };

  const onChangeDescription = (e) => {
    if (!isEditing) return;
    setData({ ...data, description: e.target.value });
  };

  const onChangeTopic = (e) => {
    if (!isEditing) return;
    setData({ ...data, topic: e.target.value });
  };

  return { handleEditing, handleSave, onChangeDescription, onChangeTopic };
}
