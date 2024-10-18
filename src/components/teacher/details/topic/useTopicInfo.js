import { useState } from "react";

export default function useTopicInfo(data) {
  const [topic, setTopic] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const onChangeTitle = (e) => {
    setTopic({ ...topic, title: e.target.value });
  };
  const onChangeSerial = (e) => {
    if (e.target.value <= 0) return;
    setTopic({ ...topic, serial: e.target.value });
  };

  const onChangeStatus = (e) => {
    setTopic({ ...topic, status: e.target.value });
  };

  const onChangeDescription = (e) => {
    setTopic({ ...topic, description: e.target.value });
  };

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTopic({ ...topic, image: imageUrl });
    }
  };

  return {
    topic,
    onChangeTitle,
    onChangeSerial,
    onChangeStatus,
    onChangeDescription,
    onChangeImage,
    isEditing,
    handleEditClick,
    handleSaveClick,
  };
}
