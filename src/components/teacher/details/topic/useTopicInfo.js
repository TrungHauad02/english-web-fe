import { useEffect, useState } from "react";
import {
  createTopic,
  deleteTopic,
  getTopicDetail,
  updateTopic,
} from "api/study/topic/topicService";
import { useNavigate, useParams } from "react-router-dom";
import handleError from "shared/utils/handleError";
import { deleteFile, uploadFile } from "api/feature/uploadFile/uploadFile";

export default function useTopicInfo(data, setError) {
  const { id } = useParams();
  const [topic, setTopic] = useState(data);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsEditing(id === "-1");
    setTopic(data);
  }, [id, data]);

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
      let updatedTopic = topic;
      const oldTopic = await getTopicDetail(id);
      if (oldTopic.image !== topic.image) {

        const sanitizedFileName = topic.title.replace(/\s+/g, '_');
        const [,resImage] = await Promise.all([
          deleteFile(oldTopic.image),
          uploadFile("topic", sanitizedFileName.toLowerCase(), topic.image)
        ])
        updatedTopic = { ...topic, image: resImage.url };
    }
      

      if (topic.id === "-1") {
        const res = await createTopic(updatedTopic);
        navigate(`/teacher/topics/${res.id}`);
        return;
      }
      const res = await updateTopic(id, updatedTopic);
      console.log(res);
      setTopic(res);
      setError("");
      setIsEditing(false);
    } catch (err) {
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
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTopic({ ...topic, image: reader.result });
      };
      reader.readAsDataURL(file);
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
    handleDelete,
  };
}
