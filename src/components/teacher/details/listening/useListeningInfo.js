import {
  getListeningDetail,
  updateListening,
  createListening,
  deleteListening,
} from "api/study/listening/listeningService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import handleError from "shared/utils/handleError";
import {
  handleFileChange,
  handleFileUpload,
} from "shared/utils/uploadFileUtils";

export default function useListeningInfo() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const emptyListening = {
      id: "-1",
      title: "",
      serial: 1,
      description: "",
      image: "",
      audioUrl: "",
      status: "ACTIVE",
    };
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
      if (topic.image === "") {
        setError("Image cannot be empty");
        return;
      }

      if (topic.audioUrl === "") {
        setError("Audio URL cannot be empty");
        return;
      }

      setIsEditing(false);

      let listeningDetail = { image: "", audioUrl: "" };
      if (id !== "-1") {
        listeningDetail = await getListeningDetail(id);
        listeningDetail = listeningDetail
          ? listeningDetail
          : { image: "", audioUrl: "" };
      }

      const newImage = await handleFileUpload(
        listeningDetail.image,
        topic.image,
        topic.title,
        "study/listening"
      );

      const newAudioUrl = await handleFileUpload(
        listeningDetail.audioUrl,
        topic.audioUrl,
        topic.title,
        "study/listening"
      );

      let updateTopic = topic;
      if (newImage !== listeningDetail.image) {
        updateTopic = { ...updateTopic, image: newImage };
      }

      if (newAudioUrl !== listeningDetail.audioUrl) {
        updateTopic = { ...updateTopic, audioUrl: newAudioUrl };
      }

      if (id === "-1") {
        const data = await createListening(updateTopic);
        setTopic(data);
        navigate(`/teacher/listenings/${data.id}`);
        return;
      }

      const data = await updateListening(id, updateTopic);
      setTopic(data);
    } catch (error) {
      handleError(error, setError);
    }
  };

  const onChangeImage = (e) => {
    if (!isEditing) return;
    handleFileChange(e, (imageData) => {
      setTopic((prevTopic) => ({ ...prevTopic, image: imageData }));
    });
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
    handleFileChange(e, (fileData) => {
      setTopic((prevTopic) => ({ ...prevTopic, audioUrl: fileData }));
    });
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
