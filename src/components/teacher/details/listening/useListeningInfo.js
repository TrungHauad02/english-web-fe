import {
  getListeningDetail,
  updateListening,
  createListening,
  deleteListening,
} from "api/study/listening/listeningService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import handleError from "shared/utils/handleError";

export default function useListeningInfo() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emptyListening = {
    id: "-1",
    title: "",
    serial: 1,
    description: "",
    image: "",
    audioUrl: "",
    status: "ACTIVE",
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id === "-1") {
        setTopic(emptyListening);
        setIsEditing(true);
        return;
      }
      const data = await getListeningDetail(id);
      setTopic(data);
      setIsEditing(false);
    };
    fetchData();
  }, [id]);

  const handleCloseError = () => {
    setError("");
  };

  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    try {
      if (!isEditing) return;
      if (id === "-1") setError("This lesson doesn't exist yet");
      await deleteListening(id);
      navigate(`/teacher/listenings`);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleSave = async () => {
    try {
      if (id === "-1") {
        const data = await createListening(topic);
        navigate(`/teacher/listenings/${data.id}`);
        return;
      }
      const data = await updateListening(id, topic);
      setTopic(data);
      setIsEditing(false);
    } catch (error) {
      handleError(error, setError);
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

  const onChangeDescription = (e) => {
    if (!isEditing) return;
    setTopic({ ...topic, description: e.target.value });
  };

  function onChangeFile(e) {
    if (!isEditing) return;
    const file = e.target.files[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setTopic({ ...topic, audioUrl: audioUrl });
    }
  }

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
    onChangeDescription,
    onChangeFile,
    error,
    handleCloseError,
  };
}
