import { useState } from "react";

export default function useGrammarInfo(data, setData) {
  const [topic, setTopic] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setData(topic);
    if (topic.id === "-1") {
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (topic.id === "-1") return;
  };

  const onChangeImage = (e) => {
    if (!isEditing) return;
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTopic({ ...topic, image: imageUrl });
    }
  };

  const onChangeTitle = (e) => {
    if (!isEditing) return;
    setTopic({ ...topic, title: e.target.value });
  };
  const onChangeSerial = (e) => {
    if (!isEditing) return;
    if (e.target.value <= 0) return;
    setTopic({ ...topic, serial: e.target.value });
  };

  const onChangeStatus = (e) => {
    if (!isEditing) return;
    setTopic({ ...topic, status: e.target.value });
  };

  const onChangeContent = (e) => {
    if (!isEditing) return;
    setTopic({ ...topic, content: e.target.value });
  };

  const onChangeDescription = (e) => {
    if (!isEditing) return;
    setTopic({ ...topic, description: e.target.value });
  };

  const onChangeExample = (e) => {
    if (!isEditing) return;
    setTopic({ ...topic, example: e.target.value });
  };

  const onChangeFile = (e) => {
    if (!isEditing) return;
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setTopic({ ...topic, file: fileUrl });
      setData({ ...topic, file: fileUrl });
    }
  };

  return {
    topic,
    isEditing,
    handleEditing,
    handleSave,
    handleDelete,
    onChangeImage,
    onChangeTitle,
    onChangeSerial,
    onChangeStatus,
    onChangeContent,
    onChangeDescription,
    onChangeExample,
    onChangeFile,
  };
}