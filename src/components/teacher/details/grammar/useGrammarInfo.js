import { useEffect, useState } from "react";
import {
  createGrammar,
  deleteGrammar,
  updateGrammar,
} from "api/study/grammar/grammarService";
import { useNavigate, useParams } from "react-router-dom";

export default function useGrammarInfo(data, setData) {
  const { id } = useParams();
  const [topic, setTopic] = useState(data);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleError(err) {
    if (err.response?.data?.details) {
      const details = err.response.data.details;
      const errorMessages = Object.values(details).filter(Boolean).join(".\n");
      setError(errorMessages);
    } else {
      if (err.response.data.message) setError(err.response.data.message);
      else setError("An unexpected error occurred.");
    }
  }

  const handleCloseError = () => {
    setError("");
  };

  useEffect(() => {
    setIsEditing(id === "-1");
  }, [id]);

  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (id === "-1") {
        const data = await createGrammar(topic);
        setData(data);
        navigate(`/teacher/grammars/${data.id}`);
        return;
      }
      const data = await updateGrammar(id, topic);
      setData(data);
      setIsEditing(false);
    } catch (error) {
      handleError(error);
    }
  };

  const handleDelete = async () => {
    if (id === "-1") return;
    try {
      await deleteGrammar(id);
      navigate(`/teacher/grammars`);
    } catch (error) {
      handleError(error);
    }
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
    error,
    handleCloseError,
  };
}
