import { useState } from "react";
import { updateTopic } from "../../../../api/teacher/topicService";

export default function useTopicInfo(data) {
  const [topic, setTopic] = useState(data);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const handleCloseError = () => {
    setError("");
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      setIsEditing(false);
      const res = await updateTopic(topic);
      setTopic(res);
      setError("");
    } catch (err) {
      console.error("Error updating topic:", err);
      if (err.response && err.response.data && err.response.data.details) {
        const details = err.response.data.details;
        const errorMessages = [];

        Object.keys(details).forEach((key) => {
          if (details[key]) {
            errorMessages.push(details[key]);
          }
        });

        setError(errorMessages.join(".\n"));
      }
    }
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
    error,
    handleCloseError,
  };
}
