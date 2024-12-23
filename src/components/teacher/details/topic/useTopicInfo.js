import { useEffect, useState } from "react";
import {
  createTopic,
  deleteTopic,
  getTopicDetail,
  updateTopic,
} from "api/study/topic/topicService";
import { useNavigate, useParams } from "react-router-dom";
import handleError from "shared/utils/handleError";
import {
  handleFileChange,
  handleFileUpload,
} from "shared/utils/uploadFileUtils";
import { toast } from "react-toastify";

export default function useTopicInfo(data, setError) {
  const { id } = useParams();
  const [topic, setTopic] = useState(data);
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsEditing(id === "-1");
    if (!data) {
      toast.error("Error while fetching data");
      return;
    }
    setTopic(data);
  }, [id, data]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    if (id === "-1") {
      setError("Cannot delete a topic that does not exist yet");
      return;
    }

    try {
      await deleteTopic(id);
      navigate("/teacher/topics");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      if (topic.image === "") {
        setError("Image cannot be empty");
        return;
      }
      setIsEditing(false);

      let updatedTopic = topic;
      let oldTopic = { image: "" };
      if (id !== "-1") {
        const topicDetail = await getTopicDetail(id);
        oldTopic = topicDetail ? topicDetail : { image: "" };
      }
      const newImage = await handleFileUpload(
        oldTopic.image,
        topic.image,
        topic.title,
        "study/topic"
      );

      if (newImage !== oldTopic.image) {
        updatedTopic = { ...topic, image: newImage };
      }

      if (id === "-1") {
        const res = await createTopic(updatedTopic);
        navigate(`/teacher/topics/${res.id}`);
        return;
      }
      const res = await updateTopic(id, updatedTopic);
      console.log(res);
      setTopic(res);
      setError("");
    } catch (err) {
      setIsEditing(true);
      handleError(err, setError);
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
    handleFileChange(e, (result) => {
      const img = new Image();
      img.onload = () => {
        setTopic((prevTopic) => ({ ...prevTopic, image: result }));
      };
      img.onerror = () => {
        toast.error("Invalid image file");
      };
      img.src = result;
    });
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
    handleDelete,
    openDialog,
    handleOpenDialog,
    handleCloseDialog,
  };
}
