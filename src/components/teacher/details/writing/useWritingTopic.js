import { createWriting, updateWriting } from "api/study/writing/writingService";
import { useNavigate, useParams } from "react-router-dom";

export default function useWritingTopic(
  data,
  setData,
  isEditing,
  setIsEditing
) {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (id === "-1") {
        const newData = await createWriting(data);
        navigate(`/teacher/writings/${newData.id}`);
        return;
      }
      const newData = await updateWriting(id, data);
      setData(newData);
      setIsEditing(false);
    } catch (error) {}
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
