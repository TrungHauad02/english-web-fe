import {
  getSpeakingDetail,
  createSpeaking,
  updateSpeaking,
  deleteSpeaking,
} from "api/study/speaking/speakingService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import handleError from "shared/utils/handleError";

export default function useSpeakingInfo(setError) {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const emptySpeaking = {
      id: "-1",
      title: "",
      serial: 1,
      description: "",
      image: "",
      topic: "",
      duration: 1,
      status: "ACTIVE",
    };

    if (id === "-1") {
      setTopic(emptySpeaking);
      setIsEditing(true);
      return;
    }
    const fetchData = async () => {
      const data = await getSpeakingDetail(id);
      setTopic(data);
      setIsEditing(false);
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!isEditing) return;
    if (id === "-1") {
      setError("Cannot delete a topic that doesn't exist yet");
      return;
    }
    try {
      await deleteSpeaking(id);
      navigate(`/teacher/speakings`);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (id === "-1") {
        const newData = await createSpeaking(topic);
        navigate(`/teacher/speakings/${newData.id}`);
        return;
      }
      const newData = await updateSpeaking(id, topic);
      setTopic(newData);
      setIsEditing(false);
    } catch (err) {
      handleError(err, setError);
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

  const onChangeTopic = (e) => {
    if (!isEditing) return;
    setTopic({ ...topic, topic: e.target.value });
  };

  const onChangeDuration = (e) => {
    if (!isEditing) return;
    if (e.target.value <= 0) return;
    setTopic({ ...topic, duration: e.target.value });
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
    onChangeDescription,
    onChangeTopic,
    onChangeDuration,
  };
}
